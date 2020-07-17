// Here u can do your maggic ;)
//
//
const $menu=$('.TabletMenu_root');
const $btn_menu=$('#botonMenu');
const $logo=$(".Logo_logo");


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


        $(window).scroll(function() {
            var windscroll = $(window).scrollTop();
            if (windscroll >= 100) {
                $('nav').addClass('fixed');
                $('.wrapper section').each(function(i) {
                    if ($(this).position().top <= windscroll - 20) {
                        $('nav a.active').removeClass('active');
                        $('nav a').eq(i).addClass('active');
                    }
                });

            } else {

                $('nav').removeClass('fixed');
                $('nav a.active').removeClass('active');
                $('nav a:first').addClass('active');
            }

        }).scroll();

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

        //
        //function showObjetivoText(){
        //        // renred-word word_root word_show-now
        //        $( ".renred-word" ).each(function( index ) {
        //                $(this).addClass("word_show-now");
        //        });

        //;}
        //
 	//pos_home = $("section[name=home]").position().top;             
 	//pos_objetivo = $("section[name=objetivo]").position().top;
 	//pos_modelos = $("section[name=modelos]").position().top;
 	////pos_productos = $("section[name=productos]").position().top;
 	//pos_servicios = $("section[name=servicios]").position().top;       
 	//pos_contacto = $("section[name=contacto]").position().top;
 	////pos_office = $("section[name=office]").position().top;

	//$(window).on("scroll", function() {
        //    var position = $(window).scrollTop()
        //    console.log(position);
        //    //     if (position > pos_objetivo  & position < pos_modelos  ) { setWhite(); showObjetivoText();  console.log("Objetivo!!"); }
        //   //if (position > pos_modelos   & position < pos_productos) { setBlack();$(".Modelos").addClass("faded")  ;  console.log("Modelos!!");  }
        //   if (position > pos_productos & position < pos_servicios) { setBlack();$(".Productos").show();  console.log("Productos!!");}
        //   else if (position > pos_servicios & position < pos_contacto ) { setBlack();$(".Servicios").show();  console.log("Servicios!!");}
        //   else if (position > pos_contacto  ) { setBlack();$(".Contacto").show();  console.log("Contacto!!"); }
        //   //else if (position > pos_office ){ setWhite();}
        //   else{setBlack();}
        //});
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


//Para el slider de SERVICIOS
//var slideIndex = 1;
//showSlides(slideIndex);
//
//function plusSlides(n) {
//  showSlides(slideIndex += n);
//}
//
//function currentSlide(n) {
//  showSlides(slideIndex = n);
//}
//
//function showSlides(n) {
//  var i;
//  var slides = document.getElementsByClassName("mySlides");
//  var dots = document.getElementsByClassName("dot");
//  if (n > slides.length) {slideIndex = 1}
//  if (n < 1) {slideIndex = slides.length}
//  for (i = 0; i < slides.length; i++) {
//      slides[i].style.display = "none";
//  }
//  for (i = 0; i < dots.length; i++) {
//      dots[i].className = dots[i].className.replace(" active", "");
//  }
//  slides[slideIndex-1].style.display = "block";
//  dots[slideIndex-1].className += " active";
//}



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
 	console.log(pos);

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
  
});
