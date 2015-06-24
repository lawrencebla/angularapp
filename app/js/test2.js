'use strict';

import _ from 'lodash';

import test1 from './test.js';

module.exports = {

	test: function() {
		test1.test().forEach( test1.test(), i => {
			consaole.log(`hi: ${i}!`);
		});
	}

};