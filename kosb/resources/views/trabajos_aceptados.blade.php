@extends('layouts.master')

@section('contenido')
    
<!-- Registrar Menu  -->
<input type="text" class="form-control d-none" id="id_usuario" name="{{Auth::user()->id}}" value="{{Auth::user()->sexo}}">
{{--background: #f2efea;--}}
<div class="mb-5 mt-3">
  <div class="row g-0 p-3" style="height: 520px">
    <div class="col-12 col-md-4 col-lg-3 pt-4" style="background-color: white; border-radius: 5px">
      <div class="card mb-3">
        <div class="card-body text-center" style="background: #ffd2cd;border-color: #ffb0a8">
          <h4 class="card-title" style="height: 40px">Trabajos Aceptados y en Proceso</h4>
        </div>
      </div>
      <div class="list-group" id="lista-publicaciones">
        
      </div>
    </div>
    
    <div class="col-12 card col-md col-lg ms-5" style="background-color: white; border-radius: 5px">
      <div class="card-body">
        <div class="" id="contenido-de-publicacion">
          
        </div>
        <div class="d-none card text-center" id="puntuar_container">
          <div class="card-body text-center">
            <h4 class="card-title">Puntuación</h4>
            <div class="container_star text-center">
              <div class="star-widget text-center" id="star-widget">
  
                <input type="radio" name="rate" id="rate-5">
                <label for="rate-5" class="fas fa-star"></label>

                <input type="radio" name="rate" id="rate-4">
                <label for="rate-4" class="fas fa-star"></label>

                <input type="radio" name="rate" id="rate-3">
                <label for="rate-3" class="fas fa-star"></label>

                <input type="radio" name="rate" id="rate-2">
                <label for="rate-2" class="fas fa-star"></label>

                <input type="radio" name="rate" id="rate-1">
                <label for="rate-1" class="fas fa-star"></label>
                
              </div>
            </div>
      
            <div class="texto_puntuacion text-start">
              <div class="container-fluid"><h5 class="card-title">Ingrese Descripción</h5></div>
              <textarea  id="descripcion-txt" class=""></textarea>
            </div>
    
            <button class="btn" id="btn_crear_puntuacion">Puntuar</button>
            <input class="btn" value="Volver" onClick="window.location.href = 'trabajos_aceptados';">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>     
<!--4e5157-->

@endsection

@section('javascript')
<script src="https://cdnjs.cloudflare.com/ajax/libs/cleave.js/1.6.0/cleave.min.js"></script>
<script src="vendor/tinymce/js/tinymce/tinymce.min.js"></script>
<script src="{{asset('js/servicios/publicacionesService.js')}}"></script>
<script src="{{asset('js/servicios/postulacionesService.js')}}"></script>
<script src="{{asset('js/servicios/zonasService.js')}}"></script>
<script src="{{asset('js/servicios/rubrosService.js')}}"></script>
<script src="{{asset('js/servicios/duracionesService.js')}}"></script>
<script src="{{asset('js/servicios/puntuacionesService.js')}}"></script>
<script src="{{asset('js/servicios/usuariosService.js')}}"></script>
<script src="{{asset('js/trabajos_aceptados.js')}}"></script>
@endsection