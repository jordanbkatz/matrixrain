export function random(min = 0, max = 1) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
export function colorToText(r, g, b, a = 1) {
	return `rgba(${r},${g},${b},${a})`;
}