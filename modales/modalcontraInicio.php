<!-- Modal -->
<div class="modal fade" id="modalcontraInicio" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                  <label for="contraN">Contraseña nueva:</label>
                  <input type="password" id="contraN" class="form-control" placeholder="Escribe aqui..."  autofocus required><br>
              </div>
              <div class="col-xs-12 col-ms-12 col-md-6 col-lg-6">
                  <label for="Vcontra">Verificar contraseña:</label>
                  <input type="password" id="Vcontra" class="form-control" placeholder="Verificar..." onkeyup="comparePassword();" required><br>
              </div>
              <br>
              <div id="pswd_info">
                <center><h6>&nbsp;&nbsp;&nbsp;&nbsp;Tu contraseña debe cumplir con los siguientes requisitos:</h6></center>
                  <ul>   
                      <li id="" class="">Tener como mínimo 8 carácteres.</li>
                      <li id="" class="">Las contraseñas deben coincidir.</li>          
                  </ul>
              </div>
            </div>
          </div> 
          <div class="col text-center">
                <button value=0 type="button" id="btnVerContraIni" class="btn btn-form pull-left">
								  <i id="icoVerContraIni" class="far fa-eye-slash"></i>
					      </button>
                <button type="button" class="btn btn-outline-danger" data-dismiss="modal"><i class="fas fa-window-close"></i> Cancelar</button>
                <button type="button" class="btn btn-outline-dark" onclick="generarcontraRandom();"><i class="fas fa-repeat"></i> Generar</button>
                <button type="button" class="btn btn-outline-primary" onclick="cambiarPassword();" id="btnguardarConI"><i class="fas fa-archive"></i> Guardar</button>
          </div>
      </form>
    </div>
  </div>
</div>