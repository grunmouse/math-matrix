const {
	operators:{ocross}
} = require('@grunmouse/multioperator-spec-mul');

const {
	symbols:{MUL, DIV, ADD, SUB, NEG}
} = require('@grunmouse/multioperator-ariphmetic');

const Matrix = require('../matrix.js');

const {Vector} = require('@grunmouse/math-vector');

/**
 * Тензорное произведение векторов.
 * Полагаем первый вектор строкой, а второй - столбцом.
 * Результат - матрица, представляющая "таблицу Пифагора" измерений векторов.
 */
ocross.def(Vector, Vector, (a, b)=>{
	/**
	 * @var M:Integer - число строк
	 * @var N:Integer - число столбцов
	 */
	let N = a.length, M = b.length;
	
	let values = function*(){
		for(let r=0; r<M; r++){
			for(let c=0; c<N; c++){
				yield (a[c])[MUL](b[r]);
			}
		}
	}
	
	return new Matrix(M, N, values());
});

ocross.useName(Vector);