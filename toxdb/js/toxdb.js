$(document).ready(function () {

	const $btn_menu = $('#botonMenu');
	const $logo = $(".LogoGauss");
	const $menu = $('.sidebar');

	//MENU DESPLEGABLE:
	//$('.botonMenu').click(function() {
	//            //$('.sidebar').slideToggle("fast");
	//    	$(".sidebar").animate({width:'toggle'},400);
	//});

	//BUSCADOR / FILTRO

	$(".search_input").on("keyup", function () {
		$("body").scrollTop(0);
		$(".search_close").show();

		//filtrar:
		var value = $(this).val().toLowerCase();
		$(".grid-cards li").filter(function () {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});

		//mostrar numero de compuestos
		n = $("li.grid-card").length - $("li.grid-card").filter(":hidden").length;
		$(".counter-show").empty(); $(".counter-show").append(n)
		$(".counter-total").empty(); $(".counter-total").append(linker.length)
	});


	//FUNCIONES DE SCROLL:
	toolbar_y = $(".search_toolbar").position().top;

	$(window).on("scroll", function () {
		var position = $(window).scrollTop();

		console.log(position);


		if (position > toolbar_y) { $(".fixed-button.scroll-up").show(); $(".specimen_page_nav").show(); $(".search_toolbar").addClass("top_fixed-search_toolbar"); }
		else if (position < toolbar_y) { $(".fixed-button.scroll-up").hide(); $(".specimen_page_nav").hide(); $(".search_toolbar").removeClass("top_fixed-search_toolbar"); }
		else { setBlack(); }

		//scroll a secciones de specimen_page
		$(".specimen_data").each(function (i) {
			sec_pos = $(this).position().top
			id = $(this)[0].id
			if (sec_pos < position) {
				$(".specimen_page_nav_li").removeClass("activo")
				$("li[name=" + id + "]").addClass("activo");
			}
		});

	});

	//ARMADO DE CARTAS DE COMPUESTOS:
	var item_content = " ";
	for (i = 0; i < linker.length; i++) {
		try {
			j = SUMMARY_DB.findIndex(x => x.CID === linker[i].CID);
			item_content += `
	        <li class='grid-card' onclick="verCompuesto('`+ i + `')">
	                	<div class='card-header'>
	                	        <h2 class='card-subtitulo'> CAS:`+ linker[i].CAS + `</h2>
	                	        <h1 class='card-titulo'>`+ linker[i].nombre + `</h1>
				</div>
	                        <div class='card-content'>
					<img src="img/img2DHD/`+ linker[i].CID + `.png"></img>
				</div>
	                        <div  class='card-footer'> 
					`+ SUMMARY_DB[j].MolecularFormula + `
	                        	<!--span> `+ SUMMARY_DB[j].CanonicalSMILES + `</span -->
				</div>
	         </li>`;
		} catch (error) { console.error(error); continue; }
	};
	$(".grid-cards").append(item_content);

	//Contador de tarjetitas en grilla
	$(".counter-total").append($(".grid-card").length)
	$(".counter-show").append($(".grid-card").length)

















});


function scrollUp(position) { $('body').animate({ scrollTop: position + 1 }, 500); }


//Vista de tarjetitas en grilla o lista:
function vista(view) {
	if (view == 'lista') {
		$(".grid-cards").removeClass("grid_view");
		$(".grid-cards").addClass("list_view");
		$(".card-content").slideUp();
		$(".card-footer").slideUp();
	}
	else {
		$(".grid-cards").removeClass("list_view");
		$(".grid-cards").addClass("grid_view");
		$(".card-content").slideDown(300);
		$(".card-footer").slideDown(500);


	};
}

//MolView cambiar tipo de visualizacion
function MolViewSet(mode) {
	iframe = `<iframe style="width: 300px; height: 300px;" frameborder="1" src="https://embed.molview.org/v1/?mode=` + mode + `&smiles=` + summary.CanonicalSMILES + `"></iframe>`;
	console.log(iframe);
	$("#MolView").empty();
	$("#MolView").append(iframe);
	$("#MolView-botones button").prop("disabled", false)
	$("#MolView-botones button[name=" + mode + "]").prop("disabled", true)
}



//Mostrar Referencia:
function mostrarReferencia(Ref) {
	cita = Ref.closest('tr').next('tr');
	if (cita.hasClass("active")) { Ref.removeClass("active"); cita.removeClass("active"); }
	else { Ref.addClass("active"); cita.addClass("active"); }

};


function VerMasDescripcion(){
                                                   
const $descr = $('#descripcion');
const $btn_vermasdescr = $('#loadMoredescr');
                                                   
	$descr.removeClass("clamped");
	$descr.addClass("unclamped");
	$btn_vermasdescr.hide();
                                                   
};





