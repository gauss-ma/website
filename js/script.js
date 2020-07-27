// Here u can do your maggic ;)
//
//
document.title = "Gauss";

const $menu=$('.TabletMenu_root');
const $btn_menu=$('#botonMenu');
const $logo=$("#Logo_gauss");


$(document).ready(function(){

        //cerrarMenu();

        //ABRIR / CERRAR MENU:
        function abrirMenu(){
                console.log("Abriendo Menu..");
                $menu.removeClass("fade-out");
		//$menu.addClass("fade-in");
                $btn_menu.addClass('burguer_activo');
                $btn_menu.removeClass('burger_inactivo');
                $menu.children().toggle();//show();
                $("body").addClass("touch-off no-scroll");
                setBlack();
        };

        function cerrarMenu(){
                console.log("Cerrando Menu..");
                //$menu.removeClass("fade-in");
                $menu.addClass("fade-out");
                $btn_menu.addClass('burger_inactivo');
                $btn_menu.removeClass('burguer_activo');
                $("body").removeClass("touch-off no-scroll");
                //setWhite();
                $menu.children().toggle();//$menu.slideUp(); // $menu.hide();
        };

        $btn_menu.on('click',function () {
                if ( $menu.attr('class') == "TabletMenu_root") {cerrarMenu()}
                else if ( $menu.attr('class') == "TabletMenu_root fade-out") {abrirMenu()}
                else {console.log("tamo todos locos")};
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


//SCROLLEAR HASTA ARRIBA CUANDO CLICKEAS EN EL LOGO
$("#Logo_gauss").on('click', function() {
    $('body,html').animate({
        scrollTop: 0
        }, "slow",'swing');
    cerrarMenu();
    return false;
});



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



var allMods = $(".animar_fade-in-up");
var pos_objetivo = $("section[name=objetivo]").position().top;

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("fade-in-up"); 
  } 
});

$(window).scroll(function(event) {
 	pos=$(window).scrollTop(); 
 	//console.log(pos);


	//fade-in palabras de OBJETIVOS:
	if(pos>=pos_objetivo){
		$(".objetivo-words").children().addClass("fade-in");
	}

	//fade-in-up textos al scrollear:
  	allMods.each(function(i, el) {
  	  var el = $(el);
  	  if (el.visible(true)) {
  	    el.addClass("fade-in-up"); 
  	  } 
  	  else{
  	    el.removeClass("fade-in-up"); 
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
  

//sceneAIR.rotation.y=pos/1000.;rendererAIR.render(sceneAIR,cameraAIR);
//sceneGW.rotation.y=pos/1000.;rendererGW.render(sceneGW,cameraGW);
//appAIR.scene.rotation.z=pos/100.;appAIR.renderer.render(appAIR.scene,appAIR.camera);    //qgis
//appSW.scene.rotation.z=pos/100.;appGW.renderer.render(appGW.scene,appGW.camera);		//qgis
});

function setBlack(){
        $logo.removeClass("white");
        //$logo.addClass("black");
        $btn_menu.removeClass("white");
        $btn_menu.addClass("black");
};
                                        
function setWhite(){
        //$logo.removeClass("black");
        $logo.addClass("white");
        $btn_menu.removeClass("black");
        $btn_menu.addClass("white");
};












//OBJETOS:
//	//AXIS:
//	var points = [new THREE.Vector3( 0.5, 0, 0 )];
//	points.push( new THREE.Vector3( 0, 0, 0 ) );
//	var material = new THREE.LineBasicMaterial({	color: 0x202020,linewidth:1.2,linecap:'butt'});
//	var geometry = new THREE.BufferGeometry().setFromPoints( points );
//	var lineX = new THREE.Line( geometry, material );
//	var lineY = new THREE.Line( geometry, material );
//	var lineZ = new THREE.Line( geometry, material );
//		lineY.rotation.z = Math.PI*0.5;
//		lineZ.rotation.y = 0.5*Math.PI;
//	var AXIS = new THREE.Group();
//		AXIS.add( lineX );
//		AXIS.add( lineY );
//		AXIS.add( lineZ );
//
//	//Piso
//	var planeGeo = new THREE.PlaneGeometry(150,150,4);
// 	var planeMaterial = new THREE.MeshLambertMaterial({color:0xf7f7f7, reflectivity: 0.3 });
// 		planeMaterial.side = THREE.DoubleSide;
//	var piso  = new THREE.Mesh(planeGeo,planeMaterial);
//	piso.receiveShadow = true;
//	piso.rotation.x = -.5*Math.PI;
//
//	//Terrain:
//	var geometryTerrain = new THREE.PlaneGeometry(8, 8, 10, 10);
//	var materialTerrain = new THREE.MeshLambertMaterial({ color: 0xf7d6a1});
//	materialTerrain.side = THREE.DoubleSide;
//        var Terrain = new THREE.Mesh(geometryTerrain, materialTerrain);
//		Terrain.rotation.y=Math.PI;
//		Terrain.rotation.x=-0.5*Math.PI;
//		Terrain.position.y=2.5;
//		Terrain.castShadow=true;
//
//	//CAJA                                                         	
//	var edifGeo = new THREE.BoxGeometry(.5,0.5,.5);        	
// 	var edifMaterial = new THREE.MeshLambertMaterial({ color: 0xf7d6a1 });
//	var edificio = new THREE.Mesh( edifGeo, edifMaterial );
//	edificio.castShadow = true;                            	
//		edificio.position.y=2.0
//	









/*CANVAS AIRE*/
//    var canvasAIRWidth=$("#canvasAIR").innerWidth();
//    var canvasAIRHeight=$("#canvasAIR").innerHeight();
//
//	//RENDERER
//	var rendererAIR = new THREE.WebGLRenderer({canvas:canvasAIR});
//	    rendererAIR.setSize(canvasAIRWidth, canvasAIRHeight);
//	    rendererAIR.setClearColor(0xf7f7f7);
//	    rendererAIR.shadowMap.enabled = true;
//	    rendererAIR.shadowMap.type = THREE.PCFSoftShadowMap;
//
//	//ESCENA:
//   	 var sceneAIR = new THREE.Scene();
//    	sceneAIR.position.x=0;
//	sceneAIR.position.y=1;
//	sceneAIR.position.z=0;
//    	//sceneAIR.add(new THREE.AmbientLight(0xeeeeee));
//
//	//CAMARA
//    	var cameraAIR = new THREE.PerspectiveCamera(45, canvasAIRWidth / canvasAIRHeight, 0.1, 1000);
//    		cameraAIR.position.set(5, 12, 12);
//	
//
//	//CONTROL
//	var controlsAIR = new THREE.OrbitControls( cameraAIR, rendererAIR.domElement );
//
//        //LUZ
//	var lightAIR = new THREE.DirectionalLight( 0xf7f7f7, 1.1 );
//		lightAIR.position.set(cameraAIR.position.x-2,cameraAIR.position.y+3,cameraAIR.position.z+1);//default; light shining from top
//		lightAIR.castShadow = true;            // default false
//		//SetAIRp shadow properties for the light
//		lightAIR.shadow.mapSize.width = 25;  // default
//		lightAIR.shadow.mapSize.height = 25; // default
//		lightAIR.shadow.camera.near = 1;    // default
//		lightAIR.shadow.camera.far = 50;     // default
//
//	//AGREGAR COSAS A LA ESCENA::
//	sceneAIR.add(piso);
//	sceneAIR.add(AXIS);
//        sceneAIR.add(Terrain);
//	sceneAIR.add(lightAIR);
//	
//    	rendererAIR.render(sceneAIR,cameraAIR);
//
//	//function animateAIR() {
//	//   requestAnimationFrame( animateAIR );
//	//     // required if controls.enableDamping or controls.autoRotate are set to true
//	//     controlsAIR.update();
//	//     rendererAIR.render( sceneAIR, cameraAIR );
//	//}
//	//animateAIR();
//
/*CANVAS GW*/
//	var canvasGWWidth=$("#canvasGW").innerWidth();
//	var canvasGWHeight=$("#canvasGW").innerHeight();
//	
// 	// RENDERER
// 	var rendererGW = new THREE.WebGLRenderer({canvas:canvasGW});
// 	//renderer.setSize(window.innerWidth*0.9, window.innerHeight*0.9);
// 		rendererGW.setSize(canvasGWWidth, canvasGWHeight);
// 		rendererGW.setClearColor(0xf7f7f7);
// 		rendererGW.shadowMap.enabled = true;
// 		rendererGW.shadowMap.type = THREE.PCFSoftShadowMap;
//	// ESCENA
//	var sceneGW = new THREE.Scene();
//    		sceneGW.position.x=0;sceneGW.position.y=1;	sceneGW.position.z=0;
//
//	// CAMARA
//        //var camera = new THREE.PerspectiveCamera(25, window.innerWidth/window.innerHeight, .1, 50) //params: zoom, ratioW/H, near, far
//        var cameraGW = new THREE.PerspectiveCamera(50, canvasGWWidth/canvasGWHeight, .1, 500) //params: zoom, ratioW/H, near, far
//        	cameraGW.position.set(3.5,7.1,2.4);
//		cameraGW.lookAt(sceneGW.position);
//	// LUZ
//	//luz ambiente
//	//var light = new THREE.AmbientLight( 0x151515 ); // soft white light
//	//scene.add( light );
//	                                                                                                                          
//	//luz direccionada
//	//var spotLight = new THREE.SpotLight(0xffffff);
//	//spotLight.position.set(camera.position.x+1,camera.position.y+5,camera.position.z+5);
//	//spotLight.castShadow = true;
//	//scene.add(spotLight);
//	                                                                                                                          
//	//DirectionalLight and turn on shadows for the light
//	var lightGW = new THREE.DirectionalLight( 0xf7f7f7, 1.1 );
//	lightGW.position.set(cameraGW.position.x-2,cameraGW.position.y+2,cameraGW.position.z+1);//default; light shining from top
//	lightGW.castShadow = true;            // default false
//	//Set up shadow properties for the light
//	lightGW.shadow.mapSize.width = 25;  // default
//	lightGW.shadow.mapSize.height = 25; // default
//	lightGW.shadow.camera.near = 1;    // default
//	lightGW.shadow.camera.far = 50;     // default
//
//	//CONTROL
//	//var controls = new THREE.OrbitControls( camera, renderer.domElement );
//
//	sceneGW.add(piso );
//        sceneGW.add(AXIS );
//
//	sceneGW.add(edificio );
//	sceneGW.add(lightGW );
//        
//	// Agregar a canvas
//	rendererGW.render(sceneGW,cameraGW);	
//
//	//SETUP ESTÁTICO:
//
//	// Agregar a canvas
//		//function animate() {
//	//   requestAnimationFrame( animate );
//	//     // required if controls.enableDamping or controls.autoRotate are set to true
//	//     controls.update();
//	//     renderer.render( scene, camera );
//    	//}
//	//animate();







window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize(){
    //camera.aspect = window.innerWidth / window.innerHeight;
    //camera.updateProjectionMatrix();
    //renderer.setSize( window.innerWidth*0.5, window.innerHeight*0.5 );
    //rendererAIR.setSize( window.innerWidth*0.5, window.innerHeight*0.5 );

    //var canvasAIRWidth=$("#canvasAIR").innerWidth();
    //var canvasAIRHeight=$("#canvasAIR").innerHeight();
    //rendererAIR.setSize(canvasAIRWidth, canvasAIRHeight);
    //cameraAIR.aspect =canvasAIRWidth / canvasAIRHeight;
    //cameraAIR.updateProjectionMatrix();


    //var canvasGWWidth=$("#canvasGW").innerWidth();
    //var canvasGWHeight=$("#canvasGW").innerHeight();
    //rendererGW.setSize(canvasGWWidth, canvasGWHeight);
    //cameraGW.aspect =canvasGWWidth / canvasGWHeight;
    //cameraGW.updateProjectionMatrix();
}






////QGIS SW:
Q3D.Config.bgColor = '#f7f7f7';
Q3D.Config.localMode = true;
var containerSW = document.getElementById("viewGW");
var appSW = Q3D.application;
appSW.init(containerSW);          // initialize application
appSW.loadSceneFile("./mods3d/sw/scene.js", function () {
});

//QGIS AIR:
Q3D_air.Config.bgColor = '#f7f7f7';
Q3D_air.Config.localMode = true;
var appAIR = Q3D_air.application;
var containerAIR = document.getElementById("viewAIR");
appAIR.init(containerAIR);          // initialize application
appAIR.loadSceneFile("./mods3d/air/scenevflash1.js", function () {
});
