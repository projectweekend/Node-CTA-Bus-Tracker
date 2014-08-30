var expect = require( "chai" ).expect;
var cta = require( "../lib/cta-bus-tracker" );


var apiKey = process.env.API_KEY;

var busTracker = cta( apiKey );

var testVehicleId;


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
            done();
        } );
    } );
} );


describe( "routes", function () {
    it( "calls the correct CTA URL", function ( done ) {
        busTracker.routes( function ( err, data ) {
            if ( err ) {
                return done( err );
            }
            expect( data ).to.be.an( "array" );
            expect( data[ 0 ] ).to.have.a.property( "rt" );
            expect( data[ 0 ] ).to.have.a.property( "rtnm" );
            expect( data[ 0 ] ).to.have.a.property( "rtclr" );
            done();
        } );
    } );
} );


// describe( "routeDirections", function () {
//     it( "calls the correct CTA URL", function ( done ) {
//         busTracker.routeDirections( "8", function ( err, data ) {
//             if ( err ) {
//                 return done( err );
//             }

//             var apiUrl = "http://www.ctabustracker.com/bustime/api/v1/getdirections?key=";
//             apiUrl = apiUrl + apiKey;
//             apiUrl = apiUrl + "&rt=8";
//             expect( request.get.calledWith( apiUrl ) ).to.equal( true );

//             done();
//         } );
//     } );
// } );
