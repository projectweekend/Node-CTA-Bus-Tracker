var expect = require( "chai" ).expect;
var cta = require( "../lib/cta-bus-tracker" );


var apiKey = process.env.API_KEY;

var busTracker = cta( apiKey );

var testVehicleId;
var testRoute;
var testRouteDirection;
var testStopId;
var testPatternId;


describe( "time", function () {
    it( "returns a datetime", function ( done ) {
        busTracker.time( function ( err, data ) {
            if ( err ) {
                return done( err );
            }
            expect( data ).to.be.a( "string" );
            var dateTime = new Date( data );
            expect( dateTime ).to.be.a( "date" );
            done();
        } );
    } );
} );


describe( "vehiclesByRoute", function () {
    it( "returns a list of vehicle data", function ( done ) {
        busTracker.vehiclesByRoute( [ "8" ], function ( err, data ) {
            if ( err ) {
                return done( err );
            }
            expect( data ).to.be.an( "array" );
            expect( data[ 0 ] ).to.have.a.property( "vid" );
            expect( data[ 0 ] ).to.have.a.property( "tmstmp" );
            expect( data[ 0 ] ).to.have.a.property( "lat" );
            expect( data[ 0 ] ).to.have.a.property( "lon" );
            expect( data[ 0 ] ).to.have.a.property( "hdg" );
            expect( data[ 0 ] ).to.have.a.property( "pid" );
            expect( data[ 0 ] ).to.have.a.property( "rt" );
            expect( data[ 0 ] ).to.have.a.property( "des" );
            expect( data[ 0 ] ).to.have.a.property( "pdist" );
            expect( data[ 0 ] ).to.have.a.property( "tablockid" );
            expect( data[ 0 ] ).to.have.a.property( "tatripid" );
            expect( data[ 0 ] ).to.have.a.property( "zone" );

            testVehicleId = data[ 0 ][ "vid" ];
            done();
        } );
    } );
} );


describe( "vehiclesById", function () {
    it( "returns vehicle data", function ( done ) {
        busTracker.vehiclesById( [ testVehicleId ], function ( err, data ) {
            if ( err ) {
                return done( err );
            }
            expect( data ).to.have.a.property( "vid" );
            expect( data ).to.have.a.property( "tmstmp" );
            expect( data ).to.have.a.property( "lat" );
            expect( data ).to.have.a.property( "lon" );
            expect( data ).to.have.a.property( "hdg" );
            expect( data ).to.have.a.property( "pid" );
            expect( data ).to.have.a.property( "rt" );
            expect( data ).to.have.a.property( "des" );
            expect( data ).to.have.a.property( "pdist" );
            expect( data ).to.have.a.property( "tablockid" );
            expect( data ).to.have.a.property( "tatripid" );
            expect( data ).to.have.a.property( "zone" );
            testPatternId = data[ "pid" ];
            done();
        } );
    } );
} );


describe( "routes", function () {
    it( "returns a list of routes", function ( done ) {
        busTracker.routes( function ( err, data ) {
            if ( err ) {
                return done( err );
            }
            expect( data ).to.be.an( "array" );
            expect( data[ 0 ] ).to.have.a.property( "rt" );
            expect( data[ 0 ] ).to.have.a.property( "rtnm" );
            expect( data[ 0 ] ).to.have.a.property( "rtclr" );
            testRoute = data[ 0 ][ "rt" ];
            done();
        } );
    } );
} );


describe( "routeDirections", function () {
    it( "returns directions of travel", function ( done ) {
        busTracker.routeDirections( testRoute, function ( err, data ) {
            if ( err ) {
                return done( err );
            }
            expect( data ).to.be.an( "array" );
            expect( data.length ).to.equal( 2 );
            testRouteDirection = data[ 0 ];
            done();
        } );
    } );
} );


describe( "stops", function () {
    it( "returns a list of stops", function ( done ) {
        busTracker.stops( testRoute, testRouteDirection, function ( err, data ) {
            if ( err ) {
                return done( err );
            }
            expect( data ).to.be.an( "array" );
            expect( data[ 0 ] ).to.have.a.property( "stpid" );
            expect( data[ 0 ] ).to.have.a.property( "stpnm" );
            expect( data[ 0 ] ).to.have.a.property( "lat" );
            expect( data[ 0 ] ).to.have.a.property( "lon" );
            testStopId = data[ 0 ][ "stpid" ];
            done();
        } );
    } );
} );


