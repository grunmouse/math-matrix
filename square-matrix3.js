const SquareMatrix = require('./square-matrix.js');

class SquareMatrix3 extends SquareMatrix {
	constructor(values){
		super(3, values);
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
}

SquareMatrix.Sized[3] = SquareMatrix3;

module.exports = SquareMatrix3;