const SquareMatrix = require('./square-matrix.js');

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
}

SquareMatrix.Sized[2] = SquareMatrix2;

module.exports = SquareMatrix2;