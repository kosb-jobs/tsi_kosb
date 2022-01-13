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
            
          </nav>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a  href="{{route('welcome')}}">Home</a></li>              
              <li class="breadcrumb-item active" aria-current="page" id="bc_id_active"><a id="id_active_a"  href="#"></a></li>
              <li class="breadcrumb-item active" aria-current="page" id="bc_perfil"></li>
              
            </ol>
          </nav>




    </header>


    <!-- Main -->
    
    <main class="container-fluid" id="main-master">

        @yield("contenido")

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
    @yield("javascript")

    </body>



</html>