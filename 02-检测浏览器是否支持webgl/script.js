window.addEventListener(
    'load',
    function(){
        var paragraph = document.querySelector("p");
        var button = document.querySelector("button");
        button.addEventListener('click',detectWebGLContext,false,);

        function detectWebGLContext(){
            var canvas = document.createElement("canvas");
            var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

            if(gl && gl instanceof WebGLRenderingContext){
                paragraph.innerHTML = "Congratulations! Your browser supports WebGL.";
            }else{
                paragraph.innerHTML = "Failed to get WebGL context. " +
                "Your browser or device may not support WebGL.";
            }
        }
    }
,false);