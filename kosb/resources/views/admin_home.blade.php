<!DOCTYPE html>
<html> 

<head>
    <meta charset="utf-8">
    <meta name="vista_admin" content="width=devide-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{csrf_token()}}">
    <title>Administrador</title>
    
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" type="text/css" href="{{asset('css/admin_home.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('css/app.css')}}">
    <link rel="stylesheet" type="text/css" href="{{asset('css/components_style.css')}}">
    

     <!-- Pagina de estilos css -->


    <!-- Cambiar ref de css -->
    
</head>

<body>
    <input type="text" id="cod_admin_log" style="display: none" name="{{Auth::user()->id}}">
    <div class="container" > <!-- Container de la barra lateral  -->
        <div class="navigation" >
            <ul>
                <li>
                    <a href="#">
                        <span class="icon"><ion-icon name="balloon-outline"></ion-icon></span>
                        <span class="title">{{Auth::user()->name}}</span>
                    </a>
                </li>
                <li>
                    <a href="{{route('home')}}">
                        <span class="icon"><ion-icon name="home-outline"></ion-icon></span>
                        <span class="title">Home</span>
                    </a>
                </li>                
                <li>
                    <a href="{{route('tabla_usuario_admin')}}">
                        <span class="icon"><ion-icon name="people-outline"></ion-icon></span>
                        <span class="title">Usuarios</span>
                    </a>
                </li>                
                <li>
                    <a href="{{asset('admin_reclamos')}}">
                        <span class="icon"><ion-icon name="chatbox-outline"></ion-icon></span>
                        <span class="title">Reclamos</span>
                    </a>
                </li>                
                <li>
                    <a href="{{asset('zonas')}}">
                        <span class="icon"><ion-icon name="cafe-outline"></ion-icon></span>
                        <span class="title">Moderar</span>
                    </a>
                </li>
                <li>
                    <a href="{{asset('crear_admin')}}">
                        <span class="icon"><ion-icon name="extension-puzzle-outline"></ion-icon></span>
                        <span class="title">Crear</span>
                    </a>
                </li>
                
                <li>
                    <a href="{{asset('perfil')}}">
                        <span class="icon"><ion-icon name="log-out-outline"></ion-icon></span>
                        <span class="title">Cerrar Vista</span>
                    </a>
                </li>
            </ul>            
        </div>

         <!-- Main // Aqui ira toda la informacion-->

         <div class="main">
             
             
            <div class="topbar">
                <div class="toggle">
                   <ion-icon name="grid-outline"></ion-icon>  
                </div>                
                
            </div>


             <!-- Aqui puede ir las otras vistas con su informacion -->
            <div>
                
             @yield("contenido_admin")

             </div>



         </div>

    </div>

    <!-- Scripts de la pagina -->
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script src="https://cdn.tiny.cloud/1/no-api-key/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>
    <script>tinymce.init({selector:'textarea'});</script>
    <!-- Scripts para el menu toggle -->
    <script>
        let toggle = document.querySelector('.toggle');
        let navigation = document.querySelector('.navigation');
        let main = document.querySelector('.main');

        toggle.onclick = function(){
            navigation.classList.toggle('active');
            main.classList.toggle('active');
        }


    </script>

    <!-- Scripts dpara la seleccion del menu lateral -->
    <script>
        let list = document.querySelectorAll('.navigation li');
        function activeLink(){
            list.forEach((item) =>
            item.classList.remove('hovered'));
            this.classList.add('hovered');            
        }
        list.forEach((item) =>
        item.addEventListener('mouseover',activeLink));
    </script>
    <script src="{{asset('js/axios_config.js')}}"></script>
    @yield("js") 
    
    


</body>


</html>