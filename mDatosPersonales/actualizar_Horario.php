<?php
// Conexion mysqli
include ("../conexion/conexionli.php");

//Recibo valores con el metodo POST
$id_datos     = $_POST['id_datos'];
$turno        = trim($_POST['turno']);
$L_entrada    = trim($_POST['L_entrada']);
$L_salida     = trim($_POST['L_salida']);
$Mar_entrada  = trim($_POST['Mar_entrada']);
$Mar_salida   = trim($_POST['Mar_salida']);
$Mier_entrada = trim($_POST['Mier_entrada']);
$Mier_salida  = trim($_POST['Mier_salida']);
$J_entrada    = trim($_POST['J_entrada']);
$J_salida     = trim($_POST['J_salida']);
$V_entrada    = trim($_POST['V_entrada']);
$V_salida     = trim($_POST['V_salida']);
$S_entrada    = trim($_POST['S_entrada']);
$S_salida     = trim($_POST['S_salida']);
$D_entrada    = trim($_POST['D_entrada']);
$D_salida     = trim($_POST['D_salida']);

$fecha=date("Y-m-d"); 
$hora=date ("H:i:s");

//Inserto registro en tabla pacientes 
$cadena = "UPDATE horarios
			SET
				turno             = '$turno',
				l_entrada         = '$L_entrada', 
				l_salida          = '$L_salida', 
				m_entrada         = '$Mar_entrada', 
				m_salida          = '$Mar_salida', 
				mi_entrada        = '$Mier_entrada', 
				mi_salida         = '$Mier_salida', 
				j_entrada         = '$J_entrada', 
				j_salida          = '$J_salida', 
				v_entrada         = '$V_entrada',
				v_salida          = '$V_salida',
				s_entrada         = '$S_entrada',
				s_salida          = '$S_salida',
				d_entrada         = '$D_entrada',
				d_salida          = '$D_salida', 
				fecha_registro    = '$fecha', 
				hora_registro     = '$hora'
			WHERE 
				id_datos_persona= $id_datos";
$actualizar = mysqli_query($conexionLi, $cadena);

//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>