var request = require( 'request' );
var async = require( 'async' );
var _ = require( 'underscore' );
var moment = require( 'moment' );
var parseString = require('xml2js').parseString;


module.exports = function ( apiKey ) {

    if ( !apiKey ) {
        throw new Error( "CTA Bustracker requires an API key" );
    }

    var apiUrl = "http://www.ctabustracker.com/bustime/api/v1";

    var baseOptions = {
        qs: {
            key: apiKey
        },
        method: "GET"
    };

    var apiRequest = function ( options, done ) {
        request( options, function ( err, res, body ) {
            if ( !err && res.statusCode === 200 ) {
                return done( null, body );
            }
            return done( err, body );
        } );
    };

    var convertXML = function ( xml, done ) {
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

    var convertDate = function ( ctaDateString ) {
        var parts = ctaDateString.split( " " );
    };

    return {
        getTime: function ( cb ) {
            var options = _.clone( baseOptions );
            options.url = apiUrl + "/gettime";

            var makeRequest = function ( done ) {
                return apiRequest( options, done );
            };

            var formatResponse = function ( data, done ) {
                data.tm = moment( data.tm, 'YYYYMMDD HH:mm:ss' ).format();
                return done( null, data );
            };

            async.waterfall( [ makeRequest, convertXML, formatResponse ],
                function ( err, data ) {
                    if ( err ) {
                        return cb( err );
                    }
                    return cb( null, data );
                } );
        }
    };

};
