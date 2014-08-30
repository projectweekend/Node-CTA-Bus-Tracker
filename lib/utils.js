var request = require( 'request' );
var async = require( 'async' );
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

    var formatNodes = function ( data ) {

        var keys = Object.keys( data );
        var reDateTime = new RegExp("[0-9]{8} [0-9]{2}:[0-9]{2}$");
        var reDateTimeSeconds = new RegExp("[0-9]{8} [0-9]{2}:[0-9]{2}:[0-9]{2}$");

        for ( var k = 0; k < keys.length; k++ ) {

            var key = keys[ k ];

            if ( Array.isArray( data[ key ] ) && data[ key ].length === 1 ) {

                data[ key ] = data[ key ][ 0 ];

                if ( reDateTimeSeconds.test( data[ key ] ) ) {
                    data[ key ] = moment( data[ key ], 'YYYYMMDD HH:mm:ss' ).format();
                }

                if ( reDateTime.test( data[ key ] ) ) {
                    data[ key ] = moment( data[ key ], 'YYYYMMDD HH:mm' ).format();
                }

            }

            if ( typeof data[ key ] === "object" ) {
                data[ key ] = formatNodes( data[ key ] );
            }

        }

        return data;

    };

    parseString( xml, function ( err, result ) {

        var data = formatNodes( result[ "bustime-response" ] );

        if ( err ) {
            return done( err, data );
        }

        return done( null, data );

    } );

};
