//Hace la validacion del usuario y la contraseña
$("#frmLogin").submit(function(e){

    var usuario    = $("#loginUsuario").val();
    var contra     = $("#loginContra").val();

    $.ajax({
        url:"../mLogin/validar_login.php",
        type:"POST",
        dateType:"json",
        data:{usuario,contra},
        success:function(respuesta){
            var dataArray = JSON.parse(respuesta);
             //console.log(respuesta);
            var registros=dataArray.cRegistros;
            var dias=dataArray.dias;
            if (registros !=0 ) {//existe el usuario
                if(dias < 0){//caducidad
                    swal({
                        title: "Mensaje!",
                        text: "A caducado tu suscripción al sistema",
                        type: "error",
                        confirmButtonClass: "btn-dark",
                        confirmButtonText: "Enterado"
                    }, function (isConfirm) {
                        $("#btnIngresar").attr("disabled","disabled");
                        var h_sidebar="#c0392b";
                        var color_base="#e74c3c";
                        var letra_color="#fff";
                        var color_borde="#e74c3c";
                        cssTema(h_sidebar,color_base,letra_color,color_borde);
                        $("#icoLogin").removeClass("fas fa-unlock");
                        $("#icoLogin").addClass("fas fa-lock");
                        $("#frmLogin")[0].reset();
                        $("#loginUsuario").focus();
                    });

                }else{
                    if($('#camcon').prop('checked')){
                        $("#conn").val("");
                        $("#reccn").val("");
                        $('#modalcontra').modal("show");
                        // $('#letter').removeClass('valid').addClass('invalid');
                        // $('#capital').removeClass('valid').addClass('invalid');
                        // $('#number').removeClass('valid').addClass('invalid');
                        $('#length').removeClass('valid').addClass('invalid');
                        // $('#car').removeClass('valid').addClass('invalid');
                        $('#con').removeClass('invalid').addClass('valid');
                    }
                else{
                    $("#contentLogin").hide();
                    $("#contentSistema").show();

                    persona=dataArray.result.persona;
                    idUsuario=dataArray.result.id_usuario;
                    idDato=dataArray.result.id_dato;

                    $("#titular").text(persona);

                    $('#sidebar').toggleClass('active');
                    permisos(dataArray.result.permiso_datos_persona,dataArray.result.permiso_ecivil,dataArray.result.permiso_usuario,dataArray.result.permiso_temas);
                    preloader(1,'Asitencia del personal');
                    actividad  ="Ingreso al sistema";
                    log(actividad,dataArray.result.id_usuario);
                    verAsistencias();
                }
            }
            }else{
                swal({
                    title: "Mensaje!",
                    text: "La contraseña es incorrecta.",
                    type: "error",
                    confirmButtonClass: "btn-dark",
                    confirmButtonText: "Enterado"
                }, function (isConfirm) {
                    $("#btnIngresar").attr("disabled","disabled");
                    var h_sidebar="#c0392b";
                    var color_base="#e74c3c";
                    var letra_color="#fff";
                    var color_borde="#e74c3c";
                    cssTema(h_sidebar,color_base,letra_color,color_borde);
                    $("#icoLogin").removeClass("fas fa-unlock");
                    $("#icoLogin").addClass("fas fa-lock");
                    $("#frmLogin")[0].reset();
                    $("#loginUsuario").focus();
                });

            }

        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
    
    e.preventDefault();
    return false;
});

//permisoa partes del menu
function permisos(datos,ecivil,usuarios,temas){
    if(datos=='si'){
        $("#liDatos").show();
    }else{
        $("#liDatos").hide();
    }

    if(ecivil=='si'){
        $("#liEcivil").show();
    }else{
        $("#liEcivil").hide();
    }

    if(usuarios=='si'){
        $("#liUsuarios").show();
    }else{
        $("#liUsuarios").hide();
    }

    if(temas=='si'){
        $("#liTemas").show();
    }else{
        $("#liTemas").hide();
    }
}

//Revisa si existe el usuario y aplica el tema del mismo
$("#loginUsuario").keyup(function(){
    valor=$(this).val();
    $.ajax({
        url:"../mLogin/rUsuario.php",
        type:"POST",
        dateType:"json",
        data:{valor},
        success:function(respuesta){
            var dataArray = JSON.parse(respuesta);
            //console.log(respuesta);
            var registros=dataArray.cRegistros;
            if (registros !=0 ) {
                //$("#frmLogin").hide();
                idTema=dataArray.result.id_tema;
                aplicarTema(idTema,'login');
                $("#btnIngresar").removeAttr("disabled");
                $("#icoLogin").removeClass("fas fa-lock");
                $("#icoLogin").addClass("fas fa-unlock");
                $("#inicioIdusuario").val(dataArray.result.id_usuario);
                $("#inicioIdDato").val(dataArray.result.id_dato);
                $("#inicioIdTema").val(dataArray.result.id_tema);
                //$("#frmLogin").fadeIn();
            }else{
                //colores default
                $("#icoLogin").removeClass("fas fa-unlock");
                $("#icoLogin").addClass("fas fa-lock");
                $("#btnIngresar").attr("disabled","disabled");
                var h_sidebar="#2f3640";
                var color_base="#353b48";
                var letra_color="#fff";
                var color_borde="#40739e";
                cssTema(h_sidebar,color_base,letra_color,color_borde);
            }

        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
});

function cambiarPass(){
    var usuario    = $("#loginUsuario").val();
    var contra     = $("#loginContra").val();
    var ncontra = $("#conn").val();
    $.ajax({
        url:"../mLogin/cPass.php",
        type:"POST",
        dateType:"html",
        data:{usuario,contra, ncontra},
        success:function(respuesta){
            alertify.success("<i class='fa fa-check fa-lg'></i>",1);
            $("#conn").val("");
            $("#reccn").val("");
            $("#loginUsuario").val("");
            $("#loginContra").val("");
            $('#camcon').click();
            $("#contentLogin").hide();
            $("#contentSistema").show();
            $("#modalcontra").modal("hide");
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

function generarcontra(){
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
                
                document.getElementById("conn").value=password_definitivo;
                document.getElementById("reccn").value="";
                $('#letter').removeClass('invalid').addClass('valid');
                $('#capital').removeClass('invalid').addClass('valid');
                $('#number').removeClass('invalid').addClass('valid');
                $('#length').removeClass('invalid').addClass('valid');
                $('#car').removeClass('invalid').addClass('valid');
                $('#con').removeClass('valid').addClass('invalid');
                $("#reccn").removeAttr('disabled');
                document.getElementById("reccn").focus();

}

$(document).ready(function() {

    var c;
    var o;
    var n;
    var t;
    var r;
    var a;

    $("#conn").keyup(function() {
        var pass = $("#conn").val();
        var vpass = $("#reccn").val();
        // set password variable
        var pswd = $(this).val();
        //validate the length
        if ( pswd.length < 8 ) {
            $('#length').removeClass('valid').addClass('invalid');
            c="";
        } else {
            $('#length').removeClass('invalid').addClass('valid');
            c=1;
        }

        //validate letter
        if ( pswd.match(/[a-z]/) ) {
             $('#letter').removeClass('invalid').addClas('valid');
            o=1;
        } else {
            $('#letter').removeClass('valid').addClass('invalid');
            o="";
        }

        //validate number
        if ( pswd.match(/\d/) ) {
            $('#number').removeClass('invalid').addClass('valid');
            t=1;
        } else {
            $('#number').removeClass('valid').addClass('invalid');
            t="";
        }

        //Validar contraseñas iguales
        if(pass == vpass){
            $('#con').removeClass('invalid').addClass('valid');
            r=0;
        } else {
            $('#con').removeClass('valid').addClass('invalid');
            r="";
        }

            //Validar segundo campo
            if((c+o+t)==3){
                $("#reccn").removeAttr('disabled');

            }else{
                $("#reccn").attr("disabled","disabled");
            }
            //Validar que la contraseña cuente con todos los aspectos
            //antes mencionados
            if((c+o+t+r)==4){                       
                $("#btnguardar").removeAttr('disabled');
             }

            else{
                $("#btnguardar").attr("disabled","disabled");
            }
    })
});

function comparepsw(){
    var pass = $("#conn").val();
    var vpass = $("#reccn").val();
    if(pass == vpass){
        $("#btnguardar").removeAttr('disabled');
        $('#con').removeClass('invalid').addClass('valid');
    }
    else{
        $("#btnguardar").attr("disabled","disabled");
        $('#con').removeClass('valid').addClass('invalid');
    }
}

function mostrarContra(){
    var valorBoton=$("#btnVerContra").val();
    if (valorBoton==0) {
        $("#btnVerContra").val(1);
        $("#icoVerContra").removeClass("far fa-eye-slash");
        $("#icoVerContra").addClass("far fa-eye");
        $("#conn").attr('type', 'text');
        $("#reccn").attr('type', 'text');
    } else {
        $("#btnVerContra").val(0);
        $("#icoVerContra").removeClass("far fa-eye");
        $("#icoVerContra").addClass("far fa-eye-slash");   
        $("#conn").attr('type', 'password');
        $("#reccn").attr('type', 'password');    
    }
}

$("#btnVerContra").click(function(){
    mostrarContra();
});

$("#conn").keyup(function(){
    validarCampos();
});

$("#reccn").keyup(function(){
    validarCampos();
});

//cambiar contraseña desde dentro del sistema
function ModalContraIn() {
    $("#conn").val("");
    $("#reccn").val("");
    $('#modalcontra').modal("show");
}

