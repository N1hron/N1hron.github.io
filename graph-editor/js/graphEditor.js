import Point from './point.js';
import Segment from './segment.js';
import getNearestPoint from './utils/getNearestPoint.js';

export default class GraphEditor {
    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;

        this.ctx = canvas.getContext('2d');

        this.mouseLocation = null;
        this.selectedPoint = null;
        this.hoveredPoint = null;
        
        this.dragging = false;
    }

    init() {
        this.#addEventListeners();
        this.#animate();
    }

    #animate() {
        this.graph.redraw(this.ctx);
        
        this.#drawSegmentIntent();
        this.#drawPointSelection();
        this.#drawPointHover();

        requestAnimationFrame(() => this.#animate());
    }

    #addEventListeners() {
        this.canvas.addEventListener('mousedown', event => this.#handleMouseDown(event));
        this.canvas.addEventListener('mousemove', event => this.#handleMouseMove(event));
        this.canvas.addEventListener('mouseup', () => this.dragging = false);
        this.canvas.addEventListener('mouseleave', () => this.hoveredPoint = null);
        this.canvas.addEventListener('contextmenu', event => event.preventDefault());
    }

    #drawPointSelection() {
        if (this.selectedPoint) {
            this.selectedPoint.draw(this.ctx, { selected: true });
        }
    }

    #drawPointHover() {
        if (this.hoveredPoint && this.hoveredPoint !== this.selectedPoint) {
            this.hoveredPoint.draw(this.ctx, { hovered: true });
        }
    }

    #drawSegmentIntent() {
        if (this.selectedPoint) {
            new Segment(
                this.selectedPoint, 
                this.hoveredPoint || this.mouseLocation
            ).draw(this.ctx, { dash: [5, 5] });
        }
    }

    #handleMouseDown(event) {
        const button = event.button;

        switch (button) {
            case 0:
                this.#handleLeftClick(event);
                break;
            case 2:
                this.#handleRightClick();
                break;
        }
    }

    #handleMouseMove(event) {
        this.mouseLocation = {
            x: event.offsetX,
            y: event.offsetY
        };

        this.hoveredPoint = getNearestPoint(this.mouseLocation, this.graph.points, 10);

        if (this.dragging) {
            this.selectedPoint.x = event.offsetX;
            this.selectedPoint.y = event.offsetY;
        }
    }

    #handleLeftClick(event) {
        let previouslySelectedPoint = this.selectedPoint;

        if (this.hoveredPoint) this.#selectHoveredPoint();
        else this.#createPoint(new Point(event.offsetX, event.offsetY));

        if (previouslySelectedPoint) {
            this.graph.addSegment(new Segment(
                previouslySelectedPoint, 
                this.selectedPoint
            ));
        }
    }

    #handleRightClick() {
        if (this.selectedPoint) this.selectedPoint = null;
        else if (this.hoveredPoint) this.#removeHoveredPoint();
    }

    #removeHoveredPoint() {
        this.graph.removePoint(this.hoveredPoint);
        if (this.hoveredPoint === this.selectedPoint) this.selectedPoint = null;
        this.hoveredPoint = null;
    }

    #selectHoveredPoint() {
        this.selectedPoint = this.hoveredPoint;
        this.dragging = true;
    }

    #createPoint(newPoint) {
        this.selectedPoint = newPoint;
        this.hoveredPoint = this.selectedPoint;

        this.graph.addPoint(newPoint);
    }
}