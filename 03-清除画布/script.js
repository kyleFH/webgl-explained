window.addEventListener(
    'load',
    function setupWebgl(evt){
        
        window.removeEventListener(evt.type,setupWebgl,false,);
        var paragraph = document.querySelector("p");
        var canvas = document.querySelector("canvas");

        var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

        if(!gl){
            paragraph.innerHTML = "Failed to get WebGL context. " +
            "Your browser or device may not support WebGL.";
            return 
        }
        paragraph.innerHTML = "Congratulations! Your browser supports WebGL. ";
        gl.viewport(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight);
        gl.clearColor(0,0.5,0,1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
    }
,false);