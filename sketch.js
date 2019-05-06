function setup() {
	let a = new Matrix(2, 3);
	a.randomize();
	console.table(a.data);
	let b = Matrix.transpose(a);
	console.table(b.data);

	let c = Matrix.multiply(a, b);
	c.print();
}
