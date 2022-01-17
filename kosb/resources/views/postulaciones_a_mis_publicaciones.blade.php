@extends('layouts.master')

@section('contenido')
    
<!-- Registrar Menu  -->
<input type="text" class="form-control d-none" id="id_usuario" name="{{Auth::user()->id}}" value="{{Auth::user()->sexo}}">
<input type="text" class="form-control d-none" id="prueba_input" >

{{--background: #f2efea;--}}
<div class="mb-5 mt-3">
  <div class="row g-0 p-3" style="height: 500px">
    <div class="col-12 col-md-4 col-lg-3 pt-4" style="background-color: white; border-radius: 5px">
      <div class="card mb-3">
        <div class="card-body text-center" style="background: #ffd2cd; border-color: #ffb0a8; border: 1px solid #FFA1C5; border-radius: 5px;">
          <h4 class="card-title" style="height: 15px">Publicaciones</h4>
        </div>
      </div>
        <div class="list-group" id="lista-publicaciones">
          
        </div>
      </div>
    
    <div class="col-12 col-md col-lg ms-5" style="background-color: white; border-radius: 5px; border: 1px solid #FFA1C5;">
      <div class="card-body">
        <div class="" id="contenido-de-publicacion">
          
        </div>
        <div class="tabla_trabajadores d-none" id="tabla_trabajadores" style="border: 1px solid #FFA1C5;">
          <table class="tabla_puntuacion" id="tabla_puntuacion" style="border: 1px solid #FFA1C5; border-radius: 5px;">
              <thead>
                  <tr>
                      <td>ID</td>
                      <td>Nombre</td>
                      <td>Correo</td>
                      <td>Puntuaciones</td>
                      <td>Acciones</td>                   
                  </tr>
              </thead>
              <tbody> 
   
              </tbody>
          </table>
        </div>
        <div class="d-none card text-center" id="puntuar_container">
          <div class="card-body text-center">            
            <div class="container_star">
              <div class="star-widget" id="star-widget">
  
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
      
            
                
            <textarea  id="descripcion-txt" class=""></textarea>
            
    
            <a class="btn" id="btn_crear_puntuacion">Puntuar</a>
            <input class="btn" value="Volver" onClick="location.reload();">

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
<script src="{{asset('js/servicios/usuariosService.js')}}"></script>
<script src="{{asset('js/servicios/puntuacionesService.js')}}"></script>
<script src="{{asset('js/post_en_pub.js')}}"></script>
@endsection