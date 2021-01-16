const SquareMatrix = require('./square-matrix.js');

const {
	symbols:{MUL, DIV, ADD, SUB, NEG}
} = require('@grunmouse/multioperator-ariphmetic');

class SquareMatrix3 extends SquareMatrix {
	constructor(values){
		super(3, values);
	}
	
	/** 
	 * Возвращает матрицу оператора, соответствующего векторному умножению на этот вектор
	 * a[CROSS](b) = hat(b)[MUL](a)
	 */
	static hat(vec){
		let {x,y,z} = vec;
		return new this(
			[
				0, -z, y,
				z, 0, -x,
				-y, x, 0
			]
		);
	}
	
	/**
	 * Матрица поворота вокруг оси axis на угол a
	 */
	static rotate(axis, a){
		let ax = [0,1,2];
		ax.splice(axis, 1);
		
		return super.rotate(3, ax, a);
	}
	
	xx(){
		return this.values[0];
	}
	xy(){
		return this.values[1];
	}
	xz(){
		return this.values[2];
	}
	yx(){
		return this.values[3];
	}
	yy(){
		return this.values[4];
	}
	yz(){
		return this.values[5];
	}
	zx(){
		return this.values[6];
	}
	zy(){
		return this.values[7];
	}
	zz(){
		return this.values[8];
	}
	
	_det(){
		let [
			a, b, c,
			d, e, f,
			h, i, j
		] = this.values;
		
		return (a)[MUL](e)[MUL](j)
			[ADD]((b)[MUL](f)[MUL](h))
			[ADD]((c)[MUL](d)[MUL](i))
			[SUB]((c)[MUL](e)[MUL](h))
			[SUB]((b)[MUL](d)[MUL](j))
			[SUB]((a)[MUL](f)[MUL](j));
	}
	
}

SquareMatrix.Sized[3] = SquareMatrix3;

module.exports = SquareMatrix3;