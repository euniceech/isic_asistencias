// VARIABLES GLOBALES
var obscuro  = "#343A40";
var rojo     = "#D9304B";

function ocultarSecciones(){
    // ASISTENCIAS
    $("#asistencia").hide();
    $("#asistencia-AS").hide();
    //DATOS PERSONALES
    $("#datosPersona").hide();
    $("#guardar-DP").hide();
    $("#editar-DP").hide();
    $("#Listado-DP").hide();
    //ESTADO CIVIL
    $("#estadoCivil").hide();
    $("#guardar-EC").hide();
    $("#editar-EC").hide();
    $("#Listado-EC").hide();
    //USUARIOS
}

function verAsistencias(){
    ocultarSecciones();
    preloader(1,'Asitencia del personal');
    $("#datosPersona").hide();
    $("#asistencia-AS").fadeIn();
    $("#lblTitular").text("Control de Asistencias");
    $("#badgeInfo").text("Dezliza tú tarjeta");
    var idTema=$("#inicioIdTema").val()
    aplicarTema(idTema,'otro');
}

function verDatosPersonales(){
    ocultarSecciones();
    $("#lblTitular").text("Datos Personales");
    
    $("#editar-DP").hide();
    $("#guardar-DP").hide();
    $("#Listado-DP").fadeIn();
    $("#frmGuardar-DP")[0].reset();
    $("#frmActualizar-DP")[0].reset();
    $("#badgeInfo").text("Lista");

    $("#datosPersona").show();
    llenar_lista_DP();
    var idTema=$("#inicioIdTema").val()
    aplicarTema(idTema,'otro');      
}

function verEstadoCivil(){
    ocultarSecciones();
    $("#lblTitular").text("Estado Civil");
    
    $("#editar-EC").hide();
    $("#guardar-EC").hide();
    $("#Listado-EC").fadeIn();
    $("#frmGuardar-EC")[0].reset();
    $("#frmActualizar-EC")[0].reset();
    $("#badgeInfo").text("Lista");

    $("#estadoCivil").show();
    llenar_lista_EC();
    var idTema=$("#inicioIdTema").val()
    aplicarTema(idTema,'otro');      
}

function verUsuarios(){
    ocultarSecciones();
}



function abrirModalPDF(id,ruta,modulo) {

    $("#txtTitularPDF").text(modulo)

    var link = ruta+"/pdfDatos.php?id="+id ;
    PDFObject.embed(link, "#visualizador");

    $("#modalPDF").modal("show");
}

