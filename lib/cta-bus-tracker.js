var request = require( 'request' );
var async = require( 'async' );
var _ = require( 'underscore' );
var moment = require( 'moment' );
var parseString = require('xml2js').parseString;
var apiRequest = require( "./utils" ).apiRequest;
var convertXML = require( "./utils" ).convertXML;


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
        },
        getVehiclesById: function ( inputParams ) {

        },
        getVehiclesByRoute: function ( inputParams ) {

        }
    };

};
