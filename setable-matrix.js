const MatrixBase = require('./matrix-base.js');
const Matrix = require('./matrix.js');


class BuildingMatrix extends MatrixBase{
	setValue(i, j, value){
		this._values[this._index(i, j)] = value;
	}
	
	toMatrix(){
		return new Matrix(this.M, this.N, this._values);
	}
}

module.exports = BuildingMatrix;