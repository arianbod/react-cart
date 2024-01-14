export const getTotals = (cart) => {
	console.log(cart);
	let totalAmount = 0;
	let totalCost = 0;

	for (let { amount, price } of cart.values()) {
		console.log(typeof amount, typeof price);
		totalAmount += amount;
		totalCost += parseFloat(price) * amount;
	}
	return { totalAmount, totalCost };
};
