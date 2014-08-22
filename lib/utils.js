var request = require( 'request' );
var async = require( 'async' );
var _ = require( 'underscore' );
var moment = require( 'moment' );
var parseString = require('xml2js').parseString;


var utils = module.exports;


utils.formatDateTimeItem = function ( item ) {

    var reDateTime = new RegExp("[0-9]{8} [0-9]{2}:[0-9]{2}$");
    var reDateTimeSeconds = new RegExp("[0-9]{8} [0-9]{2}:[0-9]{2}:[0-9]{2}$");

    if ( reDateTimeSeconds.test( item ) ) {
        return moment( item, 'YYYYMMDD HH:mm:ss' ).format();
    }

    if ( reDateTime.test( item ) ) {
        return moment( item, 'YYYYMMDD HH:mm' ).format();
    }

    return "Invalid date string";

};


utils.apiRequest = function ( options, done ) {
    request( options, function ( err, res, body ) {
        if ( !err && res.statusCode === 200 ) {
            return done( null, body );
        }
        return done( err, body );
    } );
};


utils.convertXML = function ( xml, done ) {
    var flattenNodes = function ( data ) {
        var keys = Object.keys( data );
        for ( var k = 0; k < keys.length; k++ ) {
            var key = keys[ k ];
            if ( Array.isArray( data[ key ] ) && data[ key ].length === 1 ) {
                data[ key ] = data[ key ][ 0 ];
            }
            if ( typeof data[ key ] === "object" ) {
                data[ key ] = flattenNodes( data[ key ] );
            }
        }
        return data;
    };
    parseString( xml, function ( err, result ) {
        var data = flattenNodes( result[ "bustime-response" ] );
        if ( err ) {
            return done( err, data );
        }
        return done( null, data );
    } );
};