function aplicarTema(id,validador){
    $.ajax({
        url:"datosTema.php",
        type:"POST",
        dateType:"json",
        data:{id},
        success:function(respuesta){

            var dataArray = JSON.parse(respuesta);

            var h_sidebar=dataArray.result.color_base_fuerte;
            var color_base=dataArray.result.color_base;
            var letra_color=dataArray.result.color_letra;
            var color_borde=dataArray.result.color_borde;
            
            cssTema(h_sidebar,color_base,letra_color,color_borde);

            if (validador!='login'){
                relacionarTema(id);
                var tema=dataArray.result.nombre_tema;
                $("#inicioIdTema").val(dataArray.result.id_tema);
                //alertify.success(actividad,2);

                if(validador=='enlace'){
                    preloader(1,"Cambiando al tema "+tema);
                    actividad  ="Ha cambiado al tema "+tema;
                    var idUser=$("#inicioIdusuario").val();

                    $('#mnuColapsado').click();

                    log(actividad,idUser);
                    $("html, body").animate({ scrollTop: 0 }, 1000); 
                    return false; 
                }
            }

        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function relacionarTema(idTema){
    var idUsuario = $("#inicioIdusuario").val();
    $.ajax({
        url:"relacionarTema.php",
        type:"POST",
        dateType:"json",
        data:{idUsuario,idTema},
        success:function(respuesta){
            
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function preloader(seg,mensaje){
    var s=parseInt(seg)*1000;
    abrirModalCarga(mensaje);
    setTimeout(function() {

        cerrarModalCarga();
    },s);
}

function cssTema(h_sidebar,color_base,letra_color,color_borde){

    var duracion=".5s";

    $(".myJT").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "background-color": color_base,
        color: letra_color,
        "border-bottom":'8px solid' + color_borde,
    });

    $(".hTabla").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "background-color": color_base,
        color: letra_color,
    });

    $("form , .contenedor").css({
        'border-top':'.1em solid'+ color_borde ,
        'border-bottom':'.1em solid'+ color_borde ,
        'border-left':'.1em solid'+ color_borde ,
        'border-right':'.1em solid'+ color_borde ,
    });

    $("#sidebar").css({
        "background": color_base,
        color: letra_color,
        "border-right": "1px solid "+ h_sidebar,
    });  

    $("#sidebar .sidebar-header").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "background": h_sidebar,
    });  

    $("#sidebar ul.components").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "border-bottom": "1px solid "+ h_sidebar,
    });  

    $("#sidebar ul p").css({
        color: letra_color,
    }); 

    $("#sidebar ul li").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "background-color": color_base,
        color: letra_color,
        'border-bottom':"1px solid "+ color_base,
    }); 

    $("#sidebar ul li").mouseout(function(){
        $(this).css("color", letra_color);
        
        }, function(){
        $(this).css("background-color", color_base);
    });

    $("#sidebar ul li").mouseover(function(){
        $(this).css("color", letra_color);
        }, function(){
        $(this).css("background-color", h_sidebar);
    });

    $("#sidebar ul li ul li a").mouseout(function(){
        $(this).css("color", letra_color);
        }, function(){
        $(this).css("background-color", color_base);
    });

    $("#sidebar ul li ul li a").mouseover(function(){
        $(this).css("color", letra_color);
        }, function(){
        $(this).css("background-color", h_sidebar);
    });
  
    $("ul ul a").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        background: color_base,
    }); 

    $("a.article , .activado").css({
        "background-color": h_sidebar,
        color: letra_color,
        'border-bottom':"1px solid "+ color_base,
    }); 

    $("a.article , .activado").mouseover(function(){
        $(this).css("color", "red");
        }, function(){
        $(this).css("background-color", color_borde);
        $(this).css('border-bottom',"1px solid "+ color_base);
    });

    $("a.article , .activado").mouseout(function(){
        $(this).css("color", "red");
        }, function(){
        $(this).css("background-color", h_sidebar);
        $(this).css('border-bottom',"1px solid "+ color_base);
    });

    $(".modal-carga").css({
        "background": color_base,
    });  

    $(".modal-carga-letra").css({
        "color": letra_color,
    });  

    $("#sidebar ul li.active").css({
        "color": letra_color,
        "background": h_sidebar,
    });  

    $(".login_box").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "background": color_base,
    });  

    $("#frmLogin").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "border-color": color_borde,
    });  

    $(".bordeLogin").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "border-color": color_base,
    });  

    $(".tituloLogin").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "color": h_sidebar,
    });  

    $(".badge").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        "color": letra_color,
        "background": h_sidebar,
    });  

    $("#txtMnuOp").css({
        transition : 'background-color'+ duracion +' ease-in-out',
        'background-color': color_base,
        'border-top':"1px solid "+ h_sidebar,
        'border-bottom':"1px solid "+ h_sidebar,
        "color": letra_color,
    }); 

    $("#scroll").css({
        'background-color': color_base
    }); 

    $("#scroll").mouseover(function(){
        $(this).css("background-color", h_sidebar);
        }, function(){
            $(this).css("background-color", h_sidebar);
    });

    $("#scroll").mouseout(function(){
        $(this).css("background-color", color_base);
        }, function(){
            $(this).css("background-color", color_base);
    });


    $("#scroll span").css({
        'border-bottom-color': letra_color
    }); 
}

function salir(){

      swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas Salir del Sistema?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-dark",
        confirmButtonText: "Si deseo salir",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
            closeOnConfirm: false,
            closeOnCancel: true,
            showLoaderOnConfirm: true
        }, function (isConfirm) {
          if (isConfirm) {
          setTimeout(function () {
              swal.close();
              $("#contentSistema").hide();
              $("#contentLogin").fadeIn();
              $("#frmLogin")[0].reset();
              var h_sidebar="#2f3640";
              var color_base="#353b48";
              var letra_color="#fff";
              var color_borde="#40739e";
              cssTema(h_sidebar,color_base,letra_color,color_borde);
              $("#icoLogin").removeClass("fas fa-unlock");
              $("#icoLogin").addClass("fas fa-lock");
              $("#btnIngresar").attr("disabled","disabled");
              $("#loginUsuario").focus();
  
              var idUsuario=$("#inicioIdusuario").val();
              actividad  ="Salio del sistema";
              log(actividad,idUsuario);
          }, 2000);}
          else{
              alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
          }
        });
      
}

