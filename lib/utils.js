var request = require( 'request' );
var async = require( 'async' );
var _ = require( 'underscore' );
var moment = require( 'moment' );
var parseString = require('xml2js').parseString;


var utils = module.exports;


utils.apiRequest = function ( options, done ) {
    request( options, function ( err, res, body ) {
        if ( !err && res.statusCode === 200 ) {
            return done( null, body );
        }
        return done( err, body );
    } );
};


utils.convertXML = function ( xml, done ) {
    var cleanUpObject = function ( data ) {
        var keys = Object.keys( data );
        for ( var k = 0; k < keys.length; k++ ) {
            var key = keys[ k ];
            data[ key ] = data[ key ][ 0 ];
        }
        return data;
    };
    parseString( xml, function ( err, result ) {
        var data = cleanUpObject( result[ "bustime-response" ] );
        if ( err ) {
            return done( err, data );
        }
        return done( null, data );
    } );
};
