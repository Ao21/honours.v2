angular.module('honoursApp')
    .service('DocumentServices', function(Restangular, $state) {

        var baseApi = Restangular.all('api');

        return {
            create: function(document) {
                return baseApi.all('documents').post(document);
            }

        }
    })
