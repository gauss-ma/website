// Here u can do your maggic ;)
//
//
const $menu=$('.TabletMenu_root');
const $btn_menu=$('#botonMenu');
const $logo=$("#Logo_gauss");


document.title = "Gauss";

$(document).ready(function(){


        cerrarMenu();

        //ABRIR / CERRAR MENU:
        function abrirMenu(){
                console.log("Abriendo Menu..");
                $menu.addClass("activo");
                $btn_menu.addClass('burguer_activo');
                $btn_menu.removeClass('burger_inactivo');
                $menu.toggle();//show();
                $("body").addClass("touch-off no-scroll");
                setBlack();
        };

        function cerrarMenu(){
                console.log("Cerrando Menu..");
                $menu.removeClass("activo");
                $btn_menu.addClass('burger_inactivo');
                $btn_menu.removeClass('burguer_activo');
                $menu.toggle();//$menu.slideUp(); // $menu.hide();
                $("body").removeClass("touch-off no-scroll");
                //setWhite();
        };

        $btn_menu.on('click',function () {
                if ( $menu.attr('class') == "TabletMenu_root activo") {cerrarMenu()}
                else if ( $menu.attr('class') == "TabletMenu_root") {abrirMenu()}
                else {consola.log("tamo todos locos")};
        });


        // FUNCION PARA SCROLLEAR CUANDO APRETAS UN ITEM DEL MENU:
        $('nav a').on('click', function() {
            var scrollAnchor = $(this).attr('data-scroll'),
                scrollPoint = $('section[name="' + scrollAnchor + '"]').offset().top - 0;

            $('body,html').animate({
                scrollTop: scrollPoint
            }, 800);

            cerrarMenu()

            return false;
        })


        //$(window).scroll(function() {
        //    var windscroll = $(window).scrollTop();
        //    if (windscroll >= 100) {
        //        $('nav').addClass('fixed');
        //        $('.wrapper section').each(function(i) {
        //            if ($(this).position().top <= windscroll - 20) {
        //                $('nav a.active').removeClass('active');
        //                $('nav a').eq(i).addClass('active');
        //            }
        //        });

        //    } else {

        //        $('nav').removeClass('fixed');
        //        $('nav a.active').removeClass('active');
        //        $('nav a:first').addClass('active');
        //    }

        //}).scroll();

        //SCROLLEAR HASTA ARRIBA CUANDO CLICKEAS EN EL LOGO
        $logo.on('click', function() {
            $('body,html').animate({
                scrollTop: 0
                }, "slow",'swing');


                
            cerrarMenu();
            return false;
        })
        //SCROLLEAR HASTA lista de servicios cuando clickias un icono de servicios
        $('.icon').on('click', function() {
            var scrollAnchor = $(this).attr('data-scroll'),
            scrollPoint = $('.icon_wrapper').offset().top - 100;
            $('body,html').animate({ scrollTop: scrollPoint }, 500);

            return false;
        })

	//Acciones que ocurren a medida que scrolleo:

        // CAMBIAR COLOR DE LOGO Y MENU-ICON SEGUN EL BACKGROUND/SECCION
        
        
        
        
        
        

        
        
        
        

        //STEPER DE SERVICIOS:

		 curOpen = $('.step')[0];
		  
		  $('.next-btn').on('click', function() {
		    let cur = $(this).closest('.step');
		    let next = $(cur).next();
		    $(cur).addClass('minimized');
		    setTimeout(function() {
		      $(next).removeClass('minimized');
		      curOpen = $(next);
		    }, 400);
		  });
		  
		  $('.close-btn').on('click', function() {
		    let cur = $(this).closest('.step');
		    $(cur).addClass('minimized');
		    curOpen = null;
		  });
		  
		  $('.step .step-content').on('click' ,function(e) {
		    e.stopPropagation();
		  });
		  
		  $('.step').on('click', function() {
		    if (!$(this).hasClass("minimized")) {
		      curOpen = null;
		      $(this).addClass('minimized');
		    }
		    else {
		      let next = $(this);
		      if (curOpen === null) {
		        curOpen = next;
		        $(curOpen).removeClass('minimized');
		      }
		      else {
		        $(curOpen).addClass('minimized');
		        setTimeout(function() {
		          $(next).removeClass('minimized');
		          curOpen = $(next);
		        }, 300);
		      }
		    }
		  });
});

