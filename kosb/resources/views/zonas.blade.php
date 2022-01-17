@extends('admin_home')

@section('contenido_admin')

<!-- HTML TABLA RESPONSIBA PARA EDITAR ZONAS-->

<input type="text" id="cod_admin_log" class="desaparecer-elemento" name="{{Auth::user()->id}}">
<div class="hide-me-zonas-edicion" id="hide-me-zonas-edicion">
    <div class="edicion-zona" id="edicion-zona"> 

            <h1>Edición De Valores</h1>
            <div class=main_user_admin>
                <form >
                    <div class="zona">                                        
                        <label class="label_zona">Ingrese Nuevo Valor</label> 
                        <input class="input_zona" type="text" id="nombre_zona"></br>
                    </div>

                    <td>
                        <span class="btn_editar_datos">
                            <a href="#" id="guardar">Guardar</a> 
                            <a href="#" id="cancelar">Cancelar</a>
                        </span>
                    </td>
                    </form>
                </div>
        
            </div>  

    </div>
</div>

<!-- HTML TABLA RESPONSIBA PARA EDITAR RUBROS-->





<!-- HTML TABLA RESPONSIBA PARA VER ZONAS -->

<div class="hide-me-zonas" id="hide-me-zonas">

<div class="table_responsive">
    <table id="tabla_zonas">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre De La Zona</th>
                <th>Código Administrador Editor</th>
                <th>Fecha Edición</th>   
                <th>Acciones</th>
                
            </tr>
        </thead>
        <tbody id="contenedor_zonas"> 
            
        </tbody>
    </table>
</div>

</div>

<!-- HTML TABLA RESPONSIBA PARA VER RUBROS -->

<div class="hide-me-rubro" id="hide-me-rubro">

<div class="table_responsive">
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre Del Rubro</th>
                <th>Código Administrador Editor</th>
                <th>Fecha Edición</th>   
                <th>Acciones</th>
                
            </tr>
        </thead>
        <tbody id="contenedor_rubro"> 
            
        </tbody>
    </table>
</div>

</div>

<!-- HTML TABLA RESPONSIBA PARA VER DURACION -->


<div class="hide-me-duracion" id="hide-me-duracion">

<div class="table_responsive">
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Título Duración</th>
                <th>Código Administrador Editor</th>
                <th>Fecha Edición</th>   
                <th>Acciones</th>
                
            </tr>
        </thead>
        <tbody id="contenedor_duracion"> 
            
        </tbody>
    </table>
</div>

</div>



@endsection

@section('js')
    <script src="{{asset('js/servicios/zonasService.js')}}"></script>
    <script src="{{asset('js/servicios/rubrosService.js')}}"></script>
    <script src="{{asset('js/servicios/duracionesService.js')}}"></script>
    <script src="{{asset('js/servicios/administradoresService.js')}}"></script>
    <script src="{{asset('js/zonas_en_admin.js')}}"></script>  

@endsection
