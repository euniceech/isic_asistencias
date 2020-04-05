<?php 
//conexion mysql
include ("../conexion/conexionli.php");

//recibo valores del metodo post
$usuario = $_POST['usuario'];
$contra = $_POST['contra'];
$ncontra = $_POST['ncontra'];

$fecha = date("Y-m-d");
$hora = date("H:i:s");

//insertar registro en tabla pacientes
$cadena = "UPDATE usuarios
            SET
                contra='$ncontra',
                fecha_registro='$fecha'
            WHERE
                nombre_usuario='$usuario' AND contra='$contra'";

echo $ncontra;
console.log($usuario);
console.log($contra);
$actualizar = mysqli_query($conexionLi, $cadena);

//En caso de error imprime
print_r(mysqli_error($conexionli));
//cierro la conexion
mysqli_close($conexionLi);
?>