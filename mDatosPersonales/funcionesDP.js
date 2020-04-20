//VARIABLE GLOBAL PARA NOMBRAR LOS ELEMENTOS DE LOS  FORMULARIOS
//DATOS PERSONALES -DP 
var nombreModulo_DP="Datos Personales";

$("#frmGuardar-DP").submit(function(e){

    var clave     = $("#clave").val();
    var nombre    = $("#nombre").val();
    var apPaterno = $("#apPaterno").val();
    var apMaterno = $("#apMaterno").val();
    var fNac      = $("#fNac").val();
    var correo    = $("#correo").val();
    var curp      = $("#curp").val();
    var domicilio = $("#domicilio").val();
    var sexo      = $("#sexo").val();
    var ecivil    = $("#ecivil").val();

    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas Guardar la información?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-primary",
        confirmButtonText: "Si deseo guardarla",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
        closeOnConfirm: false,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {
            swal.close();
            $.ajax({
                url:"../mDatosPersonales/guardar.php",
                type:"POST",
                dateType:"html",
                data:{clave,nombre,apPaterno,apMaterno,fNac,correo,curp,domicilio,sexo,ecivil},
                success:function(respuesta){
                    
                    $("#guardar-DP").hide();
                    llenar_lista_DP();
                    $("#frmGuardar-DP")[0].reset();
                    selectTwo();
                    alertify.success("<i class='fa fa-save fa-lg'></i>", 2);
                    $('#nombre').focus();
                    actividad  ="Se insertado un nuevo registro a la tabla "+nombreModulo_DP;
                    var idUser=$("#inicioIdusuario").val();
                    log(actividad,idUser);
        
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX"); 
                },
            });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });

    e.preventDefault();
    return false;
});

$("#frmActualizar-DP").submit(function(e){

    var id        = $("#eId").val();
    var nombre    = $("#eNombre").val();
    var apPaterno = $("#eApPaterno").val();
    var apMaterno = $("#eApMaterno").val();
    var fNac      = $("#eFnac").val();
    var correo    = $("#eCorreo").val();
    var curp      = $("#eCurp").val();
    var clave     = $("#eClave").val();
    var domicilio = $("#eDomicilio").val();
    var sexo      = $("#eSexo").val();
    var ecivil    = $("#eEcivil").val();

    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas Actualizar la información?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-success",
        confirmButtonText: "Si deseo actualizarla",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
        closeOnConfirm: false,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {
            swal.close();
            $.ajax({
                url:"../mDatosPersonales/actualizar.php",
                type:"POST",
                dateType:"html",
                data:{clave,id,nombre,apPaterno,apMaterno,fNac,correo,curp,clave,domicilio,sexo,ecivil},
                success:function(respuesta){
                    //console.log(respuesta);
                    llenar_lista_DP();
                        $("#frmGuardar-DP")[0].reset();
                        $("#frmActualizar-DP")[0].reset();
                        alertify.success("<i class='fa fa-bolt fa-lg'></i>", 2);
                    $("#btnCancelarG-DP , #btnCancelarA-DP").click();
                    actividad  ="Se ha modificado un registro de la tabla tabla "+nombreModulo_DP;
                    var idUser=$("#inicioIdusuario").val();
                    log(actividad,idUser);
                    
                    $('#nombre').focus();
                },
                error:function(xhr,status){
                    alert("Error en metodo AJAX"); 
                },
            });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });

    e.preventDefault();
    return false;
});

