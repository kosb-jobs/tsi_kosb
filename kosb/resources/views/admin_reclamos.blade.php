@extends('admin_home')


@section('contenido_admin')


<div>

<input type="text" id="cod_admin_log" style="display: none" name="{{Auth::user()->id}}">
  <div class="hide-me-reclamos" id="hide-me-reclamos">
        <div class="contorno_reclamo">
            <div class="reclamo" id="reclamo">
                <h1>Ingrese Respuesta Al Reclamo</h1>
                <div class="main_responder_reclamo">
                    <form class=form_reclamo>
                        <div class="input_suspension">                                
                            <label class="label_fecha">Descripción</label>
                            <textarea name="" class="form-control" rows="3" cols="50" id="input_descrip_rec">Descripción</textarea>
                        </div>            
                        <td>
                            <span class="btn_editar_datos">
                                <a href="#" id="Btn_Responder">Responder</a> 
                                <a href="#" id="Btn_Cancelar_Respuesta">Cancelar</a>                                
                            </span>
                        </td>
                        </form>
                    </div>
            
                </div>
            </div>
         </div>

    </div>
</div>




<div class=table_responsive>
    <table>
        <thead>
            <tr>
                <td>ID Reclamo</td>
                <td>Título</td>
                <td>Usuario</td>
                <td>Tipo de Reclamo</td>
                <td>Descripción del Reclamo</td>                
                <td>Acciones</td>
                            
            </tr>
        </thead>
        
        <tbody id="contenedor_admin_reclamos"> 
        <!-- aqui se deben cargar los datos de la tabla -->
      
        </tbody>
    </table>
</div>
    

<div class=table_responsive>
    <table>
        <thead>
            <tr></tr>
                <td>ID Reclamo</td>
                <td>Título</td>
                <td>Usuario</td>
                <td>Tipo de Reclamo</td>
                <td>Descripción del Reclamo</td>
                <td>Respuesta</td>
                
                            
            </tr>
        </thead>
        
        <tbody id="contenedor_admin_reclamos_listo"> 
        <!-- aqui se deben cargar los datos de la tabla -->
                                   

        </tbody>
    </table>
</div>

</div>



@endsection





@section('js')
    <script src="{{asset('js/servicios/reclamosService.js')}}"></script>
    <script src="{{asset('js/servicios/administradoresService.js')}}"></script>  
    <script src="{{asset('js/reclamos_en_admin.js')}}"></script>  

@endsection