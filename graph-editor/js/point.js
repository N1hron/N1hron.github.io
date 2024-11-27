export default class Point {
    constructor(x = 0, y = 0, radius = 8) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    equals(point) {
        return point.x == this.x && this.y == point.y;
    }

    draw(ctx, {
        selected = false,
        hovered = false,
        color = '#959595', 
        selectColor = "#222",
        hoverColor = "#222"
    } = {}) {
        this.#drawPoint(ctx, color);
        if (selected) this.#drawSelection(ctx, selectColor);
        if (hovered && !selected) this.#drawHover(ctx, hoverColor);
    }

    #drawPoint(ctx, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    #drawSelection(ctx, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, this.radius * 0.7, 0, 2 * Math.PI);
        ctx.fill();
    }

    #drawHover(ctx, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, this.radius * 0.4, 0, 2 * Math.PI);
        ctx.fill();
    }
}