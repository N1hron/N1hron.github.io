export default function getNearestPoint(mouseLocation, points) {
    const { x, y } = mouseLocation;

    let minDistance = Number.MAX_SAFE_INTEGER,
        hoveredPoint = null;
    
    for (const p of points) {
        const distance = Math.hypot((x - p.x), (y - p.y)),
              threshhold = p.radius + 2;
        
        if (distance <= threshhold && distance <= minDistance) {
            minDistance = distance;
            hoveredPoint = p;
        }
    }

    return hoveredPoint;
}