//Restart

function restart() {
	$(".specimen_page").empty();
	$(".grid-container").show();
	$(".search_toolbar").show();
	$(".vista_toolbar").show();

}

RefCELL = '<td class="specimen_data_referencia" onclick="mostrarReferencia( $( this ) )"><span></span> <i class="fas fa-book"></i><td>'

//ARMAR ARTICULO DE UN COMPUESTO EN PARTICULAR:
function verCompuesto(index) {
	tox = linker[index];
	//tox=TOXDB[index];
	console.log(tox.CAS);
	console.log(tox.nombre);
	console.log(tox.CID);

	$("body").scrollTop(0);
	$(".search_toolbar").hide();
	$(".vista_toolbar").hide();
	$(".grid-container").hide();

	//Header
	header = `<div class="specimen_header">
                         <h3 class="specimen-header_titulo">`+ tox.nombre + `</h3>
                         <h4 class="specimen-header_subtitulo">CAS: `+ tox.CAS + `</h4>
                       </div>`

	$(".specimen_page").append(header);
	//PubChem Summary:
	try {
		summary = SUMMARY_DB.find(x => x.CID === tox.CID);
		Summary = `
                <section class='specimen_data' id='resumen'><h1> Resumen </h1>
                       <div class='resumen'>
			<table>
                        <tbody>
                        <tr><td> <h3>Nombre IUPAC:         </h3> </td><td><i>`+ summary.IUPACName + `</i></td></tr>
                        <tr><td> <h3>Fórmula Molecular:    </h3> </td><td>`+ summary.MolecularFormula + `</td></tr>
                        <tr><td> <h3>SMILE canónico:       </h3> </td><td>`+ summary.CanonicalSMILES + `</td></tr> 
                        <tr><td> <h3>InChI:                </h3> </td><td>`+ summary.InChI + `</td></tr> 
                        
                        
			 <tr><td> <h3>Estructura:           </h3> </td>
				<td class="imagen">
				<figure><img src='img/img2D/`+ tox.CID + `.png'></img><figcaption>2D<figcaption></figure>
                                <figure><img src='img/img3D/`+ tox.CID + `.png'></img><figcaption>3D</figcaption></figure>
			</td></tr>
			<tr><td> <h3>CID:                  </h3> </td><td>`+ tox.CID + `</td></tr>
			<tr><td> <h3>CAS:                  </h3> </td><td>`+ tox.CAS + `</td></tr>
			<tr><td> <h3>Sinónimos:		   </h3> </td><td>  <div id="sinonimos"><ol></ol></div>   </td></tr>

                        <!--tr><td> <h3>Peso Molecular:       </h3> </td><td>`+ summary.MolecularWeight + `</td></tr>
                        <tr><td> <h3>XLogP:                </h3> </td><td>`+ summary.XLogP + `</td></tr>
                        <tr><td> <h3>Carga Neta            </h3> </td><td>`+ summary.Charge + `</td></tr -->
                        
                        
                        </tbody>
                        </table> 
					</div>
					
					<div id="descripcionwrap">
				<div id="descripcion" class="clamped"> 
				
				</div>
				</div>
			</section>`



		$(".specimen_page").append(Summary);
	} catch (error) { console.error(error) };

	// ESTRUCTURA 3D:
	//- smiles = resolve SMILES string                                                                               
	//- cid = load CID
	//- pdbid = load PDBID
	//- codid = load CIF from COD
	//- mode = balls || stick || vdw || wireframe || line
	//- chainType = ribbon || cylinders || btube || ctrace || bonds (alias of chainBonds=true)
	//- chainBonds = true || false
	//- chainColor = ss || spectrum || chain || residue || polarity || bfactor
	//- bg = black || gray || white
	Estructura = `<section class='specimen_data' id='Estructura'>
			<h1> Estructura </h1>
			<div style="display:flex;flex-direction:row;flex-wrap:wrap;">
				<div id="MolView2D-container">
					<div id="MolView2D-botones">
						<h3 style="position:relative;top:0;left:0;">2D </h3>
					</div>
					<div id="MolView2D">
					<img src='img/img2DHD/`+ tox.CID + `.png' style="width:300px; height:300px;"></img>
					</div>
				</div>
				<div id="MolView-container">
					<div id="MolView-botones">
					<h3>3D </h3>
						<button type="button" name="balls" disabled="" onclick="MolViewSet('balls');">
							<img style="width:30px;30px;" src="img/CACTUS/balls.png"></img>
						</button>
						<button type="button" name="vdw" onclick="MolViewSet('vdw');">
							<img style="width:30px;30px;" src="img/CACTUS/vanderwaals.png"></img>
						</button>
						<button type="button" name="stick" onclick="MolViewSet('stick');">
							<img style="width:30px;30px;" src="img/CACTUS/stick.png"></img>
						</button>
						<button type="button" name="wireframe" onclick="MolViewSet('wireframe');">
							<img style="width:30px;30px;" src="img/CACTUS/wireframe.png"></img>
						</button>
					</div>
					<div id="MolView">
						<iframe style="width: 300px; height: 300px;" frameborder="0" src="https://embed.molview.org/v1/?mode=balls&smiles=`+ summary.CanonicalSMILES + `"></iframe>
							
					</div>
				</div>
			</div>

			</section>
			`
	$(".specimen_page").append(Estructura);



	//EPA DATABASE
	try {
		epa = EPA_DB.find(x => x.CAS === tox.CAS);
		EPAdata = `
			 <section class='specimen_data' id='fisicoquimica'>
				<h1> Físico-Química </h1>
			 	<table><tbody>
			         <tr><td><h3>Constante de Henry (H):</h3></td><td>`+ epa.H + `</td>` + RefCELL + `</tr>
				 <tr class="cita"><td>`+ epa.H_ref + `</td></tr>                                                                   
			         <tr><td><h3>Constante de Henry (HLC)</h3></td><td>`+ epa.HLC + ` atm-m3/mol</td>` + RefCELL + `</tr>
			         <tr class="cita"><td>`+ epa.H_ref + `</td></tr>                                                                   
			         <tr><td><h3>Presión de Vapor</h3></td><td>`+ epa.VP + ` mmHg</td>` + RefCELL + `</tr>
			         <tr class="cita"><td>`+ epa.VP_ref + `</td></tr>                                                                   
			         <tr><td><h3>Diffusividad en agua (D<sub>w</sub>):</h3></td><td>`+ epa.Dw + ` cm2/s</td>` + RefCELL + `</tr>
			         <tr class="cita"><td>`+ epa.D_ref + `</td></tr>                                                                   
			         <tr><td><h3>Diffusividad en aire (D<sub>a</sub>):</h3></td><td>`+ epa.Da + ` cm2/s</td>` + RefCELL + `</tr>
			         <tr class="cita"><td>`+ epa.H_ref + `</td></tr>     
				 <tr><td><h3>Punto de fusión:</h3>			</td><td>`+ epa.MP + ` ºC</td>` + RefCELL + `</tr>                                
				 <tr class="cita"><td>`+ epa.MP_ref + `</td></tr>     
				 <tr><td><h3>Densidad:</h3>				</td><td>`+ epa.rho + ` g/cm3</td>` + RefCELL + `</tr>
				 <tr class="cita"><td>`+ epa.rho_ref + `</td></tr>     
				 <tr><td><h3>Solubilidad en agua (S):</h3>		</td><td>`+ epa.S + ` mg/L</td>` + RefCELL + `</tr>
				 <tr class="cita"><td>`+ epa.S_ref + `</td></tr>     
				 <tr><td><h3>Coef. particion octanol agua (log K<sub>ow</sub>):</h3></td><td>`+ epa.logKoc + ` </td>` + RefCELL + `</tr>
				 <tr class="cita"><td>`+ epa.logKoc_ref + `</td></tr>     
				 <tr><td><h3>Coef. partición carbono orgánico (K<sub>oc</sub>):</h3></td><td>`+ epa.Koc + ` L/kg</td>` + RefCELL + `</tr>
				 <tr class="cita"><td>`+ epa.Koc_ref + `</td></tr>     
				 <tr><td><h3>Coef. de adsorción-desoción (K<sub>d</sub>):</h3></td><td>`+ epa.Kd + ` L/kg</td>` + RefCELL + `</tr>
				 <tr class="cita"><td>`+ epa.Kd + `</td></tr>     
			        </tbody></table> 
			</section>`;
		$(".specimen_page").append(EPAdata);
	} catch (error) { console.error(error); }

	//Chem ID Plus (TOXICO Y FISQUIM.)
	if (epa == null | epa == undefined) {
		try {
			chemidplus = ChemIDPlus.find(x => x.CAS === tox.CAS);
			FisQui = `<section class='specimen_data' id='fisicoquimica'><h1>Físico-Química</h1>
                        	<table>`;
			for (j = 0; j < chemidplus.FisProps.length; j++) {
				FisQui += '<tr><td class="specimen_data_name"><h3>' + chemidplus.FisProps[j].p + '</i></td>';
				FisQui += `<td class="specimen_data_value">` + chemidplus.FisProps[j].d + " " + chemidplus.FisProps[j].u + `</td>
				         `+ RefCELL + `</tr>
					<tr class="cita"><td>  ChemIDPlus/TOXNET database, National Library of Medicine, National Institutesof Health (NIH).</td></tr>`;
			}
			FisQui += `</table></section>`
			$(".specimen_page").append(FisQui);
		} catch (error) { console.error(error); }
	}
	try {
		chemidplus = ChemIDPlus.find(x => x.CAS === tox.CAS);
		Toxico = `<section class='specimen_data' id='toxicologia'>
				<h1>Toxicología</h1>
                        	<table><tbody id="ToxicList">`;
		for (j = 0; j < chemidplus.ToxProps.length; j++) {
			Toxico += '<tr><td><h3>' + chemidplus.ToxProps[j].t + '</h3>en ' + chemidplus.ToxProps[j].o + ' vía ' + chemidplus.ToxProps[j].r + '.</td>';
			Toxico += '<td>' + chemidplus.ToxProps[j].d.r + ' ' + chemidplus.ToxProps[j].d.u + '</td>';
			Toxico += RefCELL + `</tr>
					 <tr class="cita"><td colspan="3">`+ chemidplus.ToxProps[j].j.t + `</td></tr>

				`;
		}
		Toxico += '</table>'
		if (chemidplus.ToxProps.length > 3) {
			Toxico += `
						<!-- div id="showLess">Ver menos</div -->
						<div id="loadMore">Ver más</div>
					`
		}
		Toxico += '</section>'

		$(".specimen_page").append(Toxico);
		//ShowMORE                                                             
		size_li = $("#ToxicList tr").length;
		x = 6;
		$('#ToxicList tr:lt(' + x + ')').show();

		$('#loadMore').click(function () {
			//x= (x+5 <= size_li) ? x+5 : size_li;
			x = size_li;
			$('#ToxicList tr:lt(' + x + ')').show();
			$('#ToxicList tbody .cita').hide();
			$("#loadMore").hide();
		});

		//Showmore.. para texto descr

	} catch (error) { console.error(error); }



	try {
		pubchem = PubChem.find(x => x.CID === tox.CID);

		//ver más descripcion:
		$("#descripcion").append(pubchem.descripcion);
		botonvermas = `
		<div id="loadMoredescr" class="loadmore" onclick="VerMasDescripcion();">Ver más</div>
		`
		$("#descripcionwrap").append(botonvermas)



		// para tener en cuenta
		// https://codepen.io/pbakaus/pen/gOYrwNp

		for (j = 0; j < pubchem.sinonimos.length; j++) {
			$("#sinonimos ol").append("<li>" + pubchem.sinonimos[j] + "</li>");

		}

		//SEGURIDAD QUIMICA:
		ChemSafety = `
				<section class='specimen_data' id='seguridad'> 
					<h1>Pictograma SGA</h1>
						<div id="SeguridadQuimica_figs">`;
		for (j = 0; j < pubchem.GHS.length; j++) {
			ChemSafety += `<figure>
									<img src='img/imgGHS/es/`+ pubchem.GHS[j] + `.svg'></img>
                        	        	        	     	<figcaption>`+ pubchem.GHS[j] + `</figcaption>
								     </figure>`;
		}
		ChemSafety += '</div></section>';

		$(".specimen_page").append(ChemSafety);

		//NFPA
		if (pubchem.NFPA != null & pubchem.NFPA != undefined) {
			NFPA = `<section class='specimen_data' id='NFPA'> 
					<h1>NFPA 704</h1>
                        	        <div id='NFPA_fig'>
					<figure>
						<img src='img/imgNFPA/`+ pubchem.NFPA + `.svg'/>      
                        	        	<figcaption>`+ pubchem.NFPA + `</figcaption>
					</figure> 
                        	        </div>
				      </section>`;

			$(".specimen_page").append(NFPA);
		}

	} catch (error) { console.error(error); }



	//navbar
	navbar = `<nav class="specimen_page_nav">
		        <div class="specimen_page_nav_header"><h3>`+ tox.nombre + `</h3></div>
		        <ul>`
	secciones = $(".specimen_data")
	//secciones_h1=$(".specimen_page h1")
	secciones.each(function (i) {
		sec_pos = $(this).position().top;
		id = $(this)[0].id;
		text = $(this).children("h1")[0].innerHTML;
		//for (j=0;j< secciones.length;j++){
		navbar += '<li class="specimen_page_nav_li" onclick="scrollUp(' + sec_pos + ')" name="' + id + '"><button>' + text + '</button> </li>'
	});
	navbar += `</ul>
			</nav>`
	$(".specimen_page").append(navbar);

};


