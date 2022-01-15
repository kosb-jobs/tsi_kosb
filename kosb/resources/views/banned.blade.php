@extends('layouts.banned_navigation')
@section("contenido")  
    
    
    <div class="bg-white w-auto h-auto shadow-lg shadow-red-500 p-8 m-4 flex flex-col rounded justify-center items-center">
        <span class="text-4xl font-semibold">Cuenta Suspendida</span>
        <span>Tu cuenta a sido suspendida. Crea un reclamos si lo deseas</span>
        <a href="reclamos_suspendido">Crear reclamo</a>
    </div>

@endsection
