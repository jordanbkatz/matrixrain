import { random, colorToText } from '../functions';
import Entity from './Entity';
export default class Char extends Entity {
	static size = 20;
	static width = 12;
	static height = 14;
	constructor({ x, y, canvas, ctx, charList, color }) {
		super(x, y, canvas, ctx);
		this.charList = charList;
		this.color = color;
		this.head = true;
		this.alpha = 1;
		this.randomizeCharVal();
	}
	randomizeCharVal() {
		this.val = this.charList[random(0, this.charList.length - 1)];
	}
	update() {
		if (this.pos.y <= (this.canvas.height + Char.height) && this.alpha >= 0.01) {
			if (random(0, 100) < 5) {
				this.randomizeCharVal();
			}
			this.alpha *= 0.95;
			return true;
		}
		else {
			return false;
		}
	}
	draw() {
		this.ctx.font = Char.size + "px Monospace";
		if (!this.head) {
			this.ctx.fillStyle = colorToText(this.color.red, this.color.green, this.color.blue, this.alpha);
		}
		else {
			this.ctx.fillStyle = colorToText(255, 255, 255, 1);
			this.head = false;
		}
		this.ctx.fillText(this.val, this.pos.x, this.pos.y);
	}
}