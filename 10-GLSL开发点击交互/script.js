(function(){
  "use strict"
  window.addEventListener("load", setupWebGL, false);
  var gl,
    program;
  function setupWebGL (evt) {
    window.removeEventListener(evt.type, setupWebGL, false);
    if (!(gl = getRenderingContext()))
      return;
  
    var source = document.querySelector("#vertex-shader").innerHTML;

    //createShader 创建着色器
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);

    //shaderSource 设置着色器的 GLSL 程序代码
    gl.shaderSource(vertexShader,source);

    //compileShader 用于编译一个 GLSL 着色器，使其成为为二进制数据，然后就可以被WebGLProgram对象所使用
    gl.compileShader(vertexShader);
    
    source = document.querySelector("#fragment-shader").innerHTML
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,source);
    gl.compileShader(fragmentShader);

    //createProgram 方法用于创建和初始化一个 WebGLProgram 对象。
    program = gl.createProgram();

    //attachShader 负责往 WebGLProgram 添加一个片段或者顶点着色器。
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    //linkProgram 链接给定的WebGLProgram，从而完成为程序的片元和顶点着色器准备 GPU 代码的过程。
    gl.linkProgram(program);

    //detachShader 从一个 WebGLProgram中分离一个先前附加的片段或者顶点着色器（WebGLShader ）.
    gl.detachShader(program, vertexShader);
    gl.detachShader(program, fragmentShader);

    //deleteShader 用于删除一个参数提供的 WebGLShader对象。如果该WebGLShader对象已经被删除，该方法不会有任何作用。
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      var linkErrLog = gl.getProgramInfoLog(program);
      cleanup();
      document.querySelector("p").innerHTML = 
        "Shader program did not link successfully. "
        + "Error log: " + linkErrLog;
      return;
    } 
  
    initializeAttributes();
  
    //useProgram 将定义好的WebGLProgram 对象添加到当前的渲染状态中。
    gl.useProgram(program);
    gl.drawArrays(gl.POINTS, 0, 1);
  
    // cleanup();
    document.querySelector("canvas").addEventListener("click",
    (evt) => {
      const clickXRelativeToCanvas = evt.pageX - evt.target.offsetLeft;
      //x轴坐标：(offsetX - 1/2宽度) / 1/2宽度;clickXinWebGLCoords 为得出的坐标
      const clickXinWebGLCoords =
        (2.0 * (clickXRelativeToCanvas - gl.drawingBufferWidth / 2)) /
        gl.drawingBufferWidth;
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([clickXinWebGLCoords]),
        gl.STATIC_DRAW,
      );
      gl.drawArrays(gl.POINTS, 0, 1);
    }
    ,false)
  }

  
  
  var buffer;
  function initializeAttributes() {
    gl.enableVertexAttribArray(0);

    //createBuffer 方法可创建并初始化一个用于储存顶点数据或着色数据的WebGLBuffer对象
    buffer = gl.createBuffer();  
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(0, 1, gl.FLOAT, false, 0, 0);
  }
  
  function cleanup() {
  gl.useProgram(null);
  if (buffer)
    gl.deleteBuffer(buffer);
  if (program) 
    gl.deleteProgram(program);
  }
  
  function getRenderingContext() {
    var canvas = document.querySelector("canvas");
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    var gl = canvas.getContext("webgl") 
      || canvas.getContext("experimental-webgl");
    if (!gl) {
      var paragraph = document.querySelector("p");
      paragraph.innerHTML = "Failed to get WebGL context."
        + "Your browser or device may not support WebGL.";
      return null;
    }
    gl.viewport(0, 0, 
      gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    return gl;
  }
  })();