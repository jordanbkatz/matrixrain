import { random, colorToText } from '../utils/functions';
import Entity from './Entity';
import Char from './Char';
import Strand from './Strand';
export default class MatrixRain {
	static fps = 15;
	static flowRate = 1;
	constructor({ element, width, height, charList, red, green, blue, randomColors }) {
		this.canvas = element;
		this.setCanvasDimensions(width, height);
		this.charList = charList;
		this.color = { red, green, blue };
		this.randomColors = randomColors;
		this.ctx = this.canvas.getContext("2d");
		this.ctx.translate(this.canvas.width, 0);
		this.ctx.scale(-1, 1);
		this.columns = Math.ceil(this.canvas.width / Char.width);
		this.strands = [];
		setInterval(() => {
			this.run();
		}, 1000 / MatrixRain.fps);
	}
	setCanvasDimensions(width, height) {
		this.canvas.width = width;
		this.canvas.height = height;
		this.columns = Math.ceil(this.canvas.width / Char.width);
	}
	run() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = colorToText(0, 0, 0, 1);
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		let column, available;
		for (let i = 0; i < MatrixRain.flowRate; i++) {
			column = random(0, this.columns);
			available = true;
			for (let j = 0; j < this.strands.length; j++) {
				if (this.strands[j].pos.x === column * Char.width && this.strands[j].pos.y <= this.canvas.height) {
					available = false;
				}
			}
			if (available) {
				this.strands.push(new Strand({
					x: column * Char.width,
					y: Char.height,
					ctx: this.ctx,
					canvas: this.canvas,
					charList: this.charList,
					color: (this.randomColors) ? { 
						red: random(0, 255),
						green: random(0, 255),
						blue: random(0, 255)
					} : this.color
				}));
			}
		}
		Entity.showAll(this.strands);
	}
}