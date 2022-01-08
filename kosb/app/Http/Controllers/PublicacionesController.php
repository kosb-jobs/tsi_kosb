<?php

namespace App\Http\Controllers;
//AUN FALTAN COSAS
use Illuminate\Http\Request;
use App\Models\Publicacion;
use App\Models\Ofertante;

class PublicacionesController extends Controller
{

    public function getPublicaciones(){
        $publicaciones = Publicacion::all();
        return $publicaciones;
    }
    public function crearPublicacion(Request $request){
        $input = $request->all();
        $publicacion = new Publicacion();
        $publicacion->titulo_publicacion=$input["titulo_publicacion"];
        $publicacion->cod_rubro=$input["cod_rubro"];
        $publicacion->fecha_ini=$input["fecha_ini"];
        $publicacion->fecha_fin=$input["fecha_fin"];
        $publicacion->fecha_publicada=$input["fecha_publicada"];
        $publicacion->cod_duracion=$input["cod_duracion"];
        $publicacion->cod_zona=$input["cod_zona"];
        $publicacion->descripcion=$input["descripcion"];
        $publicacion->tipo_oferta=$input["tipo_oferta"];
        $publicacion->cod_usuario=$input["cod_usuario"];

        $publicacion->save();
        return $publicacion;

    }
    public function filtroPublicacionUser(Request $request){
        $input = $request->all();
        $filtro = $input["filtro"];
        $publicacion = Publicacion::where("cod_usuario",$filtro)->get();
        return $publicacion;
    }
    public function filtroPublicacionId(Request $request){
        $input = $request->all();
        $filtro = $input["filtro"];
        //$publicacion = Publicacion::where("id",$filtro)->get();
        $publicacion = Publicacion::findOrFail($filtro);
        return $publicacion;
    }

    public function filtroPublicacionTipo(Request $request){
        $input = $request->all();
        $filtro = $input["tipo"];
        $publicaciones = Publicacion::where('tipo_oferta',$filtro)->get();
        return $publicaciones;
    }

    public function eliminarPublicacion(Request $request){
        $input = $request->all();
        $cod_publicacion = $input["id"];


        $publicacion = Publicacion::where("id",$cod_publicacion)->get()->first();

        $ofertante_ = Ofertante::where("cod_usuario",$publicacion->cod_usuario)->get()->first();
        $ofertante_->publicaciones_activas = $ofertante_->publicaciones_activas - 1;
        $ofertante_->save();


        $publicacion->delete();
        return "ok";
        
    }


    public function actualizarPublicacion(Request $request){
        $input = $request->all();
        $publicacion = Publicacion::findOrFail($input["id"]);
        $publicacion->titulo_publicacion=$input["titulo"];
        $publicacion->cod_zona=$input["cod_zona"];
        $publicacion->cod_rubro=$input["cod_rubro"];
        $publicacion->fecha_ini=$input["fecha_ini"];
        $publicacion->cod_duracion=$input["cod_duracion"];
        $publicacion->fecha_fin = $input["fecha_fin"];
        $publicacion->fecha_publicada = $input["fecha_publicada"];
        $publicacion->descripcion = $input["descripcion"];
        $publicacion->tipo_oferta = $input["tipo_oferta"];
        $publicacion->cod_usuario = $input["cod_usuario"];
        $publicacion->save();
        return $publicacion; 
    }
}
