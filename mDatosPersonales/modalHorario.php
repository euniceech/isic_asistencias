<!-- Modal -->
<div class="modal fade" id="modalHorario-DP" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document" >
    <div class="modal-content">
      <div class="modal-header" >
        <h5 class="modal-title" id="modalTitle-Horario">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      
      <input type="hidden" id="id_persona">
      <input type="hidden" id="Nombre_Persona">
      <input type="hidden" id="Tiene_Horario">

      <div class="modal-body">
        <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div class="form-group">
                <label for="Turno">Tipo de turno:</label>
                <select id="Turno" class="select2" style="width: 100%">
                    <option value=""></option>
                    <option value="Especial">Turno Especial</option>
                    <option value="Matutino">Turno Matutino</option>
                    <option value="Vespertino">Turno Vespertino</option>
                    <option value="Nocturno">Turno Nocturno</option>
                </select>
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="HorasTrabajadas">Horas totales trabajadas:</label>
                  <input value="0" type="text" class="form-control " id="HorasTrabajadas" disabled>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="L_entrada">Hora entrada Lunes:</label>
                  <input type="time" class="form-control " id="L_entrada" disabled>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="L_salida">Hora salida Lunes:</label>
                  <input type="time" class="form-control" id="L_salida" disabled>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="Mar_entrada">Hora entrada Martes:</label>
                  <input type="time" class="form-control activo" id="Mar_entrada" disabled>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="Mar_salida">Hora salida Martes:</label>
                  <input type="time" class="form-control activo" id="Mar_salida" disabled>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="Mier_entrada">Hora entrada Miercoles:</label>
                  <input type="time" class="form-control activo" id="Mier_entrada" disabled>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="Mier_salida">Hora salida Miercoles:</label>
                  <input type="time" class="form-control activo" id="Mier_salida" disabled>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="J_entrada">Hora entrada Jueves:</label>
                  <input type="time" class="form-control activo" id="J_entrada" disabled>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="J_salida">Hora salida Jueves:</label>
                  <input type="time" class="form-control activo" id="J_salida" disabled>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="V_entrada">Hora entrada Viernes:</label>
                  <input type="time" class="form-control activo" id="V_entrada" disabled>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="V_salida">Hora salida Viernes:</label>
                  <input type="time" class="form-control activo" id="V_salida" disabled>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="S_entrada">Hora entrada Sabado:</label>
                  <input type="time" class="form-control activo" id="S_entrada" disabled>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="S_salida">Hora salida Sabado:</label>
                  <input type="time" class="form-control activo" id="S_salida" disabled>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="D_entrada">Hora entrada Domingo:</label>
                  <input type="time" class="form-control activo" id="D_entrada" disabled>
              </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div class="form-group">
                  <label for="D_salida">Hora salida Domingo:</label>
                  <input type="time" class="form-control activo" id="D_salida" disabled>
              </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        <button id="btnGuardarHorario" type="button" class="btn btn-primary" onclick="GuardarHorario();" disabled>Guardar</button>
      </div>
    </div>
  </div>
</div>
