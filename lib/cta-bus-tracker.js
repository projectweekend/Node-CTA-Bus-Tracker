var request = require( 'request' );
var async = require( 'async' );
var moment = require( 'moment' );
var parseString = require('xml2js').parseString;
var apiRequest = require( "./utils" ).apiRequest;
var convertXML = require( "./utils" ).convertXML;


module.exports = function ( apiKey ) {

    if ( !apiKey ) {
        throw new Error( "CTA Bustracker requires an API key" );
    }

    var apiUrl = "http://www.ctabustracker.com/bustime/api/v1";

    var baseOptions = function () {
        return {
            qs: {
                key: apiKey
            },
            method: "GET"
        };
    };

    var requestFactory = function ( options ) {
        return function ( done ) {
            return apiRequest( options, done );
        };
    };

    var responseFactory = function ( options, cb ) {
        async.waterfall( [ options.makeRequest, convertXML ],
            function ( err, data ) {

                if ( err ) {
                    return cb( err );
                }
                return cb( null, data[ options.dataProp ] );

            } );
    };

    return {
        time: function ( cb ) {

            var options = baseOptions();
            options.url = apiUrl + "/gettime";

            return responseFactory( {
                makeRequest: requestFactory( options ),
                dataProp: "tm"
            }, cb );

        },
        vehiclesById: function ( vehicleIds, cb ) {

            var options = baseOptions();
            options.url = apiUrl + "/getvehicles";
            options.qs.vid = vehicleIds.join( "," );

            console.log( options );

            return responseFactory( {
                makeRequest: requestFactory( options ),
                dataProp: "vehicle"
            }, cb );

        },
        vehiclesByRoute: function ( routeIds, cb ) {

            var options = baseOptions();
            options.url = apiUrl + "/getvehicles";
            options.qs.rt = routeIds.join( "," );

            return responseFactory( {
                makeRequest: requestFactory( options ),
                dataProp: "vehicle"
            }, cb );

        },
        routes: function ( cb ) {

            var options = baseOptions();
            options.url = apiUrl + "/getroutes";

            return responseFactory( {
                makeRequest: requestFactory( options ),
                dataProp: "route"
            }, cb );

        },
        routeDirections: function ( routeId, cb ) {

            var options = baseOptions();
            options.url = apiUrl + "/getdirections";
            options.qs.rt = routeId;

            return responseFactory( {
                makeRequest: requestFactory( options ),
                dataProp: "dir"
            }, cb );

        },
        stops: function ( routeId, direction, cb ) {

            var options = baseOptions();
            options.url = apiUrl + "/getstops";
            options.qs.rt = routeId;
            options.qs.dir = direction;

            return responseFactory( {
                makeRequest: requestFactory( options ),
                dataProp: "stop"
            }, cb );

        },
        patternsById: function ( patternIds, cb ) {

            var options = baseOptions();
            options.url = apiUrl + "/getpatterns";
            options.qs.pid = patternIds.join( "," );

            return responseFactory( {
                makeRequest: requestFactory( options ),
                dataProp: "ptr"
            }, cb );

        },
        patternsByRoute: function ( routeId, cb ) {

            var options = baseOptions();
            options.url = apiUrl + "/getpatterns";
            options.qs.rt = routeId;

            return responseFactory( {
                makeRequest: requestFactory( options ),
                dataProp: "ptr"
            }, cb );

        },
        predictionsByStop: function ( options, cb ) {

            var stopIds = options.stopIds;
            var routeIds = options.routeIds;
            var topCount = options.topCount;

            var reqOptions = baseOptions();
            reqOptions.url = apiUrl + "/getpredictions";
            reqOptions.qs.stpid = stopIds.join( "," );
            if ( typeof routeIds !== "undefined" ) {
                reqOptions.qs.rt = routeIds.join( "," );
            }

            return responseFactory( {
                makeRequest: requestFactory( reqOptions ),
                dataProp: "prd"
            }, cb );

        },
        predictionsByVehicle: function ( options, cb ) {

            var vehicleIds = options.vehicleIds;
            var topCount = options.topCount;

            var reqOptions = baseOptions();
            reqOptions.url = apiUrl + "/getpredictions";
            reqOptions.qs.vid = vehicleIds.join( "," );

            return responseFactory( {
                makeRequest: requestFactory( reqOptions ),
                dataProp: "prd"
            }, cb );

        },
        serviceBulletinsByRoute: function ( options, cb ) {

            var routeIds = options.routeIds;
            var routeDirection = options.routeDirection;

            var reqOptions = baseOptions();
            reqOptions.url = apiUrl + "/getservicebulletins";
            reqOptions.qs.rt = routeIds.join( "," );
            if ( typeof routeDirection !== "undefined" ) {
                reqOptions.qs.rtdir = routeDirection;
            }

            return responseFactory( {
                makeRequest: requestFactory( reqOptions ),
                dataProp: "sb"
            }, cb );

        },
        serviceBulletinsByStop: function ( stopIds, cb ) {

            var reqOptions = baseOptions();
            reqOptions.url = apiUrl + "/getservicebulletins";
            reqOptions.qs.stpid = stopIds.join( "," );

            return responseFactory( {
                makeRequest: requestFactory( reqOptions ),
                dataProp: "sb"
            }, cb );

        }
    };

};
