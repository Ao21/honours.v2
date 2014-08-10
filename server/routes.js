/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var aws = require('./components/aws');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/connections', require('./api/connections'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/topics', require('./api/topic'));
  app.use('/api/objects', require('./api/object'));
  app.use('/api/tracks', require('./api/track'));
  app.use('/api/documents', require('./api/document'));

  app.route('/api/s3Policy').get(aws.getS3Policy)
  app.get('/api/config', aws.getClientConfig);
  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
