const {
	operators:{mul, div},
	symbols:{MUL, DIV, ADD, SUB, NEG}
} = require('@grunmouse/multioperator-ariphmetic');

const Matrix = require('../matrix.js');

const {Vector} = require('@grunmouse/math-vector');

/* Умножение на число */
mul.def(Matrix, Number, (m, a)=>{
	const Matrix = m.constructor;
	const {N, M} = m;
	let values = a.values.map((x)=>(x[MUL](a)));
	return new Matrix(M, N, values);
});

div.def(Matrix, Number, (m, a)=>{
	const Matrix = m.constructor;
	const {N, M} = m;
	let values = a.values.map((x)=>(x[DIV](a)));
	return new Matrix(M, N, values);
});

mul.def(Number, Matrix, (a, m)=>{
	const Matrix = m.constructor;
	const {N, M} = m;
	let values = a.values.map((x)=>(x[MUL](a)));
	return new Matrix(M, N, values);
});

/**
 * Умножение матриц
 */
mul.def(Matrix, Matrix, (a, b)=>{
	if(a.N !== b.M){
		throw new TypeError('Incorrect size matrix for multiple');
	}
	const M = a.M, N = b.N, len = a.N;
	let values = [];
	for(let i = 0; i<M; ++i){
		for(let j = 0; j<N; ++j){
			let result = 0;
			for(let x = 0; x<len; ++x){
				result = result[ADD](mul.call(a.value(i,x), b.value(x,j)));
			}
			values[i*N+j] = result;
		}
	}
	return new Matrix(M, N, values);
});

/**
 * Умножение матрицы на вектор
 */
mul.def(Matrix, Vector, (a, r)=>{
	if(a.N !== b.length){
		throw new TypeError('Incorrect size matrix and vector for multiple');
	}
	const M = a.M, len = a.N;
	
	let values = [];
	for(let i = 0; i<M; ++i){
		let result = 0;
		for(let x = 0; x<len; ++x){
			result = result[ADD](mul.call(a.value(i,x), b.value(x,j)));
		}
		values[i] = result;
	}
	
	const Ctor = M === N ? r.constructor : Vector;
	return new Ctor(...values);
	
});

/**
 * Массив интерпретируется как вектор
 */
mul.def(Matrix, Array, (a, r)=>{
	let v = new Vector(...r);
	return a.mul(v);
});

mul.useName(Matrix);
div.useName(Matrix);