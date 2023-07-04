@extends('admin_home')


@section('contenido_admin')



<input type="text" id="cod_admin_log" style="display: none" name="{{Auth::user()->id}}">


<div class=contorno>
    <div class="bloque" id="bloque">
            <h1>Zona de Creación</h1>
            <div class=main_crear>
                <form class=form_crear>
                    <div class="input">
                        <label class="label_crear">Ingrese Nuevo Dato</label>
                        <input class="input_crear" type="text" name="input_name" id="input_crear" ></br>
                    </div>

                    <td>
                        <span class="btn_editar_datos">
                            <a href="#" id="Btn_Zona">Zona</a>
                            <a href="#" id="Btn_Rubro">Rubro</a>
                            <a href="#" id="Btn_Duracion">Duración</a>
                        </span>
                    </td>
                </form>
            </div>
    </div>
</div>




@endsection





@section('js')
    <script src="{{asset('js/servicios/zonasService.js')}}"></script>
    <script src="{{asset('js/servicios/rubrosService.js')}}"></script>
    <script src="{{asset('js/servicios/duracionesService.js')}}"></script>
    <script src="{{asset('js/creacion_admin.js')}}"></script>
@endsection
