const Matrix = require('./matrix.js');
const {TupleMap} = require('@grunmouse/tuple');

class SquareMatrix extends Matrix{
	/**
	 * constructor(M, N, values) - для совместимости, он может вызываться так же, как конструктор родителя
	 * constructor(N, values)
	 * constructor(values) - размер будет расчитан как квадратный корень числа значений
	 */
	 
	constructor(M, N, values){
		if(!values){
			if(!N && typeof M !== 'number'){
				values = [...M];
				N = M = Math.sqrt(values.length);
				
			}
			else if(typeof M === 'number' && typeof N !== 'number'){
				values = [...N];
				N = M;
			}
		}
		if(N !== M){
			return new Matrix(M, N, values);
		}
		super(M, M, values);
	}
	
	cominor(a, b, cashe){
		if(typeof a === 'number'){
			a = [a];
		}
		if(typeof b === 'number'){
			b = [b];
		}
		let M = this.M - a.length, N = this.N - b.length;
		if(M !== N){
			throw new Error('Incorrect minor size');
		}
		if(M === 0){
			return 0;
		}
		
		return new SquareMatrix(M, N, this._cominor(a, b)).det(cashe);
	}
	
	algcomp(i, j, cashe, last){
		let p = i+j;
		let k = [1, -1][p & 1];
		
		return k * this.cominor(i, j, cashe, last);
	}
	
	*_adjunct(cashe){
		cashe = cashe || new TupleMap();
		for(let i=0; i<this.M; ++i){
			for(let j=0; i<this.N; ++j){
				yield this.algcomp(i, j, cashe);
			}
		}
	}
	
	adjunct(cashe){
		return new SquareMatrix(this.M, this.N, this._adjunct(cashe)); 
	}
	
	det(cashe, last){
		cashe = cashe || new TupleMap();
		let data = this.values;
		if(cashe.has(data)){
			return cashe.get(data);
		}
		else{
			let result = this._det(cashe, last);
			cashe.set(data, result);
			return result;
		}
	}
	
	_det(cashe, last){
		switch(this.M){
			case 1:
				return this.values[0];
			case 2:
				{
					let [
						a, b,
						c, d
					] = this.values;
					
					return a*d - b*c;
				}
			case 3:
				{
					let [
						a, b, c,
						d, e, f,
						h, i, j
					] = this.values;
					
					return a*e*j + b*f*h + c*d*i - c*e*h - b*d*j - a*f*j;
				}
			default:
				{
					const range = this.M;
					let result = 0;
					//Разложение по нулевой или последней строке
					let row = last ? (range-1) : 0;
					for(let col = 0; col<range; ++col){
						result += this.value(0, col) * this.algcomp(0, col, cashe);
					}
					return result;
				}
		}
	}
	
	inverse(cashe){
		cashe = cashe || new TupleMap();
		let det = this.det(cashe);
		let adj = this.adjunct(cashe);
		let union = adj.transpone();
		let data = union.values.map((a)=>(a/det));
		return new SquareMatrix(this.M, data);
	}
}

Matrix.prototype.Square = SquareMatrix;

module.exports = SquareMatrix;