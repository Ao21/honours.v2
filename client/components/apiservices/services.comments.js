angular.module('honoursApp')
    .service('CommentServices', function(Restangular, $state) {

        var baseApi = Restangular.all('api');

        return {
            create: function(object) {
                return baseApi.all('comments').post(object);
            },
            getCommentsBySpace: function(id){
                return baseApi.one('comments', id).getList();
            },
    

        }
    })
