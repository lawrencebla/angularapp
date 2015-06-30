import test2 from './js/test2.js';

test2.test();

import http from 'http';

var req = http.request( {
	path: '/api/login',
	method: 'GET'
} , function (res) {
	res.on( 'data', function( chunk ) {
		console.log(chunk);
	} );
} );

req.end();