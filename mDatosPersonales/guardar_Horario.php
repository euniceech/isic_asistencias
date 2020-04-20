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
$cadena = "INSERT INTO horarios
				(id_datos_persona,
				turno,
				l_entrada, 
				l_salida, 
				m_entrada, 
				m_salida, 
				mi_entrada, 
				mi_salida, 
				j_entrada, 
				j_salida,
				v_entrada,
				v_salida,
				s_entrada,
				s_salida,
				d_entrada,
				d_salida, 
				fecha_registro, 
				hora_registro)
			VALUES
				('$id_datos',
				'$turno',
				'$L_entrada',
				'$L_salida', 
				'$Mar_entrada', 
				'$Mar_salida', 
				'$Mier_entrada', 
				'$Mier_salida', 
				'$J_entrada',
				'$J_salida',
				'$V_entrada',
				'$V_salida',
				'$S_entrada',
				'$S_salida',
				'$D_entrada',
				'$D_salida',
				'$fecha', 
				'$hora')";
$insertar = mysqli_query($conexionLi, $cadena);

//En caso de error imprime
print_r(mysqli_error($conexionLi));
//Cierro la conexion
mysqli_close($conexionLi);
?>