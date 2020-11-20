const MatrixBase = require('./matrix-base.js');

class Matrix extends MatrixBase{
	/**
	 * @param M - число строк
	 * @param N - число столбцов
	 * @param values : Iterable<Number> - итератор элементов матрицы, перебирающий её по строкам
	 */
	constructor(M, N, values){
		if(M === N && Matrix.Square && Matrix.Square !== new.target && !(new.target.prototype instanceof Matrix.Square)){
			return new Matrix.Square(M, values);
		}
		super(M, N, values);
	}
	
	clone(){
		return new Matrix(this.M, this.N, this.values);
	}
	
	static O(M, N){
		if(!N){
			N = M;
		}
		return new this(M, N);
	}
	
	static row(arr){
		return new Matrix(1, arr.length, arr);
	}

	static column(arr){
		return new Matrix(arr.length, 1, arr);
	}
	
	static concat(m){
		let values = [], M=0, N=m[0].N;
		for(let matrix of m){
			values.push(...matrix._values);
			M+=matrix.M;
		}
		return new Matrix(M, N, values);
	}
	
	
	static rowconcat(m){
		const M = m[0].M;
		let rows = Array.from({length:M}, ()=>([]));
		for(let matrix of m){
			if(matrix.M !== M){
				throw new Error('Incorrect matrix size');
			}
			for(let i=0; i<M; ++i){
				rows[i].push(...matrix.getRow(i));
			}
		}
		let N = rows[0].length;
		let values = [].concat(...rows);
		return new Matrix(M, N, values);
	}
	
	/**
	 * @param i - номер строки
	 * @param j - номер столбца
	 */
	_index(i, j){
		return i*this.N + j;
	}
	
	value(i, j){
		return this._values[this._index(i, j)];
	}
	
	getRow(i){
		let start = this._index(i, 0), len = this.N;
		return this._values.slice(start, start+len);
	}
	
	isSquare(){
		return this.M === this.N;
	}
	

	* _transpose(){
		for(let i=0; i<this.M; ++i){
			for(let j=0; i<this.N; ++j){
				yield this.value(j, i);
			}
		}
	}
	
	transpose(){
		const Ctor = this.constructor;
		return new Ctor(this.N, this.M, this._transpose());
	}
	
	minor(a, b){
		const Ctor = this.constructor;
		if(a.length !== b.length){
			throw new Error('Minor is not square');
		}
		let M = a.length;
		return new Ctor(M, M, this._minor(a,b)).det();
	}
	
	/**
	 * Генерирует значения минора
	 * @param a : Array<Number> - массив номеров строк
	 * @param b : Array<Number> - массив номеров столбцов
	 * @return Iterable<Number>
	 */
	* _minor(a, b){
		for(let i of a){
			for(let j of b){
				yield this.value(i, j);
			}
		}
	}	
	
	/**
	 * Генерирурет значения дополнительного минора
	 * @param a : Array<Number> - массив номеров строк
	 * @param b : Array<Number> - массив номеров столбцов
	 * @return Iterable<Number>
	 */
	_cominor(a, b){
		let ii = Array.from({lenght:this.M}, (_, i)=>i).filter((i)=>(!a.includes(i)));
		let jj = Array.from({lenght:this.N}, (_, i)=>i).filter((i)=>(!b.includes(i)));
		
		return this._minor(ii, jj);
	}
}

module.exports = Matrix;