$(document).ready(function () {
    
    $('.sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});

function abrirModalCarga(mensaje) {
    $("#modalCarga").modal("show");
    $("#msjCarga").text(mensaje);
}

function cerrarModalCarga(mensaje) {
    $("#modalCarga").modal("hide");
}

//Verifica el tamaño de la pantalla
$(document).ready(function(){
    $(window).resize(function() {
      if ($(this).width() <= 800){
        $(".btnEspacio").addClass("btn-block");
      }else{
        $(".btnEspacio").removeClass("btn-block");
      }
    });
  });

  
function log(actividad,ejecuta){
    $.ajax({
        url:"log.php",
        type:"POST",
        dateType:"html",
        data:{actividad,ejecuta},
        success:function(respuesta){

        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

//solo numeros
function soloNumeros(e){
    if(event.shiftKey)
    {
         event.preventDefault();
    }
 
    if (event.keyCode == 46 || event.keyCode == 9 || event.keyCode == 8 )    {
    }
    else {
         if (event.keyCode < 95) {
           if (event.keyCode < 45 || event.keyCode > 57) {
                 event.preventDefault();
           }
         } 
         else {
               if (event.keyCode < 96 || event.keyCode > 105) {
                   event.preventDefault();
               }
         }
       }
}

function printDiv(nombreDiv) {
	var mode = 'iframe'; //popup
	var close = mode == "popup";
	var options = { mode : mode, popClose : close};
	$('#areaImprimir').printArea( options );
}

function hablar(texto){
    //se requiere conexion a internet
    var textoAtraducir;
    textoAtraducir=texto; 
    responsiveVoice.speak(textoAtraducir,"Spanish Female"); 
    alertify.success("<i class='fa fa-volume-up fa-lg'></i>", 2);
}

function selectTwo(){
    $( ".select2" ).select2({
        theme: "bootstrap4",
        placeholder: 'Seleccione...'
    });
}

$(".menu").click(function(){
    var id= $(this).attr("id");
    $(".menu").removeClass("active activado");
    $("#"+id).addClass("active activado");
})

$('#scroll').click(function(){ 
    $("html, body").animate({ scrollTop: 0 }, 600); 
    return false; 
});

// ------------------------------------------------------------------------- //

function cambiarContra(){
    var usuario    = $("#inicioIdusuario").val();
    // var contra     = $("#loginContra").val();
    var ncontra = $("#ConN").val();
    $.ajax({
        url:"../mInicio/cambiarContra.php",
        type:"POST",
        dateType:"html",
        data:{usuario,ncontra},
        success:function(respuesta){
            alertify.success("<i class='fa fa-check fa-lg'>La contraseña se ha cambiado con exito</i>",2);
            $("#ConN").val("");
            $("#reccn").val("");
            $("#inicioIdusuario").val("");
            $("#contentLogin").hide();
            $("#contentSistema").show();
            $("#modalContraInicio").modal("hide");
            $("#titular").text(persona);
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX");
        },
    });
    $.ajax({
        url:"../mLogin/validar_login.php",
        type:"POST",
        dateType:"json",
        data:{usuario,contra},
        success:function(respuesta){
            var dataArray = JSON.parse(respuesta);
            $("#contentLogin").hide();
            $("#contentSistema").show();
            persona=dataArray.result.persona;
            idUsuario=dataArray.result.id_usuario;
            idDato=dataArray.result.id_dato;
            $("#titular").text(persona);
            $('#sidebar').toggleClass('active');
            permisos(dataArray.result.permiso_datos_persona,dataArray.result.permiso_ecivil,dataArray.result.
            permiso_usuario,dataArray.result.permiso_temas);
            preloader(1,'Asistencia del personal');
            actividad ="Ingreso al sistema";
            log(actividad,dataArray.result.id_usuario);
            verAsistencias();
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX");
        },
    });
    console.log(ncontra);
}

function generarContraseña(){
    var tamanyo_password				=	8;			// definimos el tamaño que tendrá nuestro password
 
			var caracteres_conseguidos			=	0;			// contador de los caracteres que hemos conseguido
			var caracter_temporal				=	'';
			
			var array_caracteres				=	new Array();// array para guardar los caracteres de forma temporal
				
				for(var i = 0; i < tamanyo_password; i++){		// inicializamos el array con el valor null
					array_caracteres[i]	=	null;
				}
 
			var password_definitivo				=	'';
 
			var numero_minimo_letras_minusculas	=	1;			// en ésta y las siguientes variables definimos cuántos 
			var numero_minimo_letras_mayusculas	=	1;			// caracteres de cada tipo queremos en cada 
			var numero_minimo_numeros			=	1;
			var numero_minimo_simbolos			=	1;
 
			var letras_minusculas_conseguidas 	=	0;
			var	letras_mayusculas_conseguidas	=	0;
			var	numeros_conseguidos				=	0;
			var	simbolos_conseguidos			=	0;
 
 
			// función que genera un número aleatorio entre los límites superior e inferior pasados por parámetro
			function genera_aleatorio(i_numero_inferior, i_numero_superior) {
			    var     i_aleatorio  =   Math.floor((Math.random() * (i_numero_superior - i_numero_inferior + 1)) + i_numero_inferior);
			    return  i_aleatorio;
			}
 
 
			// función que genera un tipo de caracter en base al tipo que se le pasa por parámetro (mayúscula, minúscula, número, símbolo o aleatorio)
			function genera_caracter(tipo_de_caracter){
				// hemos creado una lista de caracteres específica, que además no tiene algunos caracteres como la "i" mayúscula ni la "l" minúscula para evitar errores de transcripción
				var lista_de_caracteres	=	'*$+=?@_23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
				var caracter_generado	=	'';
				var valor_inferior		=	0;
				var valor_superior		=	0;
 
				switch (tipo_de_caracter){
					case 'minúscula':
						valor_inferior	=	38;
						valor_superior	=	61;
						break;
					case 'mayúscula':
						valor_inferior	=	14;
						valor_superior	=	37;
						break;
					case 'número':
						valor_inferior	=	6;
						valor_superior	=	13;
						break;
					case 'símbolo':	
						valor_inferior	=	0;
						valor_superior	=	5;
						break;
					case 'aleatorio':
						valor_inferior	=	0;
						valor_superior	=	61;
 
				} // fin del switch
 
				caracter_generado	=	lista_de_caracteres.charAt(genera_aleatorio(valor_inferior, valor_superior));
				return caracter_generado;
			} // fin de la función genera_caracter()
 
 
			// función que guarda en una posición vacía aleatoria el caracter pasado por parámetro
			function guarda_caracter_en_posicion_aleatoria(caracter_pasado_por_parametro){
				var guardado_en_posicion_vacia	=	false;
				var posicion_en_array			=	0;
 
				while(guardado_en_posicion_vacia	!=	true){
					posicion_en_array	=	genera_aleatorio(0, tamanyo_password-1);	// generamos un aleatorio en el rango del tamaño del password
 
					// el array ha sido inicializado con null en sus posiciones. Si es una posición vacía, guardamos el caracter
					if(array_caracteres[posicion_en_array] == null){
						array_caracteres[posicion_en_array]	=	caracter_pasado_por_parametro;
						guardado_en_posicion_vacia			=	true;
					}
				}
            }
            // generamos los distintos tipos de caracteres y los metemos en un password_temporal
				while (letras_minusculas_conseguidas < numero_minimo_letras_minusculas){
					caracter_temporal	=	genera_caracter('minúscula');
					guarda_caracter_en_posicion_aleatoria(caracter_temporal);
					letras_minusculas_conseguidas++;
					caracteres_conseguidos++;
				}
 
				while (letras_mayusculas_conseguidas < numero_minimo_letras_mayusculas){
					caracter_temporal	=	genera_caracter('mayúscula');
					guarda_caracter_en_posicion_aleatoria(caracter_temporal);
					letras_mayusculas_conseguidas++;
					caracteres_conseguidos++;
				}
 
				while (numeros_conseguidos < numero_minimo_numeros){
					caracter_temporal	=	genera_caracter('número');
					guarda_caracter_en_posicion_aleatoria(caracter_temporal);
					numeros_conseguidos++;
					caracteres_conseguidos++;
				}
 
				while (simbolos_conseguidos < numero_minimo_simbolos){
					caracter_temporal	=	genera_caracter('símbolo');
					guarda_caracter_en_posicion_aleatoria(caracter_temporal);
					simbolos_conseguidos++;
					caracteres_conseguidos++;
				}
 
				// si no hemos generado todos los caracteres que necesitamos, de forma aleatoria añadimos los que nos falten
				// hasta llegar al tamaño de password que nos interesa
				while (caracteres_conseguidos < tamanyo_password){
					caracter_temporal	=	genera_caracter('aleatorio');
					guarda_caracter_en_posicion_aleatoria(caracter_temporal);
					caracteres_conseguidos++;
				}
 
				// ahora pasamos el contenido del array a la variable password_definitivo
				for(var i=0; i < array_caracteres.length; i++){
					password_definitivo	=	password_definitivo + array_caracteres[i];
                }
                
                document.getElementById("ConN").value=password_definitivo;
                document.getElementById("RecCN").value=password_definitivo;
                $('#letter').removeClass('invalidIni').addClass('validIni');
                $('#capital').removeClass('invalidIni').addClass('validIni');
                $('#number').removeClass('invalidIni').addClass('validIni');
                $('#length').removeClass('invalidIni').addClass('validIni');
                $('#car').removeClass('invalidIni').addClass('validIni');
                $('#Con').removeClass('validIni').addClass('invalidIni');
                $("#RecCN").removeAttr('disabled');
                document.getElementById("RecCN").focus();

}

$(document).ready(function() {

    var c;
    var o;
    var n;
    var t;
    var r;
    var a;

    $("#ConN").keyup(function() {
        var pass = $("#ConN").val();
        var vpass = $("#RecCN").val();
        // set password variable
        var pswd = $(this).val();
        //validate the length
        if ( pswd.length < 8 ) {
            $('#length').removeClass('validIni').addClass('invalidIni');
            c="";
        } else {
            $('#length').removeClass('invalidIni').addClass('validIni');
            c=1;
        }

        //validate letter
        if ( pswd.match(/[a-z]/) ) {
            $('#letter').removeClass('invalidIni').addClass('validIni');
            o=1;
        } else {
            $('#letter').removeClass('validIni').addClass('invalidIni');
            o="";
        }

        //validate number
        if ( pswd.match(/\d/) ) {
            $('#number').removeClass('invalidIni').addClass('validIni');
            t=1;
        } else {
            $('#number').removeClass('validIni').addClass('invalid');
            t="";
        }

        //Validar contraseñas iguales
        if(pass == vpass){
            $('#ConN').removeClass('invalidIni').addClass('validIni');
            r=1;
        } else {
            $('#ConN').removeClass('validIni').addClass('invalidIni');
            r="";
        }
            //Validar segundo campo
            if((c+o+t)==3){
                $("#RecCN").removeAttr('disabled');
                document.getElementById("RecCN").focus();

            }else{
                $("#RecCN").attr("disabled","disabled");
            }
            //Validar que la contraseña cuente con todos los aspectos
            //antes mencionados
            if((c+o+t+r)==4){
                $("#btnguardarCI").removeAttr('disabled');
            }

            else{
                $("#btnguardarCI").attr("disabled","disabled");
            }
    })
});

function compareContra(){
    var pass = $("#ConN").val();
    var vpass = $("#RecCN").val();
    if(pass == vpass){
        $("#btnguardarCI").removeAttr('disabled');
        $('#ConN').removeClass('invalidIni').addClass('validIni');
    }
    else{
        $("#btnguardarCI").attr("disabled","disabled");
        $('#ConN').removeClass('validIni').addClass('invalidIni');
    }
}

function validarCamposContraseñasI(){
    var tCaracteres;
    cant=$("#ConN").val();
    cant=cant.length;

    vcant=$("#RecCN").val();
    vcant=vcant.length;

    tCaracteres= cant + vcant;

    if (tCaracteres>0) {
        $("#btnVerContraI").removeAttr("disabled");
        if ($("#ConN").val()==$("#RecCN").val()) {
            $("#ConN").css('background', 'rgba(46, 204, 113,0.2)');
            $("#RecCN").css('background', 'rgba(46, 204, 113,0.2)');
        } else {
            $("#ConN").css('background', 'rgba(231, 76, 60,0.2)');
            $("#RecCN").css('background', 'rgba(231, 76, 60,0.2)');
        }
    }else{
        $("#btnVerContraI").attr("disabled","disabled");
        $("#ConN").css('background', 'rgba(0, 0, 0,0)');
        $("#RecCN").css('background', 'rgba(0, 0, 0,0)');
    }
}


function mostrarContraI(){
    var valorBoton=$("#btnVerContraI").val();
    if (valorBoton==0) {
        $("#btnVerContraI").val(1);
        $("#icoVerContraI").removeClass("far fa-eye-slash");
        $("#icoVerContraI").addClass("far fa-eye");
        $("#ConN").attr('type', 'text');
        $("#RecCN").attr('type', 'text');
    } else {
        $("#btnVerContraI").val(0);
        $("#icoVerContraI").removeClass("far fa-eye");
        $("#icoVerContraI").addClass("far fa-eye-slash");   
        $("#ConN").attr('type', 'password');
        $("#RecCN").attr('type', 'password');    
    }
}

$("#btnVerContraI").click(function(){
    mostrarContraI();
});

$("#ConN").keyup(function(){
    validarCamposContraseñasI();
});

$("#RecCN").keyup(function(){
    validarCamposContraseñasI();
});
