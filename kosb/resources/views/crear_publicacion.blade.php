@extends('layouts.master')

@section('contenido')
    
<!-- Registrar Menu  -->

<!-- Arreglar Estetica con CSS y js  -->
<div class="alert alert-warning mt-4 ms-4 me-4 shadow-sm" role="alert">
  Cuidado!! Recuerde guardar su publicación creada. Si no lo hace perderá su trabajo 😔!
</div>
<div class="row mb-5" id="Ingreso">
  <div class="col-12 col-md-6 col-lg-4">
    <div class="card mt-2">
      <div class="card-header " id="ingresar-menu">
        <span><b>NUEVA PUBLICACIÓN</b></span>
      </div>

      <div class="card-body" id="fondo-menu">
        <div class="mb-3">
          <label for="nom-publicacion" class="form-label">Título De La Publicacion</label>
          <input type="text" class="form-control" id="nom-publicacion">
        </div>

        <div class="mb-3">
          <label for="nom-trabajo" class="form-label">Tipo De Trabajo</label>
          <select id="select-tipo-trabajo" class="form-select"></select>
        </div>
        <!--
        <div class="mb-3">
            <label for="total-pedido" class="form-label">Hora Del Trabajo</label>
            <input  type="time" class="form-control input-time-b" id="total-pedido">
        </div>-->
        <div class="mb-3">
          <label for="total-pedido" class="form-label">Duración	del trabajo</label>
          <select id="duracion-select" class="form-select"></select>
        </div>

        <div class="mb-3">
          <label for="total-pedido" class="form-label">Zonas del trabajo</label>
          <select id="zona-select" class="form-select"></select>
        </div>

        <div class="mb-3" id="f">
            <label for="fecha-trabajo" class="form-label">Fecha Inicio Del Trabajo</label>
            <input  type="date" class="form-control flatpickr flatpickr-input" readonly="readonly" id="fecha-trabajo" >
        </div>
        <div class="mb-3" id="f">
          <label for="total-pedido" class="form-label">Fecha Fin Del Trabajo</label>
          <input  type="date" class="form-control flatpickr flatpickr-input" readonly="readonly" id="fecha-fin-trabajo" >
        </div>
        <div class="mb-3">
            <label for="" class="form-label">Descripcion</label>
            <textarea  id="descripcion-txt" class=""></textarea>
        </div>
      </div>

      <div class="card-footer" id="fondo-btn-agregar">
        <div class="text-center" style="color: white;" >
          <button type="button" class="btn " style="background: #eec4c4" id="btn-vista-previa"><b>Vea la vista Previa</b></button>
        </div>
      </div>
    </div>
  </div>
  <div class="col-12 col-md col-lg">
    <div class="card shadow-lg mt-2">
      <div class="card-body" style="height: 500px">
        <div class="contenedor" style="max-height: 460px; width: auto;">
          <div class="mt-2">
            <h3 class="text-start ms-3"><u id="tit-pub">Título de la publicación</u></h3>
          </div>
          
          <p class="text-end pe-5" ><u>Rubro de la publicación:</u><i id="tip-emp">tipo de empleo!</i></p>
          <section class="ps-3 pe-5">
            <p class="h6"><strong>Descripción</strong></p>
            <div class="contenedor ps-2" id="desc-vista" style="border: solid #cecece .1px;border-radius: 2px; max-height: 200px; width: auto;">
              <p class="text-start">Aquí irá la descripción de su publicación</p>
            </div>
          </section>
          <div class="row mt-3 ms-3 me-5 text-center">
            <div class="col-12 col-md-12 col-lg-6">
              <div class="row">
                <div class="col-12 col-md-12 col-lg-6 mt-1">
                  <div class="card">
                    <div class="card-header" style="height: 40px"><span class="fs-6 text-center">Fecha</span></div>
                    <div class="card-body" id="fecha-change-txt">

                    </div>
                  </div>
                </div>
                <div class="col-12 col-md col-lg mt-1">
                  <div class="card">
                    <div class="card-header" style="height: 40px">
                      <span>Horario</span>
                    </div>
                    <div class="card-body" id="horario-txt">
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-12 col-lg-6">
              <div class="row">
                <div class="col-12 col-md-12 col-lg-6 mt-1">
                  <div class="card">
                    <div class="card-header" style="height: 40px">
                      <span>Dirección</span>
                    </div>
                    <div class="card-body" id="direccion-zona-txt"></div>
                  </div>
                </div>
                <div class="col-12 col-md col-lg mt-1">
                  <div class="card">
                    <div class="card-header" style="height: 40px">
                      <span>Duración</span>
                    </div>
                    <div class="card-body" id="duracion-change-txt"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer text-end">
        <button class="btn text-ligth" disabled id="guardar-btn" name="{{Auth::user()->id}}" style="background-color: #FF6F61; color:#fff">Finalizar y Guardar creación</button>
      </div>
    </div>
    <div class="alert alert-secondary mt-5 ms-4 me-4" role="alert">
      Recuerde seleccionar la vista previa antes de guardar😉👍!
    </div>
  </div>
</div>        
<!--4e5157-->
        
@endsection

@section('javascript')
<script src="https://cdnjs.cloudflare.com/ajax/libs/cleave.js/1.6.0/cleave.min.js"></script>
<script src="vendor/tinymce/js/tinymce/tinymce.min.js"></script>
<script src="{{asset('js/flatpicker.js')}}"></script>
<script src="{{asset('js/servicios/publicacionesService.js')}}"></script>
<script src="{{asset('js/servicios/ofertantesService.js')}}"></script>
<script src="{{asset('js/servicios/zonasService.js')}}"></script>
<script src="{{asset('js/servicios/rubrosService.js')}}"></script>
<script src="{{asset('js/servicios/duracionesService.js')}}"></script>

<script src="{{asset('js/crear_publicacion.js')}}"></script>

@endsection