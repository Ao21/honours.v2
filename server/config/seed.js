/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Topic = require('../api/topic/topic.model');
var Obj = require('../api/object/object.model');
var Connection = require('../api/connections/connection.model');
var Track = require('../api/track/track.model');

Thing.find({}).remove(function() {
    Thing.create({
        name: 'Development Tools',
        info: 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Sass, CoffeeScript, and Less.'
    }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
    }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
    }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
    }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
    }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
    });
});


Track.find({}).remove(function(){
    console.log('remove all tracks')
})

Connection.find({}).remove(function(){
    console.log('removed all');
})


Topic.find({}).remove(function(){
    console.log('removed all');
})

Obj.find({}).remove(function(){
    console.log('removed all');
})


Topic.find({}).remove(function() {
    Topic.create({
        name: 'Interaction Design',
        group: 0,
        type: 'default'
    }, function() {
        console.log('finished populating topics')
    })
})


