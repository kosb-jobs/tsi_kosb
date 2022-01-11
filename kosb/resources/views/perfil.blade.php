@extends('layouts.master')

@section("contenido")


<input type="text" class="form-control d-none" id="id_usuario" name="{{Auth::user()->id}}" value="{{Auth::user()->sexo}}"> 
        
        <!-- Inicio de Mi Cuenta -->
        <div class="my-account" >
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-3 mb-5">
                        <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                            <a class="nav-link active" id="dashboard-nav" data-toggle="pill" href="#dashboard-tab" role="tab"><ion-icon name="heart-half-outline"></ion-icon>Panel De Control</a>
                            <a class="nav-link" id="orders-nav" data-toggle="pill" href="#orders-tab" role="tab"><ion-icon name="save-outline"></ion-icon>Mis Publicaciones</a>
                            <a class="nav-link" id="orders-nav" data-toggle="pill" href="#mi-puntuacion" role="tab"><ion-icon name="bar-chart"></ion-icon>Mi Puntuación</a>
                            <a class="nav-link" id="publicaciones_post" data-toggle="pill" href="#postulaciones-mis-publicaciones" role="tab"><ion-icon name="bookmarks"></ion-icon>Postulaciones a mis Publicaciones</a>
                            <a class="nav-link" href="{{route('buscar_trabajo')}}" role="tab"><ion-icon name="search-outline"></ion-icon>Búsqueda de Publicaciones</a>
                            <a class="nav-link" id="address-nav" data-toggle="pill" href="#address-tab" role="tab"><ion-icon name="telescope-outline"></ion-icon>Mis Postulaciones</a>
                            <a class="nav-link" id="account-nav" data-toggle="pill" href="#account-tab" role="tab"><ion-icon name="settings-outline"></ion-icon>Detalles De Cuenta</a>
                            <a class="nav-link" id="account-nav" data-toggle="pill" href="#reclamos-tab" role="tab"><ion-icon name="alert"></ion-icon>Mis Reclamo</a>
                            <a class="nav-link" id="admin-nav" href="#"><ion-icon name="person"></ion-icon>Administrador</a>
                            {{-- <a class="nav-link" :href="route('logout')" onclick="event.preventDefault();this.closest('form').submit();">
                                        <i class="fa fa-sign-out-alt"></i>Cerrar Sesion</a>
                        <!--
                        <x-dropdown-link :href="route('logout')"
                                                onclick="event.preventDefault();
                                                            this.closest('form').submit();">
                                            {{ __('Cierre Sesión') }}
                                        </x-dropdown-link>
                        --> --}}
                        
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="dashboard-tab" role="tabpanel" aria-labelledby="dashboard-nav">
                                <h4>Panel</h4>
                                <p>
                                    Bienvenidos a Nuestra Pagina "Keep Oneself Busy" la cual ha sido desarrollada con el fin de ayudarle a encontrar trabajos esporadicos, corto plazo y largo plazo.
                                </p>
                            </div>
                            <div class="tab-pane fade show" id="mi-puntuacion" role="tabpanel" aria-labelledby="dashboard-nav">
                                <h4>Mi puntuación</h4>
                                <p>
                                    Acá se podrá ver la puntuación total del usuario, tanto en calidad de trabajador como ofertante.
                                </p>
                            </div>
                            <div class="tab-pane fade show" id="reclamos-tab" role="tabpanel" aria-labelledby="dashboard-nav">
                                <button class="btn btn-dark mb-3 d-none" id="btn-back-reclamos"><i class="fas fa-long-arrow-alt-left" style="size: 10x"></i></button>
                                {{--<ion-icon size="small" name="arrow-undo-outline"></ion-icon>--}}
                                <div class="row mb-3">
                                    <div class="col-12 col-md-6 col-lg-6">
                                        <h4>Mis reclamos</h4>

                                    </div>
                                    <div class="col-12 col-md col-lg text-end">
                                        <button class="btn btn-info" id="btn-activar-creacion-reclamo">Crear Reclamo <ion-icon name="add-outline" class="mt-1" style="height: 15px"></ion-icon></button>
                                    </div>
                                </div>
                                
                                <div id="contenedor-reclamos" class="text-center contenedor comp-content-exist">
                                    
                                </div>
                                <div class="card d-none" id="div-creacion-rec" style="border-color: #ffb0a8">
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
                            <div class="tab-pane fade" id="orders-tab" role="tabpanel" aria-labelledby="orders-nav">
                                <h4>Busqueda de Publicaciones</h4>
                                <div class="table-responsive contenedor mt-2" style="border: solid #cecece .1px;border-radius: 2px; max-height: 250px; width: auto;background: #fff;">
                                    <table class="table table-bordered">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th>Zona</th>
                                                <th>Titulo</th>
                                                <th>Fecha inicio</th>                                                
                                                <th>Rubro</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tbody">
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-12 col-md-11 col-lg-11 mx-auto">
                                        <div class="card">
                                            <div class="card-header">
                                                <span>Publicación a Actualizar</span>
                                            </div>
                                            <div class="card-body">
                                                <div class="form-floating mb-3">
                                                    <input type="text" class="form-control" disabled id="titulo-txt" placeholder="nombre-producto">
                                                    <label for="titulo-txt">Título de la publicación</label>
                                                </div>
                                                <div class="form-floating mb-3">
                                                    <select class="form-select" disabled id="duracion-select" aria-label="categoria"></select>
                                                    <label for="duracion-select">Duracion</label>
                                                </div>
                                                <div class="form-floating mb-3">
                                                    <select class="form-select" disabled id="rubros-select" aria-label="categoria">
                                                    </select>
                                                    <label for="rubros-select">Tipos de Trabajo</label>
                                                </div>
                                                <div class="form-floating mb-3">
                                                    <select class="form-select" disabled id="zonas-select" aria-label="categoria"></select>
                                                    <label for="zonas-select">Zona</label>
                                                </div>
                                                <div class="form-floating mb-3">
                                                    <input type="date" class="form-control" disabled id="fecha-date" placeholder="precio-producto">
                                                    <label for="fecha-date">Fecha de Inicio</label>
                                                </div>
                                                <div class="form-floating mb-3">
                                                    <input type="date" class="form-control" disabled id="fecha-fin-date" placeholder="precio-producto">
                                                    <label for="fecha-fin-date">Fecha de Fin del Trabajo</label>
                                                </div>
                                                <div class="form-floating mb-3">
                                                    <textarea disabled id="descripcion-txt-porfiao" class="form-control"></textarea>
                                                    <label for="descripcion-txt" class="form-label">Descripcion</label>
                                                </div>
                                            </div>
                                            <div class="card-footer">
                                                <button id="guardar-cambios-btn" class="btn" disabled>Guardar cambios</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div class="tab-pane fade" id="payment-tab" role="tabpanel" aria-labelledby="payment-nav">
                                <h4>Busqueda de Publicaciones</h4>
                                <p>
                                    Redireccionar a Busquedas
                                </p> 
                            </div>
                            <div class="tab-pane fade" id="postulaciones-mis-publicaciones" role="tabpanel" aria-labelledby="payment-nav">
                                <h4>Las Postulaciones a mis Publicaciones</h4>
                                <div class="" id="contenedor-de-postulaciones-a-mis-postulaciones">
                                    <div class="accordion" id="accordionPostulaciones">
                                    
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="address-tab" role="tabpanel" aria-labelledby="address-nav">
                                <h4>Mis Postulaciones</h4>
                                <div class="table-responsive contenedor" style="border: solid #cecece .1px;border-radius: 2px; max-height: 400px; width: auto;background: #fff;">
                                    <table class="table table-bordered">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th>Código de publicación</th>
                                                <th>Respuesta</th>
                                                <th>Fecha postulacion</th>                                                
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tbody-postulaciones">
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="account-tab" role="tabpanel" aria-labelledby="account-nav">
                                <h4>Detalles de la cuenta</h4>
                                <div class="row">
                                    <div class="col-md-6">
                                        <label for="start">Nombre</label>
                                        <input class="form-control" id="name-user" type="text" placeholder="Nombre" value="{{Auth::user()->name}}">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="start">Apellido</label>
                                        <input class="form-control" type="text" id="apellido-user" placeholder="Apellido" value="{{Auth::user()->apellido}}">
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <label for="start">Fecha de nacimiento</label>
                                        <input class="form-control" type="date" id="fecha-nac-user" value="{{Auth::user()->fecha_nac}}">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="start">Estado del Usuario</label>
                                        <input class="form-control" type="text" disabled placeholder="Estado" @if (Auth::user()->estado == 1)
                                            value="Usuario Desactivado"
                                        @else
                                            value="Usuario Activo"
                                        @endif>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="start">Correo electrónico</label>
                                        <input class="form-control" type="text" id="email-txt" disabled value="{{Auth::user()->email}}">
                                    </div>
                                    <div class="ms-3 mb-2 me-5 card pb-2">
                                        <label class="form-check-label" for="flexRadioDefault2">
                                            Seleccione su Sexo
                                        </label>
                                    
                                        <div class="row text-center">
                                            <div class="form-check col-md-4">
                                                <input class="form-check-input" type="radio" value="F" name="sexo" id="femenino-rd">
                                                <label class="form-check-label" for="flexRadioDefault1">
                                                Femenino
                                                </label>
                                                
                                            </div>
                                            <div class="form-check col-md-4">
                                                <input class="form-check-input" type="radio" value="M" name="sexo" id="masculino-rd">
                                                <label class="form-check-label" for="flexRadioDefault2">
                                                    Masculino
                                                </label>
                                            </div>
                                            <div class="form-check col-md-4">
                                                <input class="form-check-input" type="radio" value="O" name="sexo" id="otros-rd">
                                                <label class="form-check-label" for="flexRadioDefault2">
                                                    Otros
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-3">
                                        <button class="btn mb-5" id="actualizar-usuario">Actualizar Datos</button>
                                    </div>
                                </div>
                                {{-- <h4>Cambiar Contraseña</h4>
                                <form action="{{ route('password.update') }}" method="POST">
                                    @csrf
                                    {{--<input type="hidden" name="token" value="{{ $request->route('token') }}">-
                                    <div class="row">
                                        <div class="col-md-12">
                                            <input class="form-control" id="email" type="text" name="email" required disabled value="{{Auth::user()->email}}">
                                        </div>
                                        <div class="col-md-6">
                                            <input class="form-control" id="password" type="password" name="password" required placeholder="Nueva Contraseña">
                                        </div>
                                        <div class="col-md-6">
                                            <input class="form-control" id="password_confirmation" type="password" required name="password_confirmation" placeholder="Confirmar Contraseña">
                                        </div>
                                        <div class="col-md-12 mb-5">
                                             <button class="btn">Guardar Cambios </button> 
                                            <x-button>
                                                {{ __('Guardar Cambios') }}
                                            </x-button>
                                        </div>
                                    </div>
                                </form> --}}
                                <h4>Elimine si cuenta</h4>
                                <form action="{{ route('password.update') }}" method="POST">
                                    @csrf
                                    
                                    <div class="row ms-2">
                                        <div class="col-12 col-md-6 col-lg-4">
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" role="switch" id="check-for-delete">
                                                <label class="form-check-label" for="flexSwitchCheckDefault">Habilite el boton Eliminar</label>
                                              </div>
                                        </div>
                                        <div class="col-12 col-md col-lg">
                                            <button class="btn btn-danger" disabled id="elim-cuenta-btn">Eliminar Cuenta</button>
                                        </div>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Termino de Mi Cuenta -->


@endsection
@section('javascript')
   <!-- Scripts de la pagina -->
<script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
<script src="vendor/tinymce/js/tinymce/tinymce.min.js"></script>
<script src="{{asset('js/servicios/publicacionesService.js')}}"></script>
<script src="{{asset('js/servicios/postulacionesService.js')}}"></script>
<script src="{{asset('js/servicios/zonasService.js')}}"></script>
<script src="{{asset('js/servicios/rubrosService.js')}}"></script>
<script src="{{asset('js/servicios/duracionesService.js')}}"></script>
<script src="{{asset('js/servicios/usuariosService.js')}}"></script>
<script src="{{asset('js/servicios/reclamosService.js')}}"></script>
<script src="{{asset('js/servicios/administradoresService.js')}}"></script>
<script src="{{asset('js/perfil_2.js')}}"></script>
<script src="{{asset('js/perfil.js')}}"></script>
@endsection
