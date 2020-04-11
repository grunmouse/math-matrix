const {
	operators:{eq, ne},
	symbols:{EQ}
} = require('@grunmouse/multioperator-ariphmetic');


const Matrix = require('../matrix.js');

eq.def(Matrix, Matrix, (a, b)=>{
	return a.N === b.N && a.M === b.M && a.values.every((x, i)=>(x[EQ](b.values[i])));
});

ne.def(Matrix, Matrix, (a, b)=>(!a[EQ](b)));

eq.useName(Matrix);
ne.useName(Matrix);