// Sensitivity when taking mouse wheel action into account
const zoomSensitivity = 0.1;

// Scale while drawing objects
// Start with a scale of 1
let currentScale = 1;

// Transformation while drawing objects
// Start with no transformation
let transformX = 0;
let transformY = 0;

// List of circles on the screem
let circles = [];

// To detect when mouse is dragged
// Used to not create a circle on the screen when panned
let isMouseDragged = false;
let mousePressedX = null;
let mousePressedY = null;
const mouseDragDetectionThreshold = 10;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0, 0, 0);
  stroke(180, 180, 180);
  fill(255, 255, 255);

  push();
  translate(transformX, transformY);
  scale(currentScale);
  circles.forEach(circle => ellipse(circle.x, circle.y, circle.r, circle.r));
  pop();
}

function mousePressed() {
  mousePressedX = mouseX;
  mousePressedY = mouseY;
}

function mouseDragged() {
  if (dist(mousePressedX, mousePressedY, mouseX, mouseY) > mouseDragDetectionThreshold) {
    isMouseDragged = true;
    transformX += (mouseX - pmouseX);
    transformY += (mouseY - pmouseY);
  }
}

function mouseReleased() {
  if (!isMouseDragged) {
    // Push a circle that will be drawn on the screen
    // Reverse the transformation and scale while storing the coordinates
    circles.push({
      x: (mouseX - transformX) / currentScale,
      y: (mouseY - transformY) / currentScale,
      r: random(5, 100),
    });
  }
  mousePressedX = null;
  mousePressedY = null;
  isMouseDragged = false;
}

function mouseWheel(event) {
  // Determine the scale factor based on zoom sensitivity
  let scaleFactor = null;
  if (event.delta < 0) {
    scaleFactor = 1 + zoomSensitivity;
  } else {
    scaleFactor = 1 - zoomSensitivity;
  }

  // Apply transformation and scale incrementally
  currentScale = currentScale * scaleFactor;
  transformX = mouseX - (mouseX * scaleFactor) + (transformX * scaleFactor);
  transformY = mouseY - (mouseY * scaleFactor) + (transformY * scaleFactor);

  // Disable page scroll
  return false;
}
