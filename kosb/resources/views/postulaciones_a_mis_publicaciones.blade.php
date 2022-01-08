@extends('layouts.master')

@section('contenido')
    
<!-- Registrar Menu  -->
<input type="text" class="form-control d-none" id="id_usuario" name="{{Auth::user()->id}}" value="{{Auth::user()->sexo}}">
{{--background: #f2efea;--}}
<div class="mb-5 mt-3">
  <div class="row g-0 p-3" style="height: 500px">
    <div class="col-12 col-md-4 col-lg-3 pt-4" style="background-color: white; border-radius: 5px">
      <div class="card mb-3">
        <div class="card-body text-center" style="background: #ffd2cd;border-color: #ffb0a8">
          <h4 class="card-title" style="height: 15px">Publicaciones</h4>
        </div>
      </div>
      <div class="list-group" id="lista-publicaciones">
        
      </div>
    </div>
    
    <div class="col-12 col-md col-lg ms-5" style="background-color: white; border-radius: 5px">
      <div class="card-body">
        <div class="" id="contenido-de-publicacion">
          
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
<script src="{{asset('js/post_en_pub.js')}}"></script>
@endsection