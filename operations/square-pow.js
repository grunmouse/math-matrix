const {
	operators:{mul, div, pow}
} = require('@grunmouse/multioperator-ariphmetic');

const Matrix = require('../matrix.js');
const SquareMatrix = require('../square-matrix.js');

pow.def(SquareMatrix, Number, (a, v)=>{
	if(!Number.isInteger(v)){
		throw new Error('Raising a matrix to a real power is not supported');
	}

	if(v<0){
		a = a.inverse();
		v = -v;
	}
	else{
		a = a.clone();
	}
	
	if(v===0){
		return SquareMatrix.E(a.M);
	}
	else if(v>1){
		let code = v.toString('2').split('').reverse();
		
		let result = code.reduce((akk, digit, i)=>{
			if(+digit){
				akk = akk.mul(a);
			}
			if(i>0){
				akk = akk.mul(akk);
			}
			return akk;
		}, SquareMatrix.E(a.M));
		
		return result;
	}
	else{
		return a;
	}
});

pow.useName(SquareMatrix);