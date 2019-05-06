function setup() {
	let a = new Matrix(2, 3);
	a.randomize();
	console.table(a.matrix);
	let b = a.transpose();
	console.table(b.matrix);
}
