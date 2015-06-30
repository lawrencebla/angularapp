'use strict';

import test1 from './test.js';

module.exports = {

	test: function() {
		test1.test(1).forEach( i => {
			console.log(`hi: ${i}!`);
		});
	}

};