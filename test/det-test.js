const assert = require('assert');
const {Matrix}  = require('../index.js');

describe('determinant', ()=>{
	
	it('1.', ()=>{
		let A = new Matrix(2,2,[
			5, 2,
			7, 3
		]);
		assert.equal(A.det(), 1);
	});
	it('2.', ()=>{
		let A = new Matrix(2,2,[
			1, 2,
			3, 4
		]);
		assert.equal(A.det(), -2);
	});
	it('3.', ()=>{
		let A = new Matrix(2,2,[
			3,2,
			8,5
		]);
		assert.equal(A.det(), -1);
	});
	it('4.', ()=>{
		let A = new Matrix(2,2,[
			6, 9,
			8, 12
		]);
		assert.equal(A.det(), 0);		
	});

});