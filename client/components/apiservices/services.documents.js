angular.module('honoursApp')
    .service('DocumentServices', function(Restangular, $state) {

        var baseApi = Restangular.all('api');

        return {
            create: function(topic) {
                return baseApi.all('topics').post(topic);
            },
            link: function(topic1, topic2, weight) {
                var link = {
                    source: topic1,
                    target: topic2,
                    weight: 1
                }
                return baseApi.all('connections').post(topic1);

            },
            batch: function(topics){
                return baseApi.all('topics/batch/').post(topics);

            },
            latestUpdates: function(id){
                return baseApi.one('tracks/topic', id).getList();
            },
            //Old stuff
            addTaskWithAccount: function(taskDetails) {
                taskDetails.id = this.createTaskId();
                return baseApi.all('tasks').post(taskDetails);

            },
            addTaskWithOutAccount: function(taskDetails) {
                taskDetails.id = this.createTaskId();
                return baseApi.all('tasksNoAccount').post(taskDetails);
            },
            cancelTask: function(id) {
                return baseApi.one('tasks', id).remove();
            },
            createTaskId: function() {
                var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var randomString = '';
                for (var i = 0; i < 26; i++) {
                    var randomPoz = Math.floor(Math.random() * charSet.length);
                    randomString += charSet.substring(randomPoz, randomPoz + 1);
                }
                return randomString;
            },
            getAllTasks: function() {
                return baseApi.all('tasks').getList();
            },
            getTasksByUser: function() {
                return baseApi.all('tasks/client').getList();
            },
            getTaskById: function(id) {
                return baseApi.one('tasks', id).get();
            },
            updateTaskStatus: function(task) {
                return baseApi.all('tasks/update/status').post(task);
            },
            getTaskMessages: function(id) {
                return baseApi.one('tasks', id).all('messages').getList();
            },
            addMessageToTask: function(message) {
                return baseApi.all('tasks/addMessage').post(message);
            }
        }
    })
