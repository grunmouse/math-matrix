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
	
	let values = a.values.map((_, i)=>(a[i][ADD](b[i])));
	
	return new Matrix(M, N, values);
	
});

sub.def(Matrix, Matrix, (a, b)=>{
	if(a.N !== b.N || a.M !== b.M){
		throw new TypeError('Matrix is not equimetric');
	}
	const Matrix = a.constructor;
	const {N, M} = a;
	
	let values = a.values.map((_, i)=>(a[i][SUB](b[i])));
	
	return new Matrix(M, N, values);
	
});

neg.def(Matrix, (a)=>{
	const Matrix = a.constructor;
	const {N, M} = a;
	
	let values = a.values.map((x)=>(x[NEG]()));
	
	return new Matrix(M, N, values);
});

oper.add.useName(Matrix);
oper.sub.useName(Matrix);
oper.neg.useName(Matrix);