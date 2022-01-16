<!doctype html>


<html lang="es">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{csrf_token()}}"> 
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="eCommerce HTML Template Free Download" name="keywords">
    <meta content="eCommerce HTML Template Free Download" name="description">

    <!-- Bootstrap CSS -->
    <link rel="canonical" href="https://getbootstrap.com/docs/5.1/components/navbar/">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
    <link rel="stylesheet" href="{{asset('css/stylelogin.css')}}">
    <link rel="stylesheet" href="{{asset('css/stylebuscar.css')}}">
    <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">

    <!-- Favicon -->
    <link href="img/favicon.ico" rel="icon">
    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">

    
    <!-- Google  -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400|Source+Code+Pro:700,900&display=swap" rel="stylesheet">

    <!-- CSS Libraries -->
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    
    <!-- Template Stylesheet -->
    <link rel="stylesheet" href="{{asset('css/style.css')}}">
    <link rel="stylesheet" href="{{asset('css/components_style.css')}}">


    
    
    <title>KOSB Trabajos</title>

  </head>


<!--#DDCAD9-->
  <body style="background: #f2efea">


    <header><!-- Nav Bar-->
        <div class="top-bar"></div>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-6">
                        <i class="fa fa-envelope"></i>
                        kosb@gmail.com
                    </div>
                    <div class="col-sm-6">
                        <i class="fa fa-phone-alt"></i>
                        +56986439424
                    </div>
                </div>
            </div>
        </div>
        

        <nav x-data="{ open: false }" class="navbar navbar-expand-lg navbar-light" style="background: #00ADB5;">
            <div class="flex container-fluid">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <a class="navbar-brand" href="{{route('welcome')}}" style="color: #02475E;">KOSB</a>
              <div class="flex collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link active text-light" aria-current="page" href="{{route('welcome')}}">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link text-light" href="{{route('buscar_trabajo')}}">Buscar Trabajo</a>
                        </li>
                        @auth
                            <li class="nav-item">
                                <a class="nav-link text-light"  href="{{route('crear_publicacion')}}">Crear Publicación</a>
                            </li>
                        @endauth
                        
                        <li class="nav-item">
                            @auth
                                <a class="nav-link text-light" href="{{route('perfil')}}">Perfil</a>
                            @else
                                <a class="nav-link text-light" href="{{route('crear_perfil')}}">Perfil</a>
                            @endauth

                        </li>
                        @auth
                            <li class="nav-item">
                                <a class="nav-link text-light"  href="{{route('postulaciones_pub')}}">Publicaciones en proceso</a>
                            </li>
                        @endauth
                        </ul>
                </ul>

                <!-- Primer Boton -->

                

                <x-dropdown align="right" class="dropdown dropdown-toggle" width="52">
                    <x-slot name="trigger">
                        <button class="btn btn-bd-light dropdown-toggle" id="bd-versions" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static" >
                        @auth
                            <span class="d-none d-lg-inline">{{ Auth::user()->name }}</span>
                        @else
                            <span class="d-none d-lg-inline">Bienvenido</span>
                        @endauth

                           
                        </button>
                    </x-slot>

                    <x-slot name="content">
                        
                        <!-- Authentication -->
                        @auth
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
    
                                <x-dropdown-link :href="route('logout')"
                                        onclick="event.preventDefault();
                                                    this.closest('form').submit();">
                                    {{ __('Cierre Sesión') }}
                                </x-dropdown-link>
                            </form>
                        @else
                            <x-dropdown-link :href="route('crear_perfil')">
                                {{ __('Inicie Sesión o Regístrese') }}
                            </x-dropdown-link>
                        @endauth
                        
                    </x-slot>
                </x-dropdown>
                
              </div>
            </div>
            
          




    </header>


    <!-- Main -->
    
    <main class="container-fluid" id="main-master">
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
		</nav>
		<nav aria-label="breadcrumb">
		<ol class="breadcrumb">
			<li class="breadcrumb-item"><a  href="{{route('welcome')}}">Home</a></li>              
			<li class="breadcrumb-item active" aria-current="page" id="bc_id_active"><a id="id_active_a"  href="#"></a></li>
			<li class="breadcrumb-item active" aria-current="page" id="bc_perfil"></li>
			
		</ol>
		</nav>


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

    </main>

    <!-- Footer -->

    <footer id="footer-main">
        <div class="footer background-dark bottom-0">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-widget" >
                            <h2  class="contact-info">Contáctanos</h2>
                            <div class="contact-info">
                                <p><i class="fa fa-map-marker"></i>Dirección</p>
                                <p><i class="fa fa-envelope"></i>soporte.buscartrabajo@email.com</p>
                                <p><i class="fa fa-phone"></i>+56986439424</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-widget" >
                            <h2>Redes Sociales</h2>
                            <div class="contact-info">
                                <div class="social">
                                    <a href=""><i class="fab fa-twitter"></i></a>
                                    <a href=""><i class="fab fa-facebook-f"></i></a>
                                    <a href=""><i class="fab fa-linkedin-in"></i></a>
                                    <a href=""><i class="fab fa-instagram"></i></a>
                                    <a href=""><i class="fab fa-youtube"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
            
                    <div class="col-lg-3 col-md-6">
                        <div class="footer-widget">
                            <h2 >Información De La Compañía</h2>
                            <ul>
                                <li><a href="#">Sobre Nosotros</a></li>
                                <li><a href="#">Política De Privacidad</a></li>
                                <li><a href="#">Términos Y Condiciones</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
        


    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="{{asset('js/axios_config.js')}}"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://unpkg.com/@popperjs/core@2.10.2/dist/umd/popper.min.js"></script>

     <!-- Iconos -->
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <!-- Scripts -->
    
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{asset('js/breadcrum.js')}}"></script>
	<script src="vendor/tinymce/js/tinymce/tinymce.min.js"></script>
	<script src="{{asset('js/servicios/publicacionesService.js')}}"></script>
	<script src="{{asset('js/servicios/postulacionesService.js')}}"></script>
	<script src="{{asset('js/servicios/zonasService.js')}}"></script>
	<script src="{{asset('js/servicios/rubrosService.js')}}"></script>
	<script src="{{asset('js/servicios/duracionesService.js')}}"></script>
	<script src="{{asset('js/servicios/reclamosService.js')}}"></script>
	<script src="{{asset('js/servicios/usuariosService.js')}}"></script>
	<script src="{{asset('js/publicacion.js')}}"></script>

    </body>



</html>

