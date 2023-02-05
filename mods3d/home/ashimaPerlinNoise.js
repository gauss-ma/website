//bola:
var container,
    renderer,
    scene,
    camera,
    mesh,
    start = Date.now(),
    fov = 30;

window.addEventListener( 'load', function() {

    // grab the container from the DOM
    container = document.getElementById( "home-container" );

    // create a scene
    scene = new THREE.Scene();

    // create a camera the size of the browser window
    // and place it 100 units away, looking towards the center of the scene
    camera = new THREE.PerspectiveCamera(
        fov,
        window.innerWidth / window.innerHeight,
        1,
        10000 );
    camera.position.z = 100;
    camera.target = new THREE.Vector3( 0, 0, 0 );

    scene.add( camera );

material = new THREE.ShaderMaterial( {
      uniforms: {
        time: { // float initialized to 0
            type: "f",
            value: 0.0
        }
    },
    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
    wireframe: true	//wireFrame agregado por Ramiro

} );

    // create a sphere and assign the material
    mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry( 20, 4 ),
        material,
    );
    scene.add( mesh );

    // create the renderer and attach it to the DOM
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( window.innerWidth*0.8, window.innerHeight*0.7 );

    container.appendChild( renderer.domElement );

    render();

} );

function render() {
    // uniform update
    material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
    // let there be light
    renderer.render( scene, camera );
    requestAnimationFrame( render );
}


