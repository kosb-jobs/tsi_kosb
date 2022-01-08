@extends('admin_home')

@section('contenido_admin')


<!-- Cards -->

<div class="cardBox">
    <div class="card">               
    <div>
        <div class="numbers" id="cant-public"></div>
        <div class="cardName">Publicaciones Totales</div>                   
    </div>
    <div class="iconBx">
       <ion-icon name="eye-outline"></ion-icon>
    </div>
   </div>  

    <div class="card">
    <div>
        <div class="numbers" id="cant-usuarios"></div>
        <div class="cardName">Total de Usuarios</div>                   
    </div>
    <div class="iconBx">
       <ion-icon name="people-circle-outline"></ion-icon>
    </div>
   </div>

    <div class="card">
    <div>
        <div class="numbers" id="reclamos-sin-R"></div>
        <div class="cardName">Reclamos sin Respuesta</div>                   
    </div>
    <div class="iconBx">
       <ion-icon name="document-text-outline"></ion-icon>
    </div>
   </div>


</div>
@endsection

@section('js')
<script src="{{asset('js/servicios/usuariosService.js')}}"></script>
<script src="{{asset('js/servicios/reclamosService.js')}}"></script>
<script src="{{asset('js/servicios/publicacionesService.js')}}"></script>
<script src="{{asset('js/cargar_admin_home.js')}}"></script>
@endsection
