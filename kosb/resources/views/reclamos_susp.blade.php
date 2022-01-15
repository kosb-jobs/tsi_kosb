@extends('layouts.banned_navigation')

@section('contenido')
    @auth
        <input type="text" class="form-control d-none" id="id_usuario" name="{{Auth::user()->id}}" value="{{Auth::user()->sexo}}">
    @else
        <input type="text" class="form-control d-none" id="id_usuario" name="no-logeado" value="">
    @endauth
 
    <div class="mt-2 ms-5 me-5 mb-5">
        <code class="text-sm mb">Tu cuenta está suspendida por el momento, si necesitas realizar un reclamos sobre esta situación o saber más, has un reclamo en esta página</code>
        <div class="card mt-3">
            <div class="card-body">
                <h5 class="card-title">Mis reclamos</h5>
                <div class="card" id="div-creacion-rec" style="border-color: #ffb0a8">
                    <div class="card-header" style="background: #ffd2cd;border-color: #ffb0a8">
                        <span>Nuevo Reclamo</span>
                    </div>
                    <div class="card-body" style="border-color: #ffb0a8">
                        <div class="mb-3">
                            <label for="nom-publicacion" class="form-label">Título del Reclamo</label>
                            <input type="text" class="form-control" id="titulo-reclamo">
                          </div>
                  
                          <div class="mb-3">
                            <label for="select-tipo-reclamo" class="form-label">Asunto del reclamo</label>
                            <select id="select-tipo-reclamo" class="form-select">
                                <option value="R">Reclamo</option>
                                <option value="S">Sugerencia</option>
                                <option value="P">Denuncia Publicación</option>
                                <option value="U">Denuncia Usuario</option>
                            </select>
                          </div>
                          <div class="mb-3">
                              <label for="" class="form-label">Descripcion</label>
                              <textarea  id="descripcion-txt" class=""></textarea>
                          </div>
                    </div>
                    <div class="card-footer text-end" style="border-color: #ffb0a8;background: #fff0ee">
                        <button class="btn btn-info" id="ingresar-reclamo-btn" style="color: #fff">Crear Reclamo</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection


@section('javascript')
<script src="vendor/tinymce/js/tinymce/tinymce.min.js"></script>
<script src="{{asset('js/servicios/reclamosService.js')}}"></script>
<script src="{{asset('js/reclamos_suspendido.js')}}"></script>
@endsection