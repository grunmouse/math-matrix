const assert = require('assert');
const {Matrix,SquareMatrix,SquareMatrix2,SquareMatrix3}  = require('../index.js');

describe('math-matrix', ()=>{

	describe('Matrix', ()=>{
		it('exist', ()=>{
			assert.ok(Matrix);
		});
		it('instance', ()=>{
			let a = new Matrix(2, 3, 
				[
					1, 2, 3, 
					4, 5, 6
				]
			);
			assert.ok(a);
			assert.equal(a.M, 2);
			assert.equal(a.N, 3);
		});
	});	
	
	describe('SquareMatrix', ()=>{
		it('exist', ()=>{
			assert.ok(SquareMatrix);
		});
		it('instance', ()=>{
			let a = new SquareMatrix(3, 3, 
				[
					1, 2, 3, 
					4, 5, 6,
					3, 2, 1
				]
			);
			assert.ok(a);
			assert.equal(a.N, 3);
			assert.equal(a.M, 3);
		});
	});
	
	describe('Cross constructor', ()=>{
		it('Matrix as SquareMatrix2', ()=>{
			let m = new Matrix(2, 2, [1, 2, 3, 4]);
			
			assert.equal(m.constructor, SquareMatrix2);
		});
		it('Matrix as Matrix', ()=>{
			let m = new Matrix(2, 3, [1, 2, 3, 4, 5, 6]);
			
			assert.equal(m.constructor, Matrix);
		});
		it('SquareMatrix as SquareMatrix2', ()=>{
			let m = new SquareMatrix(2, 2, [1, 2, 3, 4]);
			
			assert.equal(m.constructor, SquareMatrix2);
		});
		it('SquareMatrix as Matrix', ()=>{
			let m = new SquareMatrix(2, 3, [1, 2, 3, 4, 5, 6]);
			
			assert.equal(m.constructor, Matrix);
		});
	});
	
	require('./det-test.js');

});