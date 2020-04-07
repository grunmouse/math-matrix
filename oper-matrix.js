const {
	operators:oper,
	symbols
} = require('@grunmouse/multioperator-ariphmetic');

const {
	operators:spec
} = require('@grunmouse/multioperator-spec-mul');

const Matrix = require('./matrix.js');

oper.eq.def(Matrix, Matrix, (a, b)=>{
	return a.N === b.N && a.M === b.M && a.values.every((x, i)=>(x[symbols.EQ](b.values[i])));
});

oper.ne.def(Matrix, Matrix, (a, b)=>(!a[symbols.EQ](b)));

oper.add.def(Matrix, Matrix, (a, b)=>{
	if(a.N !== b.N || a.M !== b.M){
		throw new TypeError('Matrix is not equimetric');
	}
	const Matrix = a.constructor;
	
	let values = a.values.map((_, i)=>(a[i][symbols.ADD](b[i])));
	
	return new Matrix(M, N, values);
	
});

oper.sub.def(Matrix, Matrix, (a, b)=>{
	if(a.N !== b.N || a.M !== b.M){
		throw new TypeError('Matrix is not equimetric');
	}
	const Matrix = a.constructor;
	const {N, M} = a;
	
	let values = a.values.map((_, i)=>(a[i][symbols.SUB](b[i])));
	
	return new Matrix(M, N, values);
	
});

oper.neg.def(Matrix, (a)=>{
	const Matrix = a.constructor;
	const {N, M} = a;
	
	let values = a.values.map((x)=>(x[symbols.NEG]()));
	
	return new Matrix(M, N, values);
});


/* Умножение на число */
oper.mul.def(Matrix, Number, (m, a)=>{
	const Matrix = m.constructor;
	const {N, M} = m;
	let values = a.values.map((x)=>(x[symbols.MUL](a)));
	return new Matrix(M, N, values);
});

oper.div.def(Matrix, Number, (m, a)=>{
	const Matrix = m.constructor;
	const {N, M} = m;
	let values = a.values.map((x)=>(x[symbols.DIV](a)));
	return new Matrix(M, N, values);
));

oper.mul.def(Number, Matrix, (a, m)=>(
	const Matrix = m.constructor;
	const {N, M} = m;
	let values = a.values.map((x)=>(x[symbols.MUL](a)));
	return new Matrix(M, N, values);
});

oper.eq.useName(Matrix);
oper.ne.useName(Matrix);

oper.add.useName(Matrix);
oper.sub.useName(Matrix);
oper.neg.useName(Matrix);

oper.div.useName(Matrix);
oper.mul.useName(Matrix);
