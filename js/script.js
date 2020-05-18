// Here u can do your maggic ;)
//
//
const $menu=$('.TabletMenu_root');
const $btn_menu=$('#botonMenu');
const $logo=$(".Logo_logo");

$(document).ready(function(){


        cerrarMenu();

        //ABRIR / CERRAR MENU:
        function abrirMenu(){
                console.log("Abriendo Menu..");
                $menu.addClass("activo");
                $btn_menu.addClass('burguer_activo');
                $btn_menu.removeClass('burger_inactivo');
                $menu.show();
                $("body").addClass("touch-off no-scroll");
                setBlack();
        };

        function cerrarMenu(){
                console.log("Cerrando Menu..");
                $menu.removeClass("activo");
                $btn_menu.addClass('burger_inactivo');
                $btn_menu.removeClass('burguer_activo');
                $menu.slideUp(); // $menu.hide();
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
                scrollPoint = $('div[name="' + scrollAnchor + '"]').offset().top - 0;

            $('body,html').animate({
                scrollTop: scrollPoint
            }, 500);

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
                }, 500);

            cerrarMenu();
            return false;
        })
        //SCROLLEAR HASTA lista de servicios cuando clickias un icono de servicios
        $('.icon').on('click', function() {
            var scrollAnchor = $(this).attr('data-scroll'),
            scrollPoint = $('.icon_wrapper').offset().top - 30;
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
        function showObjetivoText(){
                // renred-word word_root word_show-now
                $( ".renred-word" ).each(function( index ) {
                        $(this).addClass("word_show-now");
                });

        ;}
        
 	pos_home = $("div[name=home]").position().top;             
 	pos_objetivo = $("div[name=objetivo]").position().top;
 	pos_modelos = $("div[name=modelos]").position().top;
 	pos_productos = $("div[name=productos]").position().top;
 	pos_servicios = $("div[name=servicios]").position().top;       
 	pos_contacto = $("div[name=contacto]").position().top;
 	pos_office = $("div[name=office]").position().top;

	$(window).on("scroll", function() {
            var position = $(window).scrollTop()
            console.log(position);
                 if (position > pos_objetivo  & position < pos_modelos  ) { setWhite(); showObjetivoText();  console.log("Objetivo!!"); }
            else if (position > pos_modelos   & position < pos_productos) { setBlack();$(".Modelos").addClass("faded")  ;  console.log("Modelos!!");  }
            else if (position > pos_productos & position < pos_servicios) { setBlack();$(".Productos").addClass("faded");  console.log("Productos!!");}
            else if (position > pos_servicios & position < pos_contacto ) { setBlack();$(".Servicios").addClass("faded");  console.log("Servicios!!");}
            else if (position > pos_contacto  & position < pos_office   ) { setBlack();$(".Contacto").addClass("faded") ;  console.log("Contacto!!"); }
            else if (position > pos_office ){ setWhite();}
            else{setBlack();}
        });

});


//Para el slider de SERVICIOS

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// CANVAS--

Q3D.Config.bgColor = 0x4f4f4f;
Q3D.Config.localMode = true;
Q3D.Config.AR.MND = 0.0;

var container = document.getElementById("view");
app.init(container);          // initialize application
init();                       // initialization for mobile template

app.addEventListener("sceneLoaded", function () {
  initLayerList();
});

// load the scene
app.loadSceneFile("./data/index/scene.js", function () {
  app.start();

  // North arrow inset
  if (Q3D.Config.northArrow.visible) app.buildNorthArrow(document.getElementById("northarrow"), app.scene.userData.rotation);

  if ("AR" in app.urlParams) {
    document.getElementById("ar-checkbox").checked = true;
    startARMode();
    moveToCurrentLocation();
  }
});




// var $form = $('form#test-form'),
//     url = 'https://script.google.com/macros/s/AKfycbxYwrCZzUoD8FhYrQ1KUGdDpicMMCi8CwLwkJAmTqlQ-v41C8Bd/exec'
//
//$('#submit-form').on('click', function(e) {
//    console.log("click")
//    console.log(document.getElementsByTagName("input")[10].value) //manera alternativa de levantar los inputs, los 10 inputs anteriores a estos son los checkbox.
//    console.log(document.getElementsByTagName("input")[11].value)
//    console.log(document.getElementsByTagName("input")[12].value)
//    
//    var x = new XMLHttpRequest();
//    x.open("GET","phpmailer/envio.php",true);
//    x.send();
//    console.log('Enviado');
//    return false;
//
//})
//

//Cosas que pruebo y no funcionan


//     var xhr = new XMLHttpRequest();
//     var url = "https://script.google.com/macros/s/AKfycbxYwrCZzUoD8FhYrQ1KUGdDpicMMCi8CwLwkJAmTqlQ-v41C8Bd/exec" + encodeURIComponent(JSON.stringify({"email": email}));
//     xhr.open("GET", url, true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             var json = JSON.parse(xhr.responseText);
//             console.log(json.email);
//         }
//     };
//     xhr.send();
//     console.log(json)

//     //e.preventDefault();
// //   var jqxhr = $.ajax({
// //      url: 'https://script.google.com/macros/s/AKfycbxYwrCZzUoD8FhYrQ1KUGdDpicMMCi8CwLwkJAmTqlQ-v41C8Bd/exec',
// //      method: "GET",
// //     dataType: "json",
// //     data: $('form#test-form').serializeObject()

//   }).success(
//     console.log("mensaje enviado") // do something
//   )
//   //})
