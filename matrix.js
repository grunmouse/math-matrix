
class Matrix{
	/**
	 * @param M - число строк
	 * @param N - число столбцов
	 * @param values : Iterable<Number> - итератор элементов матрицы, перебирающий её по строкам
	 */
	constructor(M, N, values){
		if(M === N && Matrix.Square && Matrix.Square !== new.target && !(new.target.prototype instanceof Matrix.Square)){
			return new Matrix.Square(M, values);
		}
		this.M = M;
		this.N = N;
		if(!values){
			values = [];
		}
		let len = M*N, tail = [];
		if(values.length<len){
			tail = Array.from({length:len - values.length}).fill(0);
		}
		this._values = [...values, ...tail];
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
	
	/**
	 * @param i - номер строки
	 * @param j - номер столбца
	 */
	_index(i, j){
		return i*this.M + j;
	}
	
	value(i, j){
		return this._values[this._index(i, j)];
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