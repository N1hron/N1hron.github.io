export default class Graph {
    constructor(points = [], segments = []) {
        this.points = points;
        this.segments = segments;
    }

    draw(ctx) {
        for (const segment of this.segments) segment.draw(ctx);
        for (const point of this.points) point.draw(ctx);
    }

    redraw(ctx) {
        const { canvas } = ctx;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.draw(ctx);
    }

    removeAll() {
        this.points.length = 0;
        this.segments.length = 0;
    }

    addPoint(point) {
        if (!this.containsPoint(point)) return !!this.points.push(point);
        else return false;
    }

    addSegment(segment) {
        if (!this.containsSegment(segment) && !segment.hasIdenticalPoints()) return !!this.segments.push(segment);
        else return false;
    }

    removePoint(point) {
        this.points.splice(this.points.indexOf(point), 1);
        this.removeSegmentsWithPoint(point);
    }

    removeSegment(segment) {
        this.segments.splice(this.segments.indexOf(segment), 1);
    }
    
    removeSegmentsWithPoint(point) {
        this.segments = this.segments.filter(s => !s.hasPoint(point));
    }

    containsPoint(point) {
        return !!this.points.find(p => p.equals(point));
    }

    containsSegment(segment) {
        return !!this.segments.find(s => s.equals(segment));
    }

    hasAnySegments() {
        return !!this.segments.length;
    }

    hasAnyPoints() {
        return !!this.points.length;
    }
}