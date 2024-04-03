window.addEventListener(
    'load',
    function setupWebgl(evt){
        
        window.removeEventListener(evt.type, setupWebgl, false);

        var paragraph = document.querySelector("p");
        var button = document.querySelector("#color-switcher");
        var canvas = document.querySelector("#canvas-view");
       
        button.addEventListener('click',switchColor,false);
        canvas.addEventListener('click',switchColor,false);
        
        // gl.viewport(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight);
        // gl.clearColor(0,0.5,0,1);
        // gl.clear(gl.COLOR_BUFFER_BIT);

        var gl;
        function switchColor(){
            if(!gl){
                var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    
                if(!gl){
                    alert(
                        "Failed to get WebGL context.\n" +
                          "Your browser or device may not support WebGL.",
                      );
                    return 
                }
                paragraph.innerHTML = "Congratulations! Your browser supports WebGL. ";
                gl.viewport(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight);
            }
            var color = getRandomColor();
            gl.clearColor(color[0],color[1],color[2],1);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        

        function getRandomColor(){
            return [Math.random(),Math.random(),Math.random()]
        }
    }
,false);