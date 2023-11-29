function initBuffers(gl) {
  const positionBuffer = initPositionBuffer(gl);
  const colorBuffer = initColorBuffer(gl);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };  
}

function initPositionBuffer(gl) {
  // Create a buffer for the square's positions.
  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the square.
  //const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0];
  const stX = -0.1, stY = 0, stX2 = 0.1, stY2 = 0;
  var positions = [], positions2 = [], positions3 = [];
  for (let i = 0.5 * Math.PI; i <= 1.5 * Math.PI; i+=Math.PI/10) {
    const x = stX+ ( 2 * Math.cos(i) );
    const y = stY + ( 2 * Math.sin(i) );
    positions.push(x, y);
  }
  for (let i = 2; i < positions.length; i+=2) {
    positions2.push(positions[i-2], positions[i-1]);
    positions2.push(positions[i], positions[i+1]);
    positions2.push(stX, stY);
  }
  positions = []
  for (let i = 0.5 * Math.PI; i >= -0.5 * Math.PI; i-=Math.PI/10) {
    const x = stX2 + ( 2 * Math.cos(i) );
    const y = stY2 + ( 2 * Math.sin(i) );
    positions.push(x, y);
  }
  for (let i = 2; i < positions.length; i+=2) {
    positions3.push(positions[i-2], positions[i-1]);
    positions3.push(positions[i], positions[i+1]);
    positions3.push(stX2, stY2);
  }

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions2.concat(positions3, positions2, positions3)), gl.STATIC_DRAW);

  return positionBuffer;
}

function initColorBuffer(gl) {
  const colors = [
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, // white
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, // gray
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, // white
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, // gray
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, // white
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, // gray
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, // white
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, // gray
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, // white
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, // gray

    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, // gray
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, // white
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, // gray
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, // white
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, // gray
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, // white
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, // gray
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, // white
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, 
    0.5,
    0.5,
    0.5,
    1.0, // gray
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, 
    1.0,
    1.0,
    1.0,
    1.0, // white
  ];
  for (let i = 0; i < 60; i++) {
    colors.push(0.0, 0.0, 0.0, 1.0);
  }
  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  return colorBuffer;
}

export { initBuffers };