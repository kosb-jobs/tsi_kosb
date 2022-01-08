<?php

namespace App\Http\Controllers;
//FALTANTE
use App\Models\Puntuacion;
use Illuminate\Http\Request;

class PuntuacionesController extends Controller
{
    public function getPuntuaciones(){
        $puntuaciones=Puntuacion::all();

        return $puntuaciones;
    }
    
    public function crearPuntuacion(Request $request){
        $input = $request->all();
        $puntuacion = new Puntuacion();
        $puntuacion->id_user=$input["id_user"];
        $puntuacion->id_publicaciones=$input["id_publicaciones"];
        $puntuacion->id_postulaciones=$input["id_postulaciones"];
        $puntuacion->puntuacion=$input["puntuacion"];
        $puntuacion->comentario=$input["comentario"];
        $puntuacion->save();
        return $puntuacion;
    }

    public function getPuntuacionPorId(Request $request){
        $input = $request->all();
        $id = $input["id"];
        $puntuacion = Puntuacion::findOrFail($id);
        return $puntuacion;
    }

    public function getPuntuacionPorPublicacion(Request $request){
        $input = $request->all();
        $cod_publicacion = $input["cod_publicacion"];
        $puntuacion = Puntuacion::where("cod_publicacion",$cod_publicacion)->get();
        return $puntuacion;
    }

    public function eliminarPuntuacion(Request $request){
        $input = $request->all();
        $puntuacion = Puntuacion::findOrFail( $input["id"]);
        $puntuacion->delete();
        return "ok";
    }
}
