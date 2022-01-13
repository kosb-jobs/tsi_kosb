@extends('admin_home')

@section('contenido_admin')

  <!-- Cosito Suspension-->

  <div>
  <input type="text" id="cod_admin_log" style="display: none" name="{{Auth::user()->id}}">
  <div class="hide-me-suspension" id="hide-me-suspension">
        <div class="contorno_suspension">
            <div class="suspension" id="suspension">
                <h1>Suspension De Usuario</h1>
                <div class=main_crear_suspension>
                    <form class=form_suspension>
                        <div class="input_suspension">                                    
                            <label class="label_fecha">Ingrese Fecha de Inicio</label>
                            <input class="fecha_inicio" type="date" name="input_fecha_ini" id="input_fecha_ini" min='1899-01-01' ></br>
                            <label class="label_fecha">Ingrese Fecha de Finalizacion</label>
                            <input class="fecha_inicio" type="date" name="input_fecha_fin" id="input_fecha_fin" min='1899-01-01' ></br>
                            <label class="label_fecha">Descripcion</label>
                            <textarea  id="descripcion-txt" class=""></textarea>
                        </div>
            
                        <td>
                            <span class="btn_editar_datos">
                                <a href="#" id="Btn_Susp_Sanc">Sancionar</a> <!-- Este podria ser un dropdown button que muestre la edicion -->
                                <a href="#" id="Btn_Cancel_Sanc">Cancelar</a>                                
                            </span>
                        </td>
                        </form>
                    </div>
            
                </div>
            </div>
         </div>

    </div>
</div>

<!-- HTML TABLA RESPONSIBA PARA VER USUARIOS -->
<input type="text" id="cod_admin_log" class="desaparecer-elemento" name="{{Auth::user()->id}}">
<div class="table_responsive">
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Sexo</th>
                <th>Email</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="contenedor"> 
            
        </tbody>
    </table>
</div>

<!-- HTML TABLA RESPONSIBA PARA VER ADMINISTRADORES-->

<div class="table_responsive">
    <table>
        <thead>
            <tr>
                <th>Código Usuario</th>
                <th>ID Administrador</th>
                <th>Tipo Administrador</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody id="contenedor_admin"> 
            
        </tbody>
    </table>
</div>

</div>

</div>



@endsection

@section('js')
    <script src="{{asset('js/servicios/usuariosService.js')}}"></script> 
    <script src="{{asset('js/servicios/administradoresService.js')}}"></script> 
    <script src="{{asset('js/servicios/suspensionesService.js')}}"></script> 
    <script src="{{asset('js/usuarios_en_admin.js')}}"></script>  

@endsection
