
class Matrix{
	/**
	 * @param M - число строк
	 * @param N - число столбцов
	 * @param values : Iterable<Number> - 
	 */
	constructor(M, N, values){
		if(M === N && this.Square && this.Square !== this.constructor){
			return new this.Square(M, values);
		}
		this.M = M;
		this.N = N;
		this.values = [...values];
	}
	
	clone(){
		return new Matrix(this.M, this.N, this.values);
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
	

	* _transpone(){
		for(let i=0; i<this.M; ++i){
			for(let j=0; i<this.N; ++j){
				yield this.value(j, i);
			}
		}
	}
	
	transpone(){
		const Ctor = this.constructor;
		return new Ctor(this.N, this.M, this._transpone());
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