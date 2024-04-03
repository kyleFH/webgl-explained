window.addEventListener(
    'load',
    function setupWebgl(evt){
        
        window.removeEventListener(evt.type, setupWebgl, false);

        var button = document.querySelector("#animation-onoff");
        var verb = document.querySelector("strong");
        
        var timer;
        
        function startAnimation(evt){
            button.removeEventListener(evt.type,startAnimation,false);
            button.addEventListener('click',stopAnimation,false);
            verb.innerHTML = '暂停';
            timer = setInterval(switchColor,1000)
            switchColor()
        }

        function stopAnimation(evt){
            button.removeEventListener(evt.type,stopAnimation,false);
            button.addEventListener('click',startAnimation,false);
            verb.innerHTML = '开始';
            clearInterval(timer);
        }

        stopAnimation({type:'click'})

        var gl;
        function switchColor(){
            if(!gl){
                var canvas = document.querySelector("#canvas-view");
                var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    
                if(!gl){
                    clearInterval(timer);
                    alert(
                        "Failed to get WebGL context.\n" +
                          "Your browser or device may not support WebGL.",
                      );
                    return 
                }
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