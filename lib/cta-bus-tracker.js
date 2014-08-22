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

            async.waterfall( [ makeRequest, convertXML ],
                function ( err, data ) {

                    if ( err ) {
                        return cb( err );
                    }
                    return cb( null, data );

                } );
        },
        getVehiclesById: function ( vehicleIds, cb ) {
            var options = _.clone( baseOptions );
            options.url = apiUrl + "/getvehicles";
            options.qs.vid = vehicleIds.join( "," );

            var makeRequest = function ( done ) {
                return apiRequest( options, done );
            };

            async.waterfall( [ makeRequest, convertXML ],
                function ( err, data ) {

                    if ( err ) {
                        return cb( err );
                    }
                    return cb( null, data );

                } );
        },
        getVehiclesByRoute: function ( routeIds, cb ) {
            var options = _.clone( baseOptions );
            options.url = apiUrl + "/getvehicles";
            options.qs.rt = routeIds.join( "," );

            var makeRequest = function ( done ) {
                return apiRequest( options, done );
            };

            async.waterfall( [ makeRequest, convertXML ],
                function ( err, data ) {

                    if ( err ) {
                        return cb( err );
                    }
                    return cb( null, data );

                } );
        }
    };

};
