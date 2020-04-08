const assert = require('assert');
const {Matrix,SquareMatrix}  = require('../index.js');

describe('Cross constructor', ()=>{
	it('Matrix as SquareMatrix', ()=>{
		let m = new Matrix(2, 2, [1, 2, 3, 4]);
		
		assert.equal(m.constructor, SquareMatrix);
	});
	it('Matrix as Matrix', ()=>{
		let m = new Matrix(2, 3, [1, 2, 3, 4, 5, 6]);
		
		assert.equal(m.constructor, Matrix);
	});
	it('SquareMatrix as SquareMatrix', ()=>{
		let m = new SquareMatrix(2, 2, [1, 2, 3, 4]);
		
		assert.equal(m.constructor, SquareMatrix);
	});
	it('SquareMatrix as Matrix', ()=>{
		let m = new SquareMatrix(2, 3, [1, 2, 3, 4, 5, 6]);
		
		assert.equal(m.constructor, Matrix);
	});
});