describe( "patterns by id", function () {
    it( "returns a list of patterns", function ( done ) {
        busTracker.patternsById( [ testPatternId ], function ( err, data ) {
            if ( err ) {
                return done( err );
            }
            expect( data ).to.have.a.property( "pid" );
            expect( data ).to.have.a.property( "ln" );
            expect( data ).to.have.a.property( "rtdir" );
            expect( data ).to.have.a.property( "pt" );
            expect( data.pt ).to.be.an( "array" );
            done();
        } );
    } );
} );


describe( "patterns by route", function () {
    it( "returns a list of patterns", function ( done ) {
        busTracker.patternsByRoute( testRoute, function ( err, data ) {
            if ( err ) {
                return done( err );
            }
            expect( data ).to.be.an( "array" );
            expect( data[ 0 ] ).to.have.a.property( "pid" );
            expect( data[ 0 ] ).to.have.a.property( "ln" );
            expect( data[ 0 ] ).to.have.a.property( "rtdir" );
            expect( data[ 0 ] ).to.have.a.property( "pt" );
            expect( data[ 0 ].pt ).to.be.an( "array" );
            done();
        } );
    } );
} );


describe( "predictions by stop", function () {
    it( "returns a list of predictions", function ( done ) {
        busTracker.predictionsByStop( { stopIds: [ testStopId ] }, function ( err, data ) {
            if ( err ) {
                return done( err );
            }
            expect( data ).to.be.an( "array" );
            expect( data[ 0 ] ).to.have.a.property( "tmstmp" );
            expect( data[ 0 ] ).to.have.a.property( "typ" );
            expect( data[ 0 ] ).to.have.a.property( "stpnm" );
            expect( data[ 0 ] ).to.have.a.property( "stpid" );
            expect( data[ 0 ] ).to.have.a.property( "vid" );
            expect( data[ 0 ] ).to.have.a.property( "dstp" );
            expect( data[ 0 ] ).to.have.a.property( "rt" );
            expect( data[ 0 ] ).to.have.a.property( "rtdir" );
            expect( data[ 0 ] ).to.have.a.property( "des" );
            expect( data[ 0 ] ).to.have.a.property( "prdtm" );
            expect( data[ 0 ] ).to.have.a.property( "tablockid" );
            expect( data[ 0 ] ).to.have.a.property( "tatripid" );
            expect( data[ 0 ] ).to.have.a.property( "zone" );
            done();
        } );
    } );
} );


describe( "predictions by vehicle", function () {
    it( "returns a list of predictions", function ( done ) {
        busTracker.predictionsByVehicle( { vehicleIds: [ testVehicleId ] }, function ( err, data ) {
            if ( err ) {
                return done( err );
            }
            expect( data ).to.be.an( "array" );
            expect( data[ 0 ] ).to.have.a.property( "tmstmp" );
            expect( data[ 0 ] ).to.have.a.property( "typ" );
            expect( data[ 0 ] ).to.have.a.property( "stpnm" );
            expect( data[ 0 ] ).to.have.a.property( "stpid" );
            expect( data[ 0 ] ).to.have.a.property( "vid" );
            expect( data[ 0 ] ).to.have.a.property( "dstp" );
            expect( data[ 0 ] ).to.have.a.property( "rt" );
            expect( data[ 0 ] ).to.have.a.property( "rtdir" );
            expect( data[ 0 ] ).to.have.a.property( "des" );
            expect( data[ 0 ] ).to.have.a.property( "prdtm" );
            expect( data[ 0 ] ).to.have.a.property( "tablockid" );
            expect( data[ 0 ] ).to.have.a.property( "tatripid" );
            expect( data[ 0 ] ).to.have.a.property( "zone" );
            done();
        } );
    } );
} );


describe( "service bulletins by route", function () {
    it( "returns a list of service bulletins", function ( done ) {
        busTracker.serviceBulletinsByRoute( { routeIds: [ testRoute ] }, function ( err, data ) {
            if ( err ) {
                return done( err );
            }
            expect( data ).to.be.an( "array" );
            done();
        } );
    } );
} );


describe( "service bulletins by stop", function () {
    it( "returns a list of service bulletins", function ( done ) {
        busTracker.serviceBulletinsByStop( [ testStopId ], function ( err, data ) {
            if ( err ) {
                return done( err );
            }
            expect( data ).to.be.an( "array" );
            done();
        } );
    } );
} );
