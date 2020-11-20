const {
	operators:{add, sub, neg},
	symbols:{ADD, SUB, NEG}
} = require('@grunmouse/multioperator-ariphmetic');


const Matrix = require('../matrix.js');

add.def(Matrix, Matrix, (a, b)=>{
	if(a.N !== b.N || a.M !== b.M){
		throw new TypeError('Matrix is not equimetric');
	}
	const Matrix = a.constructor;
	const {N, M} = a;
	
	let values = a._values.map((_, i)=>(a._values[i][ADD](b._values[i])));
	
	return new Matrix(M, N, values);
	
});

sub.def(Matrix, Matrix, (a, b)=>{
	if(a.N !== b.N || a.M !== b.M){
		throw new TypeError('Matrix is not equimetric');
	}
	const Matrix = a.constructor;
	const {N, M} = a;
	
	let values = a.values.map((_, i)=>(a._values[i][SUB](b._values[i])));
	
	return new Matrix(M, N, values);
	
});

neg.def(Matrix, (a)=>{
	const Matrix = a.constructor;
	const {N, M} = a;
	
	let values = a.values.map((x)=>(x._values[NEG]()));
	
	return new Matrix(M, N, values);
});

add.useName(Matrix);
sub.useName(Matrix);
neg.useName(Matrix);