//global for selector callbacks, initially red
var drawingColor = "#FF0000";

//globals for color tracking
var customYellow = true; // > 200, > 200, < 150
var customGreen = false; // < 190, > 200, < 145
var customPurple = false; // > 200, < 120, 100<x<200

// draw grey canvas
function drawBackground() {
  var c = document.getElementById("drawingCanvas");
  var gc = c.getContext("2d");
  gc.fillStyle = "#EEEEEE";
  gc.fillRect(0, 0, c.width, c.height);
}

// action on 'clear' button
function clearCanvas() {
  drawBackground();
}

// action on RGB drawing color selection
function changeDrawingColor(e) {
  drawingColor = e.value;
}

// action on stylus color selection
function changeStylusColor(e) {
  switch (e.id) {
    case "y":
      customYellow = true;
      customGreen = false;
      customPurple = false;
      console.log('tracking y')
      trackColor();
      break;
    case "g":
      customGreen = true;
      customYellow = false;
      customPurple = false
      console.log('tracking g');
      trackColor();
      break;
    case "p":
      customPurple = true;
      customYellow = false;
      customGreen = false;
      trackColor();
      console.log('tracking p');
      break;
  }
}

// sets color tracking
function trackColor() {
  var tracker = setTracker();
  var video = document.getElementById("video");
  tracking.track("#video", tracker, { camera: true });
  tracker.on("track", function (event) {
    for (var rect of event.data) {
      document.getElementById("result").innerHTML = "OK!";
      draw(rect.x, rect.y, drawingColor);
    }
  });
}

// color tracking utility func
function setTracker() {
  if (customYellow) {
    tracking.ColorTracker.registerColor("customYellow", function (r, g, b) {
      return r > 200 && g > 200 && b < 150;
    });
    return (new tracking.ColorTracker("customYellow"));
  } else if (customGreen) {
    tracking.ColorTracker.registerColor("customGreen", function (r, g, b) {
      return r < 190 && g > 200 && b < 145;
    });
    return (new tracking.ColorTracker("customGreen"));
  } 
    tracking.ColorTracker.registerColor("customPurple", function (r, g, b) {
      return r > 200 && g < 120 && b > 100 & b < 200;
    });
    return (new tracking.ColorTracker("customPurple"));
}

// draw using coordinates from tracking.js
function draw(x, y, drawingColor) {
  var c = document.getElementById("drawingCanvas");
  var gc = c.getContext("2d");
  gc.fillStyle = drawingColor;
  gc.beginPath();
  gc.arc(x * 2, y * 2, 13, 0, 2 * Math.PI);
  gc.fill();
}

//onload: set up canvas, set stylus color tracker (initially yellow)
window.onload = function () {
  drawBackground();
  trackColor();
};
