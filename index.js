const Matrix = require('./matrix.js');
const SquareMatrix = require('./square-matrix.js');
const SquareMatrix2 = require('./square-matrix2.js');
const SquareMatrix3 = require('./square-matrix3.js');

const SetableMatrix = require('./setable-matrix.js');

require('./operations/index.js');

module.exports = {
	Matrix,
	SquareMatrix,
	SquareMatrix2,
	SquareMatrix3,
	
	SetableMatrix
};

