const {
	operators:{odot}
} = require('@grunmouse/multioperator-spec-mul');

const {
	symbols:{MUL, DIV, ADD, SUB, NEG}
} = require('@grunmouse/multioperator-ariphmetic');

const Matrix = require('../matrix.js');
const SetableMatrix = require('../setable-matrix.js');

const {Vector} = require('@grunmouse/math-vector');

/**
 * Произведение Адамарда
 */
function hadamar(a, b){
	if(a.N !== b.N || a.M !== b.M){
		throw new TypeError('Matrix is not equimetric');
	}
	const Matrix = a.constructor;
	const {N, M} = a;
	
	let values = a.values.map((_, i)=>(a._values[i][MUL](b._values[i])));
	
	return new Matrix(M, N, values);
}
 

 

odot.def(Matrix, Matrix, hadamar);
odot.def(SetableMatrix, SetableMatrix, hadamar);

odot.useName(Matrix);
odot.useName(SetableMatrix);