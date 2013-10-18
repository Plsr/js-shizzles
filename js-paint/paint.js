/* © 2009 ROBO Design
 * http://www.robodesign.ro
 */

// Keep everything in anonymous function, called on window load.
if(window.addEventListener) {
  //on load call function()
window.addEventListener('load', function () {
  var canvas, context;

  // Initialization sequence.
  function init () {
    // Find the canvas element.
    canvas = document.getElementById('imageView');

    //is a canvas?
    if (!canvas) {
      alert('Error: I cannot find the canvas element!');
      return;
    }

    //can get context?
    if (!canvas.getContext) {
      alert('Error: no canvas.getContext!');
      return;
    }

    // Get the 2D canvas context.
    context = canvas.getContext('2d');
    if (!context) {
      alert('Error: failed to getContext!');
      return;
    }

    //Pencil tool instance
    tool = new tool_pencil();

    // Attach the mousemove, mousedown and mouseup event handler.
    canvas.addEventListener('mousemove', ev_canvas, false);
    canvas.addEventListener('mousedown', ev_canvas, false);
    canvas.addEventListener('mouseup', ev_canvas, false);
  }

  //This painting tool works like a drawing pancil which tracks the 
  //mouse movements
  function tool_pencil () {
    var tool = this;
    this.started = false;

      //This is called when you start holding down the mouse button.
      //This starts the pencil drawing.
      this.mousedown = function (ev) {
        context.beginPath();
        context.moveTo(ev._x, ev._y);
        tool.started = true;
      };

      //This function is called every time you move the mouse. Only draws 
      //if tool.started is true, means when mouse button is held down
      this.mousemove = function (ev) {
        if (tool.started) {
          context.lineTo(ev._x, ev._y);
          context.stroke();
        }
      };

      //This is called on button release.
      this.mouseup = function (ev) {
        if(tool.started){
          tool.mousemove(ev);
          tool.started = false;
        }
      };
  }

  // The mousemove event handler.
  function ev_canvas (ev) {

    // The general purpose event handler.
    //Gets the mouse position relative to the canvas element.
    if (ev.layerX || ev.layerX == 0) { // Firefox
      ev._x = ev.layerX;
      ev._y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) { // Opera
      ev._x = ev.offsetX;
      ev._y = ev.offsetY;
    }

    //Call the event handler of the function
    var func = tool[ev.type];
    if(func) {
      func(ev);
    }
  }

  init();
}, false); }

// vim:set spell spl=en fo=wan1croql tw=80 ts=2 sw=2 sts=2 sta et ai cin fenc=utf-8 ff=unix: