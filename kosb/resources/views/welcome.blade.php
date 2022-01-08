<html>
<head>

    <meta name="home" content="width=devide-width, initial-scale=1.0">
    <title>Home KOSBY</title>

    <link rel="stylesheet" href="{{asset('css/css_home.css')}}">

</head>

<body> 

<div class="container_home">
     
    <div class="row">
        <div class="col"> 
            <h1>KOSB</h1>
            <p>Bienvenidos</p>
            <button type="button" id="explora-btn" class="boton-algo">Explorar</button>
            @auth
                <button type="button" id="btn-perfil" class="boton-algo">Vea Su perfil</button>
            @else 
                <button type="button" id="btn-perfil" class="boton-algo">Inicie sesión o cree su perfil</button>
            @endauth
            
        </div>

        <hr width="1" size="500">

    <div class="container_slider">
        <ul class="slider">
            <li id="slide1">
                <h1>Encuentra</h1>
            </li>
            <li id="slide2">
                <h1>Publica</h1>
            </li>

            <li id="slide3">
                <h1>Trabaja</h1>
            </li>

        </ul>

        <ul class="menu">

            <li>
                <a href="#slide1" class="boton-algo" style="background: #fff; color:gray">1</a>
                <a href="#slide2" class="boton-algo" style="background: #fff; color:gray">2</a>
                <a href="#slide3" class="boton-algo" style="background: #fff; color:gray">3</a>
            </li>
        </ul>





    </div>
    
    
    </div>


</div>



<script>
    document.querySelector('#explora-btn').addEventListener('click', ()=>{
        window.location.href = "/kosb/public/buscar_trabajo";
    });
    document.querySelector('#btn-perfil').addEventListener('click', ()=>{
        let btn_perfil = document.querySelector('#btn-perfil');
        if (btn_perfil.innerText == 'Vea Su perfil') {
            window.location.href = "/kosb/public/perfil";
        } else {
            window.location.href = "/kosb/public/crear_perfil";
        }
        
    });
</script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>


</body>



</html>
