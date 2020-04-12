<!-- Modal -->
<div class="modal fade" id="modalcontra" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content" style="border-radius=10px">
      <div class="modal-header">
        <div class="container-fluid" >
          <h5 class="modal-title" id="exampleModalLabel" >Cambiar la contraseña</h5>
        </div>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form action="" id="frmcontra">
          <div class="modal-body" >
            <div class="row">
              <div class="col-xs-12 col-ms-12 col-md-6 col-lg-6">
                  <label for="conn">Contraseña nueva:</label>
                  <input type="password" id="conn" class="form-control" placeholder="Escribe aqui..."  autofocus required><br>
              </div>
              <div class="col-xs-12 col-ms-12 col-md-6 col-lg-6">
                  <label for="reccn">Verificar contraseña:</label>
                  <input type="password" id="reccn" class="form-control" placeholder="Verificar..." onkeyup="comparepsw();" required><br>
              </div>
              <br>
              <div id="pswd_info">
                <center><h5>Tu contraseña debe cumplir con los siguientes requisitos:</h5></center>
                  <ul>   
                      <li id="length" class="invalid">Tener como mínimo 8 carácteres.</li>
                      <li id="con" class="invalid">Las contraseñas deben coincidir.</li>          
                  </ul>
              </div>
            </div>
          </div> 
          <div class="col text-center">
                <button value=0 type="button" id="btnVerContra" class="btn btn-form pull-left">
								  <i id="icoVerContra" class="far fa-eye-slash"></i>
					      </button>
                <button type="button" class="btn btn-outline-danger" data-dismiss="modal"><i class="fas fa-window-close"></i> Cancelar</button>
                <button type="button" class="btn btn-outline-dark" onclick="generarcontra();"><i class="fas fa-repeat"></i> Generar</button>
                <button type="button" class="btn btn-outline-primary" onclick="cambiarPass();" id="btnguardar" disabled><i class="fas fa-archive"></i> Guardar</button>
          </div>
      </form>
    </div>
  </div>
</div>