window.addEventListener(
    'load',
    function setupWebgl(evt){
        
        window.removeEventListener(evt.type, setupWebgl, false);
        var gl;
        if(!gl){
            var canvas = document.querySelector("canvas");
            var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

            if(!gl){
                alert(
                    "Failed to get WebGL context.\n" +
                      "Your browser or device may not support WebGL.",
                  );
                return 
            }
            gl.viewport(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight);
        }

        var mask = [true,true,true]
        var redtoggle = document.querySelector("#red-toggle");
        var greentoggle = document.querySelector("#green-toggle");
        var bluetoggle = document.querySelector("#blue-toggle");
        redtoggle.addEventListener("click",setColorMask,false);
        greentoggle.addEventListener("click",setColorMask,false);
        bluetoggle.addEventListener("click",setColorMask,false);
        
        var timer = setInterval(switchColor,1000);

        function setColorMask(evt){
            const index = (evt.target === greentoggle && 1) || (evt.target === bluetoggle && 2) || 0;
            mask[index] = !mask[index];
            evt.target.textContent = mask[index] ? "On" : "Off";
            gl.colorMask(mask[0],mask[1],mask[2],true);
            console.log('mask',mask,index)
            switchColor()
        }
        

        
        function switchColor(){
           
            var color = getRandomColor();
            gl.clearColor(color[0],color[1],color[2],1);
            gl.clear(gl.COLOR_BUFFER_BIT);
        }
        

        function getRandomColor(){
            return [Math.random(),Math.random(),Math.random()]
        }
    }
,false);