const inspect = Symbol.for('nodejs.util.inspect.custom');

class MatrixBase{
	/**
	 * @param M - число строк
	 * @param N - число столбцов
	 * @param values : Iterable<Number> - итератор элементов матрицы, перебирающий её по строкам
	 */
	constructor(M, N, values){
		this.M = M;
		this.N = N;
		if(!values){
			values = [];
		}
		else{
			values = [...values];
		}
		let len = M*N, tail = [];
		if(values.length<len){
			tail = Array.from({length:len - values.length}).fill(0);
		}
		this._values = values.concat(tail);
	}
	
	[inspect](depth, options){
		//console.log(options);
		let name = this.constructor.name;
		let values = this._values.map(a=>(options.stylize(a, 'number')));
		let {M, N} = this;
		
		let rows = Array.from({length:M}, (_,i)=>(values.slice(i*N, (i+1)*N)));
		let lens = new Array(N).fill(0);
		for(let row of rows){
			row.forEach((str, i)=>{
				lens[i] = Math.max(lens[i], str.length);
			});
		};
		rows = rows.map((row)=>{
			row = row.map((str, i)=>(
				str.padStart(lens[i], ' ')
			));
			return "  " + row.join(", ");
		});
		
		rows = rows.join(",\n");
		
		return `${name} {\n${rows}\n}`;
		
	}
	
	get values(){
		return this._values.slice(0);
	}
	
	/**
	 * @param i - номер строки
	 * @param j - номер столбца
	 */
	_index(i, j){
		return i*this.N + j;
	}
	
	_pos(index){
		let j = index % this.N;
		let i = (index - j)/this.N;
		return [i, j];
	}
	
	value(i, j){
		return this._values[this._index(i, j)];
	}
	
	getRow(i){
		let N = this.N;
		return this._values.slice(i*N, (i+1)*N);
	}
	
	*itrItems(){
		for(let i=0; i<this._values.length; ++i){
			return [...this._pos(i), this._values[i]];
		}
	}
}

module.exports = MatrixBase;