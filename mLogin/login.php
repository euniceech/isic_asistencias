<div class="login-box" >
    <div class="login-box-body bordeLogin">
        <p class="tituloLogin">Sistema Control de Accesos</p>
        
        <form action="verificar_login.php" method="post" id="frmLogin" style="border-color:#218c74">
            <div class="form-group has-feedback logoActivo">
                <label class="lblTitulo">Usuario:</label>
            <input type="usuario" id="loginUsuario" class="form-control" placeholder="Escribe el nombre de usuario" autofocus required>
            </div>
            <div class="form-group has-feedback">
                <label class="lblTitulo">Contraseña:</label>
            <input type="password" id="loginContra" class="form-control" placeholder="Escribe la contraseña" required>
            </div>
                <div class="col text-center">
                    <button   type="submit" class="btn btn-outline-primary active" id="btnIngresar" disabled>
                        <i class="fas fa-user-lock" id="icoLogin"></i> Ingresar al sistema
                    </button>
                </div>
                <br>
                <div class="col text-center">
                <input type="checkbox" data-toggle="toggle" data-size="sm" data-onstyle="outline-success" data-offstyle="outline-danger" data-on="SI" data-off="NO" id="camcon">
                        Actualizar contraseña
                    </button>
                </div>
        </form>
    </div>
</div>