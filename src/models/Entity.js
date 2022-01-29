export default class Entity {
    static showAll(list) {
		for (let i = 0; i < list.length; i++) {
			if (!list[i].show()) {
				list.splice(i, 1);
			}
		}
	}
	constructor(x, y, canvas, ctx) {
		this.pos = { x, y };
		this.canvas = canvas;
        this.ctx = ctx;
	}
	show() {
		if (this.update()) {
			this.draw();
			return true;
		}
		else {
			return false;
		}
	}
}