A Node.js package for the Chicago Transit Authority's bus tracker API. For complete details regarding the data returned for each method, check out the CTA's documentation: [http://www.transitchicago.com/assets/1/developer_center/BusTime_Developer_API_Guide.pdf](http://www.transitchicago.com/assets/1/developer_center/BusTime_Developer_API_Guide.pdf)

### Key Features

* JSON is returned instead of the CTA's crappy XML
* All date properties are converted from strings formatted like "YYYYMMDD HH:MM:SS" to a normal JavaScript date strings like "2014-08-30T14:53:34-05:00"


#### Install It
```
npm install cta-bus-tracker
```

#### Require It
```javascript
var cta = require( "cta-bus-tracker" );
```

#### Initialize It
```javascript
var busTracker = cta( "your CTA API KEY" );
```javascript

#### Time
```javascript
busTracker.time( function ( err, data ) {
    if ( err ) {
        // handle error
    }
    // use data
} );
```

**Example data:**
~~~javascript
"2014-08-30T14:53:34-05:00"
~~~

#### Vehicles By ID
~~~javascript
// a list of up to 10 vehicle IDs
var vehicleIds = [ "1973" ];

busTracker.vehiclesById( vehicleIds, function ( err, data ) {
    if ( err ) {
        // handle error
    }
    // use data
} );
~~~

**Example data:**
~~~javascript
{
    vid: '1973',
    tmstmp: '2014-08-30T14:55:00-05:00',
    lat: '41.949149812970845',
    lon: '-87.64872932434082',
    hdg: '287',
    pid: '4735',
    rt: '8',
    des: '79th',
    pdist: '318',
    spd: '0',
    tablockid: '8 -752',
    tatripid: '139',
    zone: ''
}
~~~

**Note:** If more than one vehicle ID is provided *data* will be an array of objects.


#### Vehicles By route
~~~javascript
// a list of up to 10 vehicle IDs
var routeIds = [ "8" ];

busTracker.vehiclesById( routeIds, function ( err, data ) {
    if ( err ) {
        // handle error
    }
    // use data
} );
~~~

**Example data:**
~~~javascript
[
    {
        vid: '1973',
        tmstmp: '2014-08-30T15:05:00-05:00',
        lat: '41.93126130439866',
        lon: '-87.64894748741472',
        hdg: '173',
        pid: '4735',
        rt: '8',
        des: '79th',
        pdist: '7027',
        spd: '23',
        tablockid: '8 -752',
        tatripid: '139',
        zone: ''
    },
    ...
]
~~~


#### Routes
~~~javascript
busTracker.routes( function ( err, data ) {
    if ( err ) {
        // handle error
    }
    // use data
} );
~~~

**Example data:**
~~~javascript
[
    {
        rt: '1',
        rtnm: 'Bronzeville/Union Station',
        rtclr: '#336633'
    },
    ...
]
~~~


#### Route Directions
~~~javascript
var routeId = "1";

busTracker.routeDirections( routeId, function ( err, data ) {
    if ( err ) {
        // handle error
    }
    // use data
} );
~~~

**Example data:**
~~~javascript
[
    'Northbound',
    'Southbound'
]
~~~


#### Stops
~~~javascript
var routeId = "1";
var routeDirection = "Northbound";

busTracker.stops( routeId, routeDirection, function ( err, data ) {
    if ( err ) {
        // handle error
    }
    // use data
} );
~~~

**Example data:**
~~~javascript
[
    {
        stpid: '1577',
        stpnm: '1509 S Michigan',
        lat: '41.861838603628',
        lon: '-87.623975872993'
    },
    ...
]
~~~

#### Patterns By ID
~~~javascript
// a list of up to 10 pattern IDs
var parrernIds = [ "4735" ];

busTracker.patternsById( patternIds, function ( err, data ) {
    if ( err ) {
        // handle error
    }
    // use data
} );
~~~

**Example data:**
~~~javascript
{
    pid: '4735',
    ln: '74252.0',
    rtdir: 'Southbound',
    pt:
    [
        {
            seq: '1',
            lat: '41.949815854453',
            lon: '-87.649156451225',
            typ: 'S',
            stpid: '5756',
            stpnm: 'Halsted & Waveland/Broadway Terminal',
            pdist: '0.0'
        },
        ...
    ]
}
~~~

**Note:** If more than one pattern ID is provided *data* will be an array of objects.


#### Patterns By Route
~~~javascript
// a list of up to 10 pattern IDs
var routeId = "1";

busTracker.patternsByRoute( routeId, function ( err, data ) {
    if ( err ) {
        // handle error
    }
    // use data
} );
~~~

**Example data:**
~~~javascript
[
    {
        pid: '4735',
        ln: '74252.0',
        rtdir: 'Southbound',
        pt:
        [
            {
                seq: '1',
                lat: '41.949815854453',
                lon: '-87.649156451225',
                typ: 'S',
                stpid: '5756',
                stpnm: 'Halsted & Waveland/Broadway Terminal',
                pdist: '0.0'
            },
            ...
        ]
    },
    ...
]
~~~


#### Predictions By Stop
~~~javascript
var options = {
    // a list of up to 10 stop IDs
    stopIds: [ "1577" ],
    // topCount is optional
    topCount: 5
};

busTracker.predictionsByStop( options, function ( err, data ) {
    if ( err ) {
        // handle error
    }
    // use data
} );
~~~

**Example data:**
~~~javascript
[
    {
        tmstmp: '2014-08-30T15:26:00-05:00',
        typ: 'A',
        stpnm: '1509 S Michigan',
        stpid: '1577',
        vid: '1261',
        dstp: '7564',
        rt: '4',
        rtdir: 'Northbound',
        des: 'Illinois Center',
        prdtm: '2014-08-30T15:34:00-05:00',
        tablockid: '4 -715',
        tatripid: '126',
        zone: ''
    },
    ...
]
~~~


#### Predictions By Vehicle
~~~javascript
var options = {
    // a list of up to 10 vehicle IDs
    vehicleIds: [ "1230" ],
    // topCount is optional
    topCount: 5
};

busTracker.predictionsByVehicle( options, function ( err, data ) {
    if ( err ) {
        // handle error
    }
    // use data
} );
~~~

**Example data:**
~~~javascript
[
    {
        tmstmp: '2014-08-30T15:31:00-05:00',
        typ: 'A',
        stpnm: 'Halsted & Addison',
        stpid: '14901',
        vid: '1230',
        dstp: '86',
        rt: '8',
        rtdir: 'Southbound',
        des: '79th',
        prdtm: '2014-08-30T15:31:00-05:00',
        tablockid: '8 -706',
        tatripid: '145',
        zone: ''
    },
    ...
]
~~~


#### Service Bulletins By Route
~~~javascript
var options = {
    // a list of up to 10 route IDs
    routeIds: [ "1" ],
    // routeDirection is optional
    routeDirection: "Northbound"
};

busTracker.serviceBulletinsByRoute( options, function ( err, data ) {
    if ( err ) {
        // handle error
    }
    // use data
} );
~~~

**Example data:**
~~~javascript
[
    {
        nm: '#36 Broadway - Bus Stop Relocation',
        sbj: ' Bus Stop Relocation',
        dtl: 'Effective Wed, May 7<br/><br/>The northbound #36 bus stop on the northeast corner at Broadway/Granville has been relocated to the southeast corner at Broadway/Granville.<br/> <br/>',
        brf: '',
        prty: 'Low'
    },
    ...
]
~~~

#### Service Bulletins By Route
~~~javascript
// a list of up to 10 stop IDs
var stopIds = [ "1577" ];

busTracker.serviceBulletinsByStop( stopIds, function ( err, data ) {
    if ( err ) {
        // handle error
    }
    // use data
} );
~~~

**Example data:**
~~~javascript
[
    {
        nm: '3 K. Drive buses are temp rerouted at K Drive/79th',
        sbj: '# 3 King Drive buses rerouted',
        dtl: '#3 King Drive buses are temporarily rerouted in both directions via King Drive, 79th, Cottage Grove, 83rd, and King Drive, due to street blockage.<br/><br/>Allow extra travel time.<br/> <br/>',
        brf: '',
        prty: 'Medium',
        srvc: { rt: '3' }
    },
    ...
]
~~~