// QGIS-CANVAS
//Q3D.Config.bgColor = '#1f1f1f';
//Q3D.Config.localMode = true;
//Q3D.Config.AR.MND = 0.0;
//
//var container = document.getElementById("view");
//app.init(container);          // initialize application
//init();                       // initialization for mobile template
//
//app.addEventListener("sceneLoaded", function () {
//  initLayerList();
//});
//
//// load the scene
//app.loadSceneFile("./data/index/scene.js", function () {
//  app.start();
//
//  // North arrow inset
//  // if (Q3D.Config.northArrow.visible) app.buildNorthArrow(document.getElementById("northarrow"), app.scene.userData.rotation);
//
//  // if ("AR" in app.urlParams) {
//  //   document.getElementById("ar-checkbox").checked = true;
//  //   startARMode();
//  //   moveToCurrentLocation();
//  // }
//});









// Animación de contador, using jQuery animate
//$('.counting').each(function() {
//  var $this = $(this),
//      countTo = $this.attr('data-count');
//  
//  $({ countNum: $this.text()}).animate({
//    countNum: countTo
//  },
//
//  {
//
//    duration: 3000,
//    easing:'linear',
//    step: function() {
//      $this.text(Math.floor(this.countNum));
//    },
//    complete: function() {
//      $this.text(this.countNum);
//      //alert('finished');
//    }
//
//  });  
//  
//
//});
//
(function($) {

	
	
//
//  /**
//   * Copyright 2012, Digital Fusion
//   * Licensed under the MIT license.
//   * http://teamdf.com/jquery-plugins/license/
//   *
//   * @author Sam Sehnert
//   * @desc A small plugin that checks whether elements are within
//   *     the user visible viewport of a web browser.
//   *     only accounts for vertical position, not horizontal.
//   */
//
  $.fn.visible = function(partial) {
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height()/10.,
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  };
  
})(jQuery);

var allMods = $(".column-text");

var pos_objetivo = $("section[name=objetivo]").position().top;

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.children().addClass("visible"); 
  } 
});

$(window).scroll(function(event) {
 	pos=$(window).scrollTop(); 
 	//console.log(pos);

	if(pos>=pos_objetivo){
		$(".words").children().addClass("activo");
	}
  	allMods.each(function(i, el) {
  	  var el = $(el);
  	  if (el.visible(true)) {
  	    el.addClass("visible"); 
  	  } 
  	  else{
  	    el.removeClass("visible"); 
  	  }
  	});

	//cambiar el color de los header segun el fondo
	var is_bgoscuro=false;
	$(".bg-oscuro").each(function(){
		var lim_sup = $(this).offset().top - 50;
    		var lim_inf = lim_sup + $(this).height() + 2*50;
		is_bgoscuro=(is_bgoscuro || (pos >= lim_sup && pos <= lim_inf))
	});
	(is_bgoscuro)? (setWhite()):(setBlack());
  
});

function setBlack(){
        $logo.removeClass("white");
        $logo.addClass("black");
        $btn_menu.removeClass("white");
        $btn_menu.addClass("black");
};
                                        
function setWhite(){
        $logo.removeClass("black");
        $logo.addClass("white");
        $btn_menu.removeClass("black");
        $btn_menu.addClass("white");
};