function llenar_lista_DP(){
    abrirModalCarga('Cargando Lista');
    $("#frmGuardar-DP")[0].reset();
    $("#Listado-DP").hide();
    $.ajax({
        url:"../mDatosPersonales/lista.php",
        type:"POST",
        dateType:"html",
        data:{},
        success:function(respuesta){
            $("#Listado-DP").html(respuesta);
            $("#Listado-DP").fadeIn("slow");
            cerrarModalCarga();      
            $("#nombre").focus();
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function edad(fecha){
    $.ajax({
        url:"../mDatosPersonales/calcularEdad.php",
        type:"POST",
        dateType:"html",
        data:{fecha},
        success:function(respuesta){

            $("#edad").val(respuesta);
            $("#eEdad").val(respuesta);

            xedad= parseInt(respuesta);
            if (xedad < 0) {
                
                $("#edad, #eEdad , #fNac , #efNac").css("color", rojo);
            } else {
                
                $("#edad, #eEdad , #fNac , #efNac").css("color", obscuro);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

function llenar_formulario_DP(id,nombre,apPaterno,apMaterno,fNac,edad,correo,curp,clave,domicilio,sexo,ecivil){
   
    $("#eId").val(id);
    $("#eClave").val(clave);
    $("#eNombre").val(nombre);
    $("#eApPaterno").val(apPaterno);
    $("#eApMaterno").val(apMaterno);
    $("#eFnac").val(fNac);
    $("#eEdad").val(edad);
    $("#eCorreo").val(correo);
    $("#eCurp").val(curp);
    $("#eClave").val(clave);
    $("#eDomicilio").val(domicilio);
    $("#eSexo").val(sexo);
    $("#eEcivil").val(ecivil);

    selectTwo();

    $("#lblTitular").text(nombreModulo_DP);
    $("#badgeInfo").text("Modificar datos");

    $("#guardar-DP").hide();
    $("#Listado-DP").hide();
    $("#editar-DP").fadeIn();
    $("#eNombre").focus();
}

function cambiar_estatus_DP(id,consecutivo){

    var valor=$("#check"+consecutivo).val();
    var contravalor=(valor==1)?0:1;
    $("#check"+consecutivo).val(contravalor);

    $.ajax({
        url:"../mDatosPersonales/cEstatus.php",
        type:"POST",
        dateType:"html",
        data:{id,contravalor},
        success:function(respuesta){
            // console.log(respuesta);
            if(contravalor==1){
                alertify.success("<i class='fa fa-check fa-lg'></i>", 2);
                $("#btnEditar-DP"+consecutivo).removeAttr('disabled');
                $("#btnImprimir-DP"+consecutivo).removeAttr('disabled');
                $("#btnModal-DP"+consecutivo).removeAttr('disabled');
                $("#btnFoto-DP"+consecutivo).removeAttr('disabled');
                $("#btnSonido-DP"+consecutivo).removeAttr('disabled');
                $("#icoSound-DP"+consecutivo).removeClass("fa fa-volume-mute fa-lg");
                $("#icoSound-DP"+consecutivo).addClass("fa fa-volume-up fa-lg");
                actividad  ="Se ha reactivado un registro de la tabla tabla "+nombreModulo_DP;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }else{
                alertify.error("<i class='fa fa-times fa-lg'></i>", 2);
                $("#btnEditar-DP"+consecutivo).attr('disabled','disabled');
                $("#btnImprimir-DP"+consecutivo).attr('disabled','disabled');
                $("#btnModal-DP"+consecutivo).attr('disabled','disabled');
                $("#btnFoto-DP"+consecutivo).attr('disabled','disabled');
                $("#btnSonido-DP"+consecutivo).attr('disabled','disabled');
                $("#icoSound-DP"+consecutivo).removeClass("fa fa-volume-up fa-lg");
                $("#icoSound-DP"+consecutivo).addClass("fa fa-volume-mute fa-lg");
                actividad  ="Se ha desactivado un registro de la tabla tabla "+nombreModulo_DP;
                var idUser=$("#inicioIdusuario").val();
                log(actividad,idUser);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });

}

function abrirModalDatos_DP(id,nombre,apPaterno,apMaterno,fNac,edad,correo,curp,clave,domicilio,sexo,ecivil) {
    $("#modalTitle-DP").text("Datos personales - "+nombre+' '+apPaterno);

    $("#mNombre").val(nombre);
    $("#mApPaterno").val(apPaterno);
    $("#mApMaterno").val(apMaterno);
    $("#mFnac").val(fNac);
    $("#mEdad").val(edad);
    $("#mCorreo").val(correo);
    $("#mCurp").val(curp);
    $("#mClave").val(clave);
    $("#mDomicilio").val(domicilio);
    $("#mSexo").val(sexo);
    $("#mEcivil").val(ecivil);

    selectTwo();

    $("#modalDatos-DP").modal("show");
}

//Manipulacion de eventos con jquery
$("#fNac").change(function(){
    var fecha = $(this).val();
    edad(fecha);
    ;
});

$("#efNac").change(function(){
    var fecha = $(this).val();
    edad(fecha);

});

$("#btnCancelarG-DP , #btnCancelarA-DP").click(function(){
    $("#editar-DP").hide();
    $("#guardar-DP").hide();

    $("#lblTitular").text(nombreModulo_DP);
    $("#badgeInfo").text("Lista");

    $("#Listado-DP").fadeIn();
 
});


$("#clave").keydown(function() {
    var valor=$(this).val();
    soloNumeros(valor);
});

$("#curp , #eCurp").keyup(function() {

    valor=$(this);
    // Convierte en mayuscula
    valor.val(valor.val().toUpperCase());
    
    //validar curp + expresion regular
    if (curpValida(valor.val())=="Si") {
        //$("#btnGuardar-DP").removeAttr('disabled');
        $(valor).css("color", obscuro);
        alertify.success("Curp valida !",1);
    }else{
        //$("#btnGuardar-DP").attr('disabled','disabled');
        $(valor).css("color", rojo);
    }

});

$("#clave").keyup(function(){
    var valor=$(this).val();
    revisar_clave(valor);
});

//Manipulacion de eventos con jquery

//Revisar clave repetida
function revisar_clave(valor){
    $.ajax({
        url:"../mDatosPersonales/rClave.php",
        type:"POST",
        dateType:"html",
        data:{valor},
        success:function(respuesta){
            res =parseInt(respuesta);
            if (res == 0) {
                $("#clave").css("color", obscuro);
            }else{
                $("#clave").css("color", rojo);
            }
        },
        error:function(xhr,status){
            alert("Error en metodo AJAX"); 
        },
    });
}

//validar curp
function curpValida(valor) {

    var validador;
    var curp=valor;

    // Expresion regular para curp
    var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validado = curp.match(re);
    
    if (!validado){  //Coincide con el formato general?
        validador = "No";
    }else{
        validador = "Si";
    }
    return validador;
}

//llenar combo
function combo_ecivil()
{
    $.ajax({
        url : '../mDatosPersonales/comboEcivil.php',
        data : {},
        type : 'POST',
        dataType : 'html',
        success : function(respuesta) {
            
            $("#ecivil , #eEcivil , #mEcivil , #eDesc").empty();
            $("#ecivil , #eEcivil , #mEcivil , #eDesc").html(respuesta);    
            selectTwo();
        },
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    });
}

function nuevo_registro_DP(){
    $("#lblTitular").text(nombreModulo_DP);
    $("#badgeInfo").text("Nuevo registro");

    $("#Listado-DP").hide();
    $("#guardar-DP").fadeIn();
    $('#frmGuardar-DP')[0].reset();
    $("#clave").focus();
    
}

function abrirModalFoto(id,clave,nombre,valorfoto) {

    $("#clavePersona").val(clave);
    $("#txtTitularFoto").text(nombre);

    if (valorfoto=="No") {
        $('#formVista').hide();
        $('#formSubida').fadeIn();
        $('#formSubida')[0].reset();
    }else{
        $('#formSubida').hide();
        $('#formVista').fadeIn();
        var archivo='../fotos/'+clave+".jpg";
        $("#imgFoto").attr("src",archivo);
    }
    
    $("#modalFoto").modal("show");

}

function  eliminarFoto(){

    var formData = new FormData();
    var clave=$('#clavePersona').val();
    formData.append('clave',clave);

    swal({
        title: "¿Estas Seguro?",
        text: "¿Deseas eliminar la foto?",
        type: "info",
        showCancelButton: true,
        confirmButtonClass: "btn-dark",
        confirmButtonText: "Si deseo eliminarla",
        cancelButtonText: "Cancelar Acción",
        cancelButtonClass: "btn-outline-danger",
        closeOnConfirm: false,
        closeOnCancel: true,
        showLoaderOnConfirm: true
      }, function (isConfirm) {
        if (isConfirm) {
        setTimeout(function () {
            swal.close();
            $.ajax({
                url: '../mDatosPersonales/fotoBorrar.php',
                type: 'post',
                data: formData,
                contentType: false,
                processData: false,
                success: function(response) {
                  var res=parseInt(response);
                  switch(res){
                    case 0 :
                        alertify.error("<i class='fa fa-times fa-lg'></i> No se encuentra el archivo",1);
                        $("#modalFoto").modal("hide");
                        llenar_lista_DP();
                      break;
                    case 1 :
                        alertify.warning("<i class='fa fa-check fa-lg'></i> Foto Eliminada",1);
                        $("#modalFoto").modal("hide");
                        llenar_lista_DP();
                        break;
                  }
        
                },
                error:function(xhr,status){
                    alertify.error('Error en proceso');
                },
            });
        }, 2000);}
        else{
            alertify.error(" <i class='fa fa-times fa-lg'></i> Cancelado",2);
        }
      });

}

function subirFoto(){
    var formData = new FormData();

    var files = $('#image')[0].files[0];

    var clave=$('#clavePersona').val();
    var tam=$('#tamanoKB').val();

    formData.append('file',files);
    formData.append('clave',clave);
    formData.append('tam',tam);

    $.ajax({
        url: '../mDatosPersonales/fotoSubir.php',
        type: 'post',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
          var res=parseInt(response);
          switch(res){
            case 0 :
                alertify.success("<i class='fas fa-file-upload'></i>",1);
                $("#modalFoto").modal("hide");
                llenar_lista_DP();
              break;
            case 1 :

                swal({
                    title: "Error!",
                    text: "No ha sido posible cargar el archivo debido a que este debe de tener extención jpg y no debe de sobrepasar los 3 megabytes",
                    type: "error",
                    confirmButtonClass: "btn-dark",
                    confirmButtonText: "Enterado"
                }, function (isConfirm) {
                    alertify.message("Gracias !");
                });
              break;
            default:
                  alertify.error("<i class='fa fa-times fa-lg'></i>",1);
          }

        },
        error:function(xhr,status){
            alertify.error('Error en proceso');
        },
    });
// return false;
}
// --------------------------------------------Modal Horario-------------------------------------- //
function abrirModalHorario(id, nombre, turno, L_entrada, L_salida, Mar_entrada, Mar_salida, Mier_entrada, Mier_salida, J_entrada, J_salida, V_entrada, V_salida, S_entrada, S_salida, D_entrada, D_salida, Tiene_Horario) {
    $("#modalTitle-Horario").text("Horario - "+nombre);

    $("#id_persona").val(id);
    $("#Nombre_Persona").val(nombre);
    $("#Tiene_Horario").val(Tiene_Horario);


    if (Tiene_Horario == 'Si') {
        var l_entradaSP = L_entrada.split(":");
        var l_entradaC = l_entradaSP[0] + ':' + l_entradaSP[1];
        var l_salidaSP = L_salida.split(":");
        var l_salidaC = l_salidaSP[0] + ':' + l_salidaSP[1];
        
        var m_entradaSP = Mar_entrada.split(":");
        var m_entradaC = m_entradaSP[0] + ':' + m_entradaSP[1];
        var m_salidaSP = Mar_salida.split(":");
        var m_salidaC = m_salidaSP[0] + ':' + m_salidaSP[1];
        
        var mi_entradaSP = Mier_entrada.split(":");
        var mi_entradaC = mi_entradaSP[0] + ':' +mi_entradaSP[1];
        var mi_salidaSP = Mier_salida.split(":");
        var mi_salidaC = mi_salidaSP[0] + ':' + mi_salidaSP[1];
        
        var j_entradaSP = J_entrada.split(":");
        var j_entradaC = j_entradaSP[0] + ':' +j_entradaSP[1];
        var j_salidaSP = J_salida.split(":");
        var j_salidaC = j_salidaSP[0] + ':' + j_salidaSP[1];
        
        var v_entradaSP = V_entrada.split(":");
        var v_entradaC = v_entradaSP[0] + ':' +v_entradaSP[1];
        var v_salidaSP = V_salida.split(":");
        var v_salidaC = v_salidaSP[0] + ':' + v_salidaSP[1];
        
        var s_entradaSP = S_entrada.split(":");
        var s_entradaC = s_entradaSP[0] + ':' +s_entradaSP[1];
        var s_salidaSP = S_salida.split(":");
        var s_salidaC = s_salidaSP[0] + ':' + s_salidaSP[1];
        
        var d_entradaSP = D_entrada.split(":");
        var d_entradaC = d_entradaSP[0] + ':' +d_entradaSP[1];
        var d_salidaSP = D_salida.split(":");
        var d_salidaC = d_salidaSP[0] + ':' +d_salidaSP[1];

        $("#L_entrada").val(l_entradaC);
        $("#L_salida").val(l_salidaC);

        $("#Mar_entrada").val(m_entradaC);
        $("#Mar_salida").val(m_salidaC);

        $("#Mier_entrada").val(mi_entradaC);
        $("#Mier_salida").val(mi_salidaC);

        $("#J_entrada").val(j_entradaC);
        $("#J_salida").val(j_salidaC);

        $("#V_entrada").val(v_entradaC);
        $("#V_salida").val(v_salidaC);

        $("#S_entrada").val(s_entradaC);
        $("#S_salida").val(s_salidaC);

        $("#D_entrada").val(d_entradaC);
        $("#D_salida").val(d_salidaC);

        if (turno == "Especial") {
            $("#Turno option[value=" + turno + "]").attr("selected", true);
            $("#Turno").val("Especial");
            $("#L_entrada, #L_salida, #Mar_entrada, #Mar_salida, #Mier_entrada, #Mier_salida, #J_entrada, #J_salida, #V_entrada, #V_salida, #S_entrada, #S_salida, #D_entrada, #D_salida").val('');
            suma_de_horas();
        }else{
            if (turno == "Matutino") {
                $("#Turno option[value='Matutino']").attr("selected", true);
                $("#Turno").val("Matutino");
                suma_de_horas();
            }else{
                if (turno == "Vespertino") {
                    $("#Turno option[value='Vespertino']").attr("selected", true);
                    $("#Turno").val("Vespertino");
                    suma_de_horas();
                }else{
                    if (turno == "Nocturno") {
                        $("#Turno option[value='Nocturno']").attr("selected", true);
                        $("#Turno").val("Nocturno");
                        $("#HorasTrabajadas").val("30");
                    }
                }
            }
        }
    }else{
        $("#Turno option[value='Especial']").attr("selected", true);
        $("#Turno").val("Especial");
        $("#L_entrada, #L_salida, #Mar_entrada, #Mar_salida, #Mier_entrada, #Mier_salida, #J_entrada, #J_salida, #V_entrada, #V_salida, #S_entrada, #S_salida, #D_entrada, #D_salida").val('');
        suma_de_horas();
    }
    selectTwo();
    $("#modalHorario-DP").modal("show");
}
// --------------------------------------------Modal Horario-------------------------------------- //
// Funcion para el cambio de valores de los inputs dependiendo del turno seleccionado
$("#Turno").change(function(){
    var valorCombo = $(this).val();

    if (valorCombo == 'Matutino') {
        $("#L_entrada,#Mar_entrada,#Mier_entrada,#J_entrada,#V_entrada").val("06:00:00");
        $("#L_salida,#Mar_salida,#Mier_salida,#J_salida,#V_salida").val("12:00:00");
        $("#S_entrada,#D_entrada,#S_salida,#D_salida").val("--:--:--");
        $("#HorasTrabajadas").val("30");
        $("#btnGuardarHorario").removeAttr('disabled');
        $("#L_entrada,#L_salida,#Mar_entrada,#Mar_salida,#Mier_entrada,#Mier_salida,#J_entrada,#J_salida,#V_entrada,#V_salida,#S_entrada,#S_salida,#D_entrada,#D_salida").attr('disabled','disabled');
        suma_de_horas();
    }else{
      if (valorCombo == 'Vespertino') {
            $("#L_entrada,#Mar_entrada,#Mier_entrada,#J_entrada,#V_entrada").val("12:00:00");
            $("#L_salida,#Mar_salida,#Mier_salida,#J_salida,#V_salida").val("18:00:00");
            $("#S_entrada,#D_entrada,#S_salida,#D_salida").val("--:--:--");
            $("#HorasTrabajadas").val("30");
            $("#btnGuardarHorario").removeAttr('disabled');
            $("#L_entrada,#L_salida,#Mar_entrada,#Mar_salida,#Mier_entrada,#Mier_salida,#J_entrada,#J_salida,#V_entrada,#V_salida,#S_entrada,#S_salida,#D_entrada,#D_salida").attr('disabled','disabled');
            suma_de_horas();
      }else{
          if(valorCombo == 'Nocturno'){
                $("#L_entrada,#Mar_entrada,#Mier_entrada,#J_entrada,#V_entrada").val("18:00:00");
                $("#L_salida,#Mar_salida,#Mier_salida,#J_salida,#V_salida").val("00:00:00");
                $("#S_entrada,#D_entrada,#S_salida,#D_salida").val("--:--:--");
                $("#HorasTrabajadas").val("30");
                $("#btnGuardarHorario").removeAttr('disabled');
                $("#L_entrada,#L_salida,#Mar_entrada,#Mar_salida,#Mier_entrada,#Mier_salida,#J_entrada,#J_salida,#V_entrada,#V_salida,#S_entrada,#S_salida,#D_entrada,#D_salida").attr('disabled','disabled');
          }else{
              if (valorCombo == 'Especial') {
                    $("#L_entrada,#Mar_entrada,#Mier_entrada,#J_entrada,#V_entrada").val("00:00:00");
                    $("#L_salida,#Mar_salida,#Mier_salida,#J_salida,#V_salida").val("00:00:00");
                    $("#S_entrada,#D_entrada,#S_salida,#D_salida").val("00:00:00");
                    $("#HorasTrabajadas").val("0");
                    $("#btnGuardarHorario").attr('disabled','disabled');
                    $("#L_entrada,#L_salida,#Mar_entrada,#Mar_salida,#Mier_entrada,#Mier_salida,#J_entrada,#J_salida,#V_entrada,#V_salida,#S_entrada,#S_salida,#D_entrada,#D_salida").removeAttr('disabled');
                    suma_de_horas();
              }
          }
      }  
    }
});
function suma_de_horas() {
    var lunes_e = $("#L_entrada").val();
    var lunes_s = $("#L_salida").val();

    var martes_e = $("#Mar_entrada").val();
    var martes_s = $("#Mar_salida").val();

    var miercoles_e = $("#Mier_entrada").val();
    var miercoles_s = $("#Mier_salida").val();

    var jueves_e = $("#J_entrada").val();
    var jueves_s = $("#J_salida").val();

    var viernes_e = $("#V_entrada").val();
    var viernes_s = $("#V_salida").val();

    var sabado_e = $("#S_entrada").val();
    var sabado_s = $("#S_salida").val();

    var domingo_e = $("#D_entrada").val();
    var domingo_s = $("#D_salida").val();
    
    var m_lunes_e = moment.duration(lunes_e);
    var m_lunes_s = moment.duration(lunes_s);

    var m_martes_e = moment.duration(martes_e);
    var m_martes_s = moment.duration(martes_s);

    var m_miercoles_e = moment.duration(miercoles_e);
    var m_miercoles_s = moment.duration(miercoles_s);

    var m_jueves_e = moment.duration(jueves_e);
    var m_jueves_s = moment.duration(jueves_s);

    var m_viernes_e = moment.duration(viernes_e);
    var m_viernes_s = moment.duration(viernes_s);

    var m_sabado_e = moment.duration(sabado_e);
    var m_sabado_s = moment.duration(sabado_s);

    var m_domingo_e = moment.duration(domingo_e);
    var m_domingo_s = moment.duration(domingo_s);

    var r_lunes = m_lunes_s.subtract(m_lunes_e);
    console.log(r_lunes);    
    var r_martes = m_martes_s.subtract(m_martes_e);
    console.log(r_martes);
    var r_miercoles = m_miercoles_s.subtract(m_miercoles_e);
    console.log(r_miercoles);
    var r_jueves = m_jueves_s.subtract(m_jueves_e);
    console.log(r_jueves);
    var r_viernes = m_viernes_s.subtract(m_viernes_e);
    console.log(r_viernes);
    var r_sabado = m_sabado_s.subtract(m_sabado_e);
    console.log(r_sabado);
    var r_domingo = m_domingo_s.subtract(m_domingo_e);
    console.log(r_domingo);

    var hrs_lunes = r_lunes._data.hours;
    var hrs_martes = r_martes._data.hours;
    var hrs_miercoles = r_miercoles._data.hours;
    var hrs_jueves = r_jueves._data.hours;
    var hrs_viernes = r_viernes._data.hours;
    var hrs_sabado = r_sabado._data.hours;
    var hrs_domingo = r_domingo._data.hours;

    var min_lunes = r_lunes._data.minutes;
    var min_martes = r_martes._data.minutes;
    var min_miercoles = r_miercoles._data.minutes;
    var min_jueves = r_jueves._data.minutes;
    var min_viernes = r_viernes._data.minutes;
    var min_sabado = r_sabado._data.minutes;
    var min_domingo = r_domingo._data.minutes;

    var sumaHoras = parseInt(hrs_lunes) + parseInt(hrs_martes) + parseInt(hrs_miercoles) + parseInt(hrs_jueves) + parseInt(hrs_viernes) + parseInt(hrs_sabado) + parseInt(hrs_domingo);
    var sumaMinutos = parseInt(min_lunes) + parseInt(min_martes) + parseInt(min_miercoles) + parseInt(min_jueves) + parseInt(min_viernes) + parseInt(min_sabado) + parseInt(min_domingo);

    if (sumaMinutos >= 60 && sumaMinutos <= 119) { 
        sumaHoras = sumaHoras + 1;
    } else {
        if (sumaMinutos >= 120 && sumaMinutos <= 179) {
            sumaHoras = sumaHoras + 2;
        } else {
            if (sumaMinutos >= 180 && sumaMinutos <= 239) {
                sumaHoras = sumaHoras + 3;
            } else {
                if (sumaMinutos >= 240 && sumaMinutos <= 299) {
                    sumaHoras = sumaHoras + 4;
                } else {
                    if (sumaMinutos >= 300 && sumaMinutos <= 359) {
                        sumaHoras = sumaHoras + 5;
                    } else {
                        if (sumaMinutos >= 360 && sumaMinutos <= 419) {
                            sumaHoras = sumaHoras + 6;
                        } else {
                            if (sumaMinutos >= 420 && sumaMinutos <= 479) {
                                sumaHoras = sumaHoras + 7;
                            }
                        }
                    }
                }
            }
        }
    }
    console.log(sumaHoras);

    $("#HorasTrabajadas").val(sumaHoras);
    if (sumaHoras >= 30) {
        $("#btnGuardarHorario").removeAttr('disabled');
    } else {
        $("#btnGuardarHorario").attr('disabled','disabled');
    }
};

$("#L_entrada, #Mar_entrada, #Mier_entrada, #J_entrada, #V_entrada, #S_entrada, #D_entrada").keyup(function () {
    suma_de_horas();
});

$("#L_salida, #Mar_salida, #Mier_salida, #J_salida, #V_salida, #S_salida, #D_salida").keyup(function () {
    suma_de_horas();
});

function GuardarHorario(){
    var Tiene_Horario  = $("#Tiene_Horario").val();

    var id_datos       = $("#id_persona").val();
    var nombre_persona = $("#Nombre_Persona").val();

    var turno          = $("#Turno").val();
    var L_entrada      = $("#L_entrada").val();
    var L_salida       = $("#L_salida").val();
    var Mar_entrada    = $("#Mar_entrada").val();
    var Mar_salida     = $("#Mar_salida").val();
    var Mier_entrada   = $("#Mier_entrada").val();
    var Mier_salida    = $("#Mier_salida").val();
    var J_entrada      = $("#J_entrada").val();
    var J_salida       = $("#J_salida").val();
    var V_entrada      = $("#V_entrada").val();
    var V_salida       = $("#V_salida").val();
    var S_entrada      = $("#S_entrada").val();
    var S_salida       = $("#S_salida").val();
    var D_entrada      = $("#D_entrada").val();
    var D_salida       = $("#D_salida").val();
    if (Tiene_Horario == 'Si') {
        $.ajax({
            url:"../mDatosPersonales/actualizar_Horario.php",
            type:"POST",
            dataType:"html",
            data:{id_datos,turno,L_entrada,L_salida,Mar_entrada,Mar_salida,Mier_entrada,Mier_salida,J_entrada,J_salida,V_entrada,V_salida,S_entrada,S_salida,D_entrada,D_salida},
            success:function(respuesta){
                $("#modalHorario-DP").modal("hide");
                llenar_lista_DP();
                alertify.success("<i class='fa fa-save fa-lg'> Horario actualizado</i>",2);
                var idTema=$("#inicioIdTema").val();
                aplicarTema(idTema,'otro');
                actividad  = "Se ha actualizado el horario para la persona "+nombre_persona;
                var idUser = $("#inicioIdusuario").val();
                log(actividad,idUser);
            },
            error:function(xhr,status){
                alert("Error en metodo AJAX");
            },
        });
    }else{
        $.ajax({
            url:"../mDatosPersonales/guardar_Horario.php",
            type:"POST",
            dataType:"html",
            data:{id_datos,turno,L_entrada,L_salida,Mar_entrada,Mar_salida,Mier_entrada,Mier_salida,J_entrada,J_salida,V_entrada,V_salida,S_entrada,S_salida,D_entrada,D_salida},
            success:function(resuesta){
                $("#modalHorario-DP").modal("hide");
                llenar_lista_DP();
                alertify.success("<i class='fa fa-save fa-lg'> Horario guardado</i>",2);
                var idTema=$("#inicioIdTema").val();
                aplicarTema(idTema,'otro');
                actividad  = "Se ha creado un horario para la persona "+nombre_persona;
                var idUser = $("#inicioIdusuario").val();
                log(actividad,idUser);
            },
            error:function(xhr,status){
                alert("Error en metodo AJAX");
            },
        });
    }
}