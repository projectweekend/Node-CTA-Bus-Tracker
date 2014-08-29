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

    var requestFactory = function ( options ) {
        return function ( done ) {
            return apiRequest( options, done );
        };
    };

    var responseFactory = function ( makeRequest, dataProp, cb ) {
        async.waterfall( [ makeRequest, convertXML ],
            function ( err, data ) {

                if ( err ) {
                    return cb( err );
                }
                return cb( null, data[ dataProp ] );

            } );
    };

    return {
        time: function ( cb ) {

            var options = _.clone( baseOptions );
            options.url = apiUrl + "/gettime";

            var makeRequest = requestFactory( options );

            return responseFactory( makeRequest, "tm", cb );

        },
        vehiclesById: function ( vehicleIds, cb ) {

            var options = _.clone( baseOptions );
            options.url = apiUrl + "/getvehicles";
            options.qs.vid = vehicleIds.join( "," );

            var makeRequest = requestFactory( options );

            return responseFactory( makeRequest, "vehicle", cb );

        },
        vehiclesByRoute: function ( routeIds, cb ) {

            var options = _.clone( baseOptions );
            options.url = apiUrl + "/getvehicles";
            options.qs.rt = routeIds.join( "," );

            var makeRequest = requestFactory( options );

            return responseFactory( makeRequest, "vehicle", cb );

        },
        routes: function ( cb ) {

            var options = _.clone( baseOptions );
            options.url = apiUrl + "/getroutes";

            var makeRequest = requestFactory( options );

            return responseFactory( makeRequest, "route", cb );

        },
        routeDirections: function ( routeId, cb ) {

            var options = _.clone( baseOptions );
            options.url = apiUrl + "/getdirections";
            options.qs.rt = routeId;

            var makeRequest = requestFactory( options );

            return responseFactory( makeRequest, "dir", cb );

        },
        stops: function ( routeId, direction, cb ) {

            var options = _.clone( baseOptions );
            options.url = apiUrl + "/getstops";
            options.qs.rt = routeId;
            options.qs.dir = direction;

            var makeRequest = requestFactory( options );

            return responseFactory( makeRequest, "stop", cb );

        },
        patternsById: function ( patternIds, cb ) {

            var options = _.clone( baseOptions );
            options.url = apiUrl + "/getpatterns";
            options.qs.pid = patternIds.join( "," );

            var makeRequest = requestFactory( options );

            return responseFactory(  makeRequest, "ptr", cb );

        },
        patternsByRoute: function ( routeId, cb ) {

            var options = _.clone( baseOptions );
            options.url = apiUrl + "/getpatterns";
            options.qs.rt = routeId;

            var makeRequest = requestFactory( options );

            return responseFactory( makeRequest, "ptr", cb );

        },
        predictionsByStop: function ( options, cb ) {
            var stopIds = options.stopIds;
            var routeIds = options.routeIds;
            var topCount = options.topCount;

            var reqOptions = _.clone( baseOptions );
            reqOptions.url = apiUrl + "/getpredictions";
            reqOptions.qs.stpid = stopIds.join( "," );
            if ( typeof routeIds !== "undefined" ) {
                reqOptions.qs.rt = routeIds.join( "," );
            }

            var makeRequest = requestFactory( reqOptions );

            async.waterfall( [ makeRequest, convertXML ],
                function ( err, data ) {

                    if ( err ) {
                        return cb( err );
                    }
                    return cb( null, data.prd );

                } );
        },
        predictionsByVehicle: function ( options, cb ) {
            var vehicleIds = options.vehicleIds;
            var topCount = options.topCount;

            var reqOptions = _.clone( baseOptions );
            reqOptions.url = apiUrl + "/getpredictions";
            reqOptions.qs.vid = vehicleIds.join( "," );

            var makeRequest = requestFactory( reqOptions );

            async.waterfall( [ makeRequest, convertXML ],
                function ( err, data ) {

                    if ( err ) {
                        return cb( err );
                    }
                    return cb( null, data.prd );

                } );
        },
        serviceBulletinsByRoute: function ( options, cb ) {

            var routeIds = options.routeIds;
            var routeDirection = options.routeDirection;

            var reqOptions = _.clone( baseOptions );
            reqOptions.url = apiUrl + "/getservicebulletins";
            reqOptions.qs.rt = routeIds.join( "," );
            if ( typeof routeDirection !== "undefined" ) {
                reqOptions.qs.rtdir = routeDirection;
            }

            var makeRequest = requestFactory( reqOptions );

            return responseFactory( makeRequest, "sb", cb );

        },
        serviceBulletinsByStop: function ( stopIds, cb ) {

            var reqOptions = _.clone( baseOptions );
            reqOptions.url = apiUrl + "/getservicebulletins";
            reqOptions.qs.stpid = stopIds.join( "," );

            var makeRequest = requestFactory( reqOptions );

            return responseFactory( makeRequest, "sb", cb );

        }
    };

};
