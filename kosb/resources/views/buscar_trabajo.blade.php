@extends('layouts.master')


@section("contenido")


<!-- Barra de al lado para filtrar directo -->
<input type="text" class="form-control d-none" id="id_publicacion"> 
<!-- Bottom Bar Start -->
<div class="bottom-bar">
	<div class="container-fluid">
		<div class="row align-items-center">
			<div class="col-md-3">
			</div>
			<div class="col-md-6">
				<div class="search">
					<input type="text" id="search-txt" placeholder="Buscar">
					<button id="search-btn"><i class="fa fa-search"></i></button>
				</div>
			</div>
			<div class="col-md-3">
				<!-- Botonsito Corazon Para Me Gusta
				<div class="user">
					<a href="{{route('crear_perfil')}}" class="btn perfil">
						<i class="fa fa-heart"></i>
						<span>(0)</span>
					</a>
				</div> -->
			</div>
		</div>
	</div>
</div>
<!-- --> 



<div class="row mb-5">
	<div class="col-12 col-md-6 col-lg-4 mb-3">
		<div class="header">
			<div class="container-fluid">
				<nav class="navbar bg-light">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link" href="{{route('buscar_trabajo')}}"><i class="fa fa-home"></i>Todas Las Publicaciones</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" id="t-esporadicos" href="#"><i class="fa fa-esporadico"></i>Trabajos Esporadicos</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" id="t-corto-plazo" href="#"><i class="fa fa-corto"></i>Trabajos Corto Plazo</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" id="t-largo-plazo" href="#"><i class="fa fa-largo"></i>Trabajos Largo Plazo</a>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</div>

	<div class="col-12 col-md-6 col-lg-8">
		<div id="contenedor-vista" class="contenedor" style="border: grey; border-radius: 2px; max-height: 400px; width: 20cm;background:#f2efea;">
		</div>
		<div id="container-publicacion" class="d-none mb-5">
			<div class="col-12 col-md col-lg">
				<div class="card shadow-lg mt-2">
				<!-- Boton Ver Ofertante -->
					<div class="ver_ofertante">
						<button type="button" id="ver_ofertante" class="btn btn-outline-secondary float-right" style="padding: 5px; margin: 10px;">Ver Ofertante</button>
					</div>
				  <div class="card-body" style="height: 500px">
					<div class="contenedor" style="max-height: 460px; width: auto;">
					  <div class="mt-2">
						<h3 class="text-start ms-3"><u id="tit-pub">Título de la publicación</u></h3>
					  </div>
					  
					  <p class="text-end pe-5" ><u>Rubro:</u> <i id="tip-emp"></i></p>
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
				  <div class="card-footer row" id="div-footer-postular">
					<div class="col-12 col-md-6 col-lg-6 text-center">
						@auth
							<button class="btn btn-info text-ligth" id="reclamo-btn" name="{{Auth::user()->id}}">Crear reclamo <ion-icon name="thumbs-down-outline" style="height: 12px;width: 25px"></ion-icon></button>
						@else
							<button class="btn btn-info text-ligth" id="reclamo-btn" name="no-logueado"><ion-icon name="thumbs-down-outline" style="width: 100px"></ion-icon><p class="font-monospace">Crear reclamo</p></button>
						@endauth
					</div>
					<div class="col-12 col-md col-lg text-center">
						@auth
						<button class="btn text-ligth" id="postular-btn" name="{{Auth::user()->id}}" style="background-color: #FF6F61; color:#fff"><ion-icon name="person-add-outline"></ion-icon>Postular a la publicación</button>
						@else
							<button class="btn text-ligth" id="postular-btn" name="no-logueado" style="background-color: #FF6F61; color:#fff"><ion-icon name="person-add-outline"></ion-icon>Postular a la publicación</button>

						@endauth
					</div>
					
				  </div>
				</div>
			</div>
		</div>
		<div class="card d-none" id="form-reclamos" style="border-color: #ffb0a8">
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
					  <label for="" class="form-label">Descripción</label>
					  <textarea  id="descripcion-txt" class=""></textarea>
				  </div>
			</div>
			<div class="card-footer text-end" style="border-color: #ffb0a8;background: #fff0ee">
				<button class="btn btn-info" id="ingresar-reclamo-btn" style="color: #fff">Crear Reclamo <ion-icon name="pencil-outline"></ion-icon></button>
			</div>
		</div>
	</div>
</div>





@endsection



@section("javascript")
<script src="vendor/tinymce/js/tinymce/tinymce.min.js"></script>
<script src="{{asset('js/servicios/publicacionesService.js')}}"></script>
<script src="{{asset('js/servicios/postulacionesService.js')}}"></script>
<script src="{{asset('js/servicios/zonasService.js')}}"></script>
<script src="{{asset('js/servicios/rubrosService.js')}}"></script>
<script src="{{asset('js/servicios/duracionesService.js')}}"></script>
<script src="{{asset('js/servicios/reclamosService.js')}}"></script>
<script src="{{asset('js/servicios/usuariosService.js')}}"></script>
<script src="{{asset('js/publicacion.js')}}"></script>


@endsection

