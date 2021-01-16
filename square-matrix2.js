const SquareMatrix = require('./square-matrix.js');

const {
	symbols:{MUL, DIV, ADD, SUB, NEG}
} = require('@grunmouse/multioperator-ariphmetic');


class SquareMatrix2 extends SquareMatrix {
	constructor(values){
		super(2, values);
	}
	
	/**
	 * создаёт матрицу поворота на угол a
	 */
	static rotate(a){
		let ca = Math.cos(a), sa = Math.sin(a);
		return new this([
			ca, -sa,
			sa, ca
		]);
	}
	
	xx(){
		return this.values[0];
	}
	xy(){
		return this.values[1];
	}
	yx(){
		return this.values[2];
	}
	yy(){
		return this.values[3];
	}
	
	_det(){
		console.log('override ok');
		let [
			a, b,
			c, d
		] = this.values;
		
		return a[MUL](d)[SUB](b[MUL](c));
	}
}

SquareMatrix.Sized[2] = SquareMatrix2;

module.exports = SquareMatrix2;