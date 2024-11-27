import Point from './point.js';
import Segment from './segment.js';
import Graph from './graph.js';
import GraphEditor from './graphEditor.js';
import getRandomIntInclusive from './utils/getRandomIntInclusive.js';

const canvas = document.getElementById('canvas');

const addRandomPointBtn = document.querySelector('[data-action="add-rnd-point"]'),
      addRandomSegmentBtn = document.querySelector('[data-action="add-rnd-segment"]'),
      removeRandomPointBtn = document.querySelector('[data-action="remove-rnd-point"]'),
      removeRandomSegmentBtn = document.querySelector('[data-action="remove-rnd-segment"]'),
      removeAllBtn = document.querySelector('[data-action="remove-all"]');

canvas.width = 600;
canvas.height = 600;

// const ctx = canvas.getContext('2d');

const p1 = new Point(20, 20),
      p2 = new Point(580, 580),
      p3 = new Point(580, 20),
      p4 = new Point(20, 580);

const s1 = new Segment(p1, p2),
      s2 = new Segment(p2, p3),
      s3 = new Segment(p1, p4);

const graph = new Graph([ p1, p2, p3, p4 ], [ s1, s2, s3 ]);

const graphEditor = new GraphEditor(canvas, graph);

graphEditor.init();

addRandomPointBtn.addEventListener('click', addRandomPoint);
addRandomSegmentBtn.addEventListener('click', addRandomSegment);
removeRandomPointBtn.addEventListener('click', removeRandomPoint);
removeRandomSegmentBtn.addEventListener('click', removeRandomSegment);
removeAllBtn.addEventListener('click', removeAll);

function removeAll() {
    graph.removeAll();
    graphEditor.selectedPoint = null;
}

function addRandomPoint() {
    const x = getRandomIntInclusive(0, canvas.width),
          y = getRandomIntInclusive(0, canvas.height);

    const pointAdded = graph.addPoint(new Point(x, y));

    // if (pointAdded) graph.redraw(ctx);
}

function addRandomSegment() {
    if (graph.hasAnyPoints()) {
        const pointIndex1 = getRandomIntInclusive(0, graph.points.length - 1),
          pointIndex2 = getRandomIntInclusive(0, graph.points.length - 1);

        const segmentAdded = graph.addSegment(
            new Segment(
                graph.points[pointIndex1], 
                graph.points[pointIndex2]
            )
        );

        // if (segmentAdded) graph.redraw(ctx);
    }
}

function removeRandomPoint() {
    if (graph.hasAnyPoints()) {
        const index = getRandomIntInclusive(0, graph.points.length - 1);

        graph.removePoint(graph.points[index]);

        // graph.redraw(ctx);
    }
}

function removeRandomSegment() {
    if (graph.hasAnySegments()) {
        const index = getRandomIntInclusive(0, graph.segments.length - 1);

        graph.removeSegment(graph.segments[index]);

        // graph.redraw(ctx);
    }
}
