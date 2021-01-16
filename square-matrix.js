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
		
		if(SquareMatrix.Sized[M]){
			let Ctor = SquareMatrix.Sized[M];
			if(Ctor !== new.target){
				return new Ctor(values);
			}
		}
		
		super(M, M, values);
	}
	
	static E(M){
		let values = new Array(M*M).fill(0);
		for(let i=0; i<M; ++i){
			values[M*i + i] = 1;
		}
		return new SquareMatrix(M, values);
	}
	
	/**
	 * Создаёт матрицу поворота
	 * @param M - размер
	 * @param ax : Array[2]<Number> - номера осей, в которых происходит поворот
	 * @param a : Number - угол поворота
	 */
	static rotate(M, ax, a){
		let ca = Math.cos(a), sa = Math.sin(a);
		const _values = function* (){
			for(let r = 0; r<M; r++){
				let axr = ax.indexOf(r);
				for(let c = 0; c<M; c++){
					let axc = ax.indexOf(c);
					if(!~axr && !~axc){
						if(axr === axc){
							yield ca;
						}
						else if(axc>axr){
							yield -sa;
						}
						else{
							yield sa;
						}
					}
					else if(c===r){
						yield 1;
					}
					else{
						yield 0;
					}
				}
			}
		}
		
		return new this(M, _values());
	}
	
	
	cominor(a, b, cashe, last){
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
		return new SquareMatrix(M, N, this._cominor(a, b)).det(cashe, last);
	}
	
	algcomp(i, j, cashe, last){
		/*
			Алгебраические дополнения верхних строк раскрываем по нулевой строке,
			нижних строк - по последней строке.
			Это эвристика, чтобы получить больше совпадающих миноров во вложенных расчётах.
		*/
		if(typeof last === 'undefined'){
			last = (i*2 >= this.M);
		}
		
		let cominor = this.cominor(i, j, cashe, last);
		if(p & 1){
			return cominor.neg();
		}
		else{
			return cominor;
		}
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
						result += this.value(0, col) * this.algcomp(0, col, cashe, last);
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

Matrix.Square = SquareMatrix;

SquareMatrix.Sized = {};

module.exports = SquareMatrix;