/*CANVAS GW*/

    	// ESCENA
    	var scene = new THREE.Scene();
    	
	var canvasWidth=$("#canvasGW").innerWidth();
	var canvasHeight=$("#canvasGW").innerHeight();
    	// CAMARA
    	//var camera = new THREE.PerspectiveCamera(25, window.innerWidth/window.innerHeight, .1, 50) //params: zoom, ratioW/H, near, far
    	var camera = new THREE.PerspectiveCamera(50, canvasWidth/canvasHeight, .1, 500) //params: zoom, ratioW/H, near, far
    	
    	
    	// RENDERER
    	var renderer = new THREE.WebGLRenderer({canvas:canvasGW});
    	//renderer.setSize(window.innerWidth*0.9, window.innerHeight*0.9);
    	renderer.setSize(canvasWidth, canvasHeight);
    	renderer.setClearColor(0xf7f7f7);
    	renderer.shadowMap.enabled = true;
    	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	
	//CONTROL
	var controls = new THREE.OrbitControls( camera, renderer.domElement );

    	// EJES VECTORES
    	//var axis = new THREE.AxesHelper(1);
    	//scene.add(axis);
		var points = [new THREE.Vector3( 0.5, 0, 0 )];
		points.push( new THREE.Vector3( 0, 0, 0 ) );
		var material = new THREE.LineBasicMaterial({	color: 0x202020,linewidth:1.2,linecap:'butt'});
		var geometry = new THREE.BufferGeometry().setFromPoints( points );
		
		var lineX = new THREE.Line( geometry, material );
		var lineY = new THREE.Line( geometry, material );
		var lineZ = new THREE.Line( geometry, material );
	
		lineY.rotation.z = Math.PI*0.5;
		lineZ.rotation.y = 0.5*Math.PI;
        	var AXIS = new THREE.Group();
        		AXIS.add( lineX );
        		AXIS.add( lineY );
        		AXIS.add( lineZ );
        	scene.add( AXIS );
		
	////// Grilla
    	//var grid = new THREE.GridHelper(5,5);
    	//scene.add(grid);
    	
	//Materiales:

        var edifMaterial = new THREE.MeshLambertMaterial({ color: 0xf7d6a1 });
	var linea = new THREE.LineBasicMaterial( { color: 0x202020 } );
        var planeMaterial = new THREE.MeshLambertMaterial({color:0xf7f7f7, reflectivity: 0.3 });
        planeMaterial.side = THREE.DoubleSide;

	//Objetos:
	//Piso
		var planeGeo = new THREE.PlaneGeometry(150,150,4);
		var piso  = new THREE.Mesh(planeGeo,planeMaterial);
		piso.receiveShadow = true;
		scene.add(piso );
		piso.rotation.x = -.5*Math.PI;

	//CAJA
		var edifGeo = new THREE.BoxGeometry(.5,0.5,.5);
		var edificio = new THREE.Mesh( edifGeo, edifMaterial );
		edificio.castShadow = true;
		scene.add( edificio );
        
	// Agregar a canvas
	renderer.render(scene,camera);	

	//SETUP ESTÁTICO:
	camera.position.set(3.5,7.1,2.4);
	scene.position.x=0;scene.position.y=1;	scene.position.z=0;
	camera.lookAt(scene.position);

	AXIS.position.x=-1;
	AXIS.position.z= 2;

	edificio.position.y=1.2
        // LUZ
	//luz ambiente
        //var light = new THREE.AmbientLight( 0x151515 ); // soft white light
        //scene.add( light );

	//luz direccionada
        //var spotLight = new THREE.SpotLight(0xffffff);
        //spotLight.position.set(camera.position.x+1,camera.position.y+5,camera.position.z+5);
        //spotLight.castShadow = true;
        //scene.add(spotLight);

	//DirectionalLight and turn on shadows for the light
	var light = new THREE.DirectionalLight( 0xf7f7f7, 1.1 );
	light.position.set(camera.position.x-2,camera.position.y+2,camera.position.z+1);//default; light shining from top
	light.castShadow = true;            // default false
	scene.add( light );
	//Set up shadow properties for the light
	light.shadow.mapSize.width = 25;  // default
	light.shadow.mapSize.height = 25; // default
	light.shadow.camera.near = 1;    // default
	light.shadow.camera.far = 50;     // default

// Agregar a canvas
renderer.render(scene,camera);
		//function animate() {
	//   requestAnimationFrame( animate );
	//     // required if controls.enableDamping or controls.autoRotate are set to true
	//     controls.update();
	//     renderer.render( scene, camera );
    	//}
	//animate();











/*CANVAS AIRE*/
	var canvasAIRWidth=$("#canvasAIR").innerWidth();
	var canvasAIRHeight=$("#canvasAIR").innerHeight();

    var sceneAIR = new THREE.Scene();
    //sceneAIR.add(new THREE.AmbientLight(0xeeeeee));

    var cameraAIR = new THREE.PerspectiveCamera(45, canvasAIRWidth / canvasAIRHeight, 0.1, 1000);
    cameraAIR.position.set(5, 15, 15);

	var rendererAIR = new THREE.WebGLRenderer({canvas:canvasAIR});
	    rendererAIR.setSize(canvasWidth, canvasHeight);
	    rendererAIR.setClearColor(0xf7f7f7);
	    rendererAIR.shadowMap.enabled = true;
	    rendererAIR.shadowMap.type = THREE.PCFSoftShadowMap;

	//CONTROL
	var controlsAIR = new THREE.OrbitControls( cameraAIR, rendererAIR.domElement );
    //var terrainLoader = new THREE.TerrainLoader();
    //terrainLoader.load('js/threejs/data/jotunheimen.bin', function(data) {

        var geometryTerrain = new THREE.PlaneGeometry(5, 5, 10, 10);

        var materialTerrain = new THREE.MeshLambertMaterial({ color: 0xf7d6a1,reflecitvity:0.4 });
        materialTerrain.side = THREE.DoubleSide;
        //for (var i = 0, l = geometry.vertices.length; i < l; i++) {
        //    geometry.vertices[i].z = Math.sin(i*0.02)**2;
        //}

        //var material = new THREE.MeshPhongMaterial({
        //    map: THREE.ImageUtils.loadTexture('js/threejs/data/jotunheimen-texture.jpg')
        //});

        var Terrain = new THREE.Mesh(geometryTerrain, materialTerrain);
        sceneAIR.add(Terrain);
	Terrain.rotation.y=Math.PI;
	Terrain.rotation.x=-0.5*Math.PI;
	Terrain.position.y=2.5;
	Terrain.castShadow=true;
	sceneAIR.add(piso);
	sceneAIR.add(light);
	sceneAIR.add(AXIS);
    //});


    rendererAIR.render(sceneAIR,cameraAIR);
	//function animateAIR() {
	//   requestAnimationFrame( animateAIR );
	//     // required if controls.enableDamping or controls.autoRotate are set to true
	//     controlsAIR.update();
	//     rendererAIR.render( sceneAIR, cameraAIR );
	//}
	//animateAIR();



    //function render() {
    //    controls.update();    
    //    requestAnimationFrame(render);
    //    renderer.render(sceneAIR, cameraAIR);
    //}





window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    //camera.aspect = window.innerWidth / window.innerHeight;
    //camera.updateProjectionMatrix();
    //renderer.setSize( window.innerWidth*0.5, window.innerHeight*0.5 );
    //rendererAIR.setSize( window.innerWidth*0.5, window.innerHeight*0.5 );

	var canvasAIRWidth=$("#canvasAIR").innerWidth();
	var canvasAIRHeight=$("#canvasAIR").innerHeight();
	var canvasGWWidth=$("#canvasGW").innerWidth();
	var canvasGWHeight=$("#canvasGW").innerHeight();

renderer.setSize(canvasGWWidth, canvasGWHeight);
rendererAIR.setSize(canvasAIRWidth, canvasAIRHeight);

    cameraAIR.aspect =canvasAIRWidth / canvasAIRHeight;
    camera.aspect =canvasGWWidth / canvasGWHeight;

    camera.updateProjectionMatrix();
    cameraAIR.updateProjectionMatrix();




}
