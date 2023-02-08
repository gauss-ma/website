// Here u can do your maggic ;)
//
//
document.title = "Gauss";

const $menu=$('.Menu_root');
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
                if ( $menu.attr('class') == "Menu_root") {cerrarMenu()}
                else if ( $menu.attr('class') == "Menu_root fade-out") {abrirMenu()}
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
        });
	//SCROLLEAR HASTA ARRIBA CUANDO CLICKEAS EN EL LOGO
	$logo.on('click', function() {
	    $('body,html').animate({
	        scrollTop: 0
	        }, "slow",'swing');
	    cerrarMenu();
	    return false;
	});


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

//Esta era la funcion de visible de jQuery vieja, me estaba dando problemas cuando agregaba al index.html <!DOCTYPE html>.
//(function($) {
//  $.fn.visible = function(partial) {
//      var $t            = $(this),
//          $w            = $(window),
//          viewTop       = $w.scrollTop(),
//          viewBottom    = viewTop + $w.height()/10.,
//          _top          = $t.offset().top,
//          _bottom       = _top + $t.height(),
//          compareTop    = partial === true ? _bottom : _top,
//          compareBottom = partial === true ? _top : _bottom;
//    
//    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
//  };
//  
//})(jQuery);
(function($) {

  $.fn.visible = function(partial, hidden) {

    var $t = $(this).eq(0),
      t = $t.get(0),
      $w = $(window),
      viewTop = $w.scrollTop(),
      viewBottom = viewTop + $w.height(),
      _top = $t.offset().top,
      _bottom = _top + $t.height(),
      compareTop = partial === true ? _bottom : _top,
      compareBottom = partial === true ? _top : _bottom,
      clientSize = hidden === true ? t.offsetWidth * t.offsetHeight : true;

    return !!clientSize && ((compareBottom <= viewBottom) && (compareTop >= viewTop));
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
	$("[bg=oscuro]").each(function(){
		var lim_sup = $(this).offset().top - 50;
    		var lim_inf = lim_sup + $(this).height() + 2*50;
		is_bgoscuro=(is_bgoscuro || (pos >= lim_sup && pos <= lim_inf))
	});
	(is_bgoscuro)? (setWhite()):(setBlack());
  
	
	//RENDER MODELOS SOLO CUANDO ESTAN EN EL VIEWPORT:
  if ($("#viewAIR").visible(true)) {
		//camara girando alrededor de la escena (todavia no está bien):
		R1=120;
		R2=80;
		lambda=pos*0.0003;
		phi=2*Math.PI;
		x = R1*Math.cos(lambda)*Math.cos(phi);
		y = R1*Math.sin(lambda)*Math.cos(phi);
		z = R2*Math.cos(phi)*Math.sin(pos*0.0005);
	appAIR.camera.position.x=x;
	appAIR.camera.position.y=z;
	appAIR.camera.position.z=y;
	appAIR.camera.lookAt(appAIR.scene.position);
	appAIR.renderer.render(appAIR.scene,appAIR.camera)
  }	

  if ($("#viewSW").visible(true)) {
		//camara girando alrededor de la escena (todavia no está bien):
		R1=120;
		R2=80;
		lambda=pos*0.0003;
		phi=2*Math.PI;
		x = R1*Math.cos(lambda)*Math.cos(phi);
		y = R1*Math.sin(lambda)*Math.cos(phi);
		z = R2*Math.cos(phi)*Math.sin(pos*0.0005);
	appSW.camera.position.x=x;
	appSW.camera.position.y=z;
	appSW.camera.position.z=y;
	appSW.camera.lookAt(appSW.scene.position);
	appSW.renderer.render(appSW.scene,appSW.camera)
  }



});



 
////QGIS SW:
Q3D.Config.bgColor = '#f7f7f7';
Q3D.Config.localMode = true;
var containerSW = document.getElementById("viewSW");
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
appAIR.loadSceneFile("./mods3d/air/scene.js", function () {
});
 
 
function onWindowResize(){
    //camera.aspect = window.innerWidth / window.innerHeight;
    //camera.updateProjectionMatrix();
    //renderer.setSize( window.innerWidth*0.5, window.innerHeight*0.5 );
    //rendererAIR.setSize( window.innerWidth*0.5, window.innerHeight*0.5 );

    var canvasAIRWidth=$("#viewAIR").innerWidth();
    var canvasAIRHeight=$("#viewAIR").innerHeight();
    //rendererAIR.setSize(canvasAIRWidth, canvasAIRHeight);
    //cameraAIR.aspect =canvasAIRWidth / canvasAIRHeight;
    //cameraAIR.updateProjectionMatrix();
    appAIR.setCanvasSize(canvasAIRWidth, canvasAIRHeight);


    var canvasSWWidth=$("#viewSW").innerWidth();
    var canvasSWHeight=$("#viewSW").innerHeight();
    //rendererGW.setSize(canvasGWWidth, canvasGWHeight);
    //cameraGW.aspect =canvasGWWidth / canvasGWHeight;
    //cameraGW.updateProjectionMatrix();
    appSW.setCanvasSize(canvasSWWidth, canvasSWHeight);

}
onWindowResize();
window.addEventListener('resize', onWindowResize, false );

