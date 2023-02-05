let camera, scene, renderer;

init();
animate();

function init() {

  camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 50;

  scene = new THREE.Scene();

	const geometry = new THREE.CircleGeometry( 0.1, 12 );
	const material = new THREE.MeshBasicMaterial( { color: 0xffffff,transparent:true } );

  	material.onBeforeCompile = function(shader) {

  	  shader.fragmentShader = shader.fragmentShader.replace(
  	    'gl_FragColor = vec4( packNormalToRGB( normal ), opacity );',
  	    [
  	      'gl_FragColor = vec4( packNormalToRGB( normal ), opacity );',
  	      'gl_FragColor.a *= pow( gl_FragCoord.z, 50.0 );',
  	    ].join('\n')
  	  );

  	};

  for (let i = 0; i < 300; i++) {

    const object = new THREE.Mesh(geometry, material);
    object.position.x = Math.random() * 80 - 40;
    object.position.y = Math.random() * 80 - 40;
    object.position.z = Math.random() * 80 - 40;
    //object.rotation.x = 0;//Math.random() * 2 * Math.PI;
    //object.rotation.y = 0;//Math.random() * 2 * Math.PI;
    //object.rotation.z = 0;//Math.random() * 2 * Math.PI;
    //object.scale.x = Math.random() + 0.5;
    //object.scale.y = Math.random() + 0.5;
    //object.scale.z = Math.random() + 0.5;
    object.lookAt(camera.position);
    scene.add(object);

  }

    // create the renderer and attach it to the DOM
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( window.innerWidth*0.8, window.innerHeight*0.7 );

    container = document.getElementById( "objetivo-container" );
    container.appendChild( renderer.domElement );

    new THREE.OrbitControls(camera, renderer.domElement);

}

function animate() {

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
 
  //camera.fov *=1.0001;//0.999;
  //camera.updateProjectionMatrix();

  for (let i = 0; i < scene.children.length; i++) {
      scene.children[i].lookAt(camera.position)
   }; 
  
  
};

