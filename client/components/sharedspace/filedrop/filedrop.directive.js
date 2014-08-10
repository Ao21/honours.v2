'use strict';

angular.module('honoursApp').directive('filedrop', function(ObjectServices, Auth, $upload, $http, socket) {
    return {
        restrict: 'EA',
        link: function(scope, element, attrs, ctrl) {
            scope.upload = [];
            var dropContainer = element.get(0);
            dropContainer.addEventListener("drop", dropHandler, false);
            dropContainer.addEventListener("dragenter", function(event) {
                event.stopPropagation();
                event.preventDefault();
            }, false);
            dropContainer.addEventListener("dragover", function(event) {
                event.stopPropagation();
                event.preventDefault();
            }, false);
            dropContainer.addEventListener("drop", dropHandler, false);

            function dropHandler(e) {
                e.stopPropagation();
                e.preventDefault();
                var files = e.target.files || e.dataTransfer.files;
                uploadFile(files);

            }
            console.log(scope);


            function uploadFile(files) {
                var $files = files;
                for (var i = 0; i < $files.length; i++) {

                    var file = $files[i];
                    //file.id = 'fileId' + idCount;
                    //idCount++;
                    //currentList.push(file);
                    file.progress = parseInt(0);


                    (function(file, i) {
                        if (file.type.startsWith('image/')) {

                            $http.get('/api/s3Policy?mimeType=' + file.type).success(function(response) {

                                var s3Params = response;
                                scope.upload[i] = $upload.upload({
                                    url: 'https://' + 'honours' + '.s3-ap-southeast-2.amazonaws.com/',
                                    method: 'POST',
                                    data: {
                                        'key': 'useruploads/' + Auth.getCurrentUser()._id + '/object/' + Math.round(Math.random() * 10000) + '$$' + file.name,
                                        'acl': 'public-read',
                                        'Content-Type': file.type,
                                        'AWSAccessKeyId': s3Params.AWSAccessKeyId,
                                        'success_action_status': '201',
                                        'Policy': s3Params.s3Policy,
                                        'Signature': s3Params.s3Signature
                                    },
                                    file: file,
                                }).then(function(response) {
                                    file.progress = parseInt(100);

                                    if (response.status === 201) {
                                        console.log(response);
                                        var data = xml2json.parser(response.data),
                                            parsedData;
                                        parsedData = {
                                            location: data.postresponse.location,
                                            bucket: data.postresponse.bucket,
                                            key: data.postresponse.key,
                                            etag: data.postresponse.etag,
                                            type: file.type

                                        };
                                        console.log(parsedData);
                                        //scope.imageUploads.push(parsedData);
                                        if (parsedData.type.startsWith('image/')) {
                                            //Create Image
                                            var tempObject = {
                                                name: file.name,
                                                type: 'image',
                                                'spaceId': scope.SharedSpace.spaceId,
                                                content: parsedData.location,
                                                width: "500px",
                                                height: "200px"
                                            };
                                            ObjectServices.create(tempObject).then(function(object) {
                                                scope.objectList.push(object);
                                                socket.emitMessages('sharedspace:object:create', {
                                                    list: scope.SharedSpace.spaceId
                                                });
                                            })

                                        }


                                    } else {
                                        alert('Upload Failed');
                                    }
                                }, null, function(evt) {
                                    file.progress = parseInt(100.0 * evt.loaded / evt.total);
                                    //$('#' + file.id).children('#progress').html(parseInt(100.0 * evt.loaded / evt.total));

                                });
                            });

                        } else if (file.name.endsWith('.docx')) {
                            scope.upload = $upload.upload({
                                url: '/api/documents/convert/',
                                method: 'POST',                 
                                file: file,
                            }).progress(function(evt) {
                                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                            }).success(function(data, status, headers, config) {
                                // file is uploaded successfully
                                console.log(data);
                                $scope.imgurl = data.imgUrl;
                            });
                        }
                    }(file, i));

                }

            }
        }



    };
})
