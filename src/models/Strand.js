import Entity from './Entity';
import Char from './Char';
export default class Strand extends Entity {
	constructor({ x, y, canvas, ctx, charList, color }) {
		super(x, y, canvas, ctx);
		this.charList = charList;
		this.color = color;
		this.chars = [];
	}
	update() {
		if (this.chars.length < 1 || this.chars[this.chars.length - 1].pos.y < this.canvas.height * 2) {
			this.chars.push(new Char({
				x: this.pos.x, 
				y: this.pos.y, 
				canvas: this.canvas,
				ctx: this.ctx, 
				charList: this.charList, 
				color: this.color
			}));
			this.pos.y += Char.height;
			return true;
		}
		else {
			return false;
		}
	}
	draw() {
		Entity.showAll(this.chars);
	}
}