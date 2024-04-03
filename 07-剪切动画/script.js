var gl,
    color = getRandomColor(),
    position;

window.addEventListener(
    'load',
    setupWebgl
,false);

function setupWebgl(evt){      
    window.removeEventListener(evt.type, setupWebgl, false);
    if (!(gl = getRenderingContext())) return;
    
    var animationOnoff = document.querySelector("#animation-onoff")
    gl.enable(gl.SCISSOR_TEST);
    gl.clearColor(color[0], color[1], color[2], 1.0);
    position = [0, gl.drawingBufferHeight];
    var timer;

    function startAnimation(evt){
        animationOnoff.removeEventListener(evt.type,startAnimation,false);
        animationOnoff.addEventListener("click",stopAnimation,false);

        document.querySelector("strong").innerHTML = "stop";
        timer = setInterval(switchColor,17);
        switchColor()

    }

    function stopAnimation(){
        animationOnoff.removeEventListener(evt.type,stopAnimation,false);
        animationOnoff.addEventListener("click",startAnimation,false);
        document.querySelector("strong").innerHTML = "start";
        clearInterval(timer);
    }

    stopAnimation({ type: "click" });

}
var size = [60,60],  velocity = 3.0;
        
function switchColor(){
    gl.scissor(position[0],position[1],size[0],size[1]);
    gl.clear(gl.COLOR_BUFFER_BIT);
    position[1] -= velocity;
    if(position[1] < 0){
        position = [Math.random()*(gl.drawingBufferWidth - size[0]),gl.drawingBufferHeight];
        velocity = 1 + Math.random()*6;
        color = getRandomColor();
        gl.clearColor(color[0], color[1], color[2], 1.0);
    }
    
}

function getRandomColor(){
    return [Math.random(),Math.random(),Math.random()]
}

function getRenderingContext() {
    var canvas = document.querySelector("canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    var gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      var paragraph = document.querySelector("p");
      paragraph.innerHTML =
        "Failed to get WebGL context." +
        "Your browser or device may not support WebGL.";
      return null;
    }
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return gl;
  }