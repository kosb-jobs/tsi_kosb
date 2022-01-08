<?php

namespace App\Http\Controllers;
use Illuminate\Database\Eloquent\Builder;
//FALTANTE
use App\Models\Postulacion;
use App\Models\Publicacion;
use Illuminate\Http\Request;

class PostulacionesController extends Controller
{
    public function getPostulaciones(){
        $postulaciones=Postulacion::all();

        return $postulaciones;
    }
    
    public function crearPostulacion(Request $request){
        $input = $request->all();
        $existe = Postulacion::where("cod_usuario",$input["cod_usuario"])->get();
        $encontrado = false;
        for ($i=0; $i < count($existe); $i++) { 
            if($existe[$i]["cod_usuario"] == $input["cod_usuario"] && $existe[$i]["cod_publicacion"] == $input["cod_publicacion"]){
                $encontrado = true;
            }
        }
        $pertenece = false;
        $publicacion = Publicacion::where("id",$input["cod_publicacion"])->get();
        if($publicacion[0]["cod_usuario"] == $input["cod_usuario"]){
            $pertenece = true;
        }

        if ($encontrado == false && $pertenece == false) {
            $postulacion = new Postulacion();
            $postulacion->cod_publicacion=$input["cod_publicacion"];
            $postulacion->cod_usuario=$input["cod_usuario"];
            $postulacion->aceptacion=$input["aceptacion"];
            $postulacion->fecha_postulacion=$input["fecha_postulacion"];
            $postulacion->save();
            return $postulacion;
        }
        if ($pertenece == true) {
            return "El usuario es creador de la publicación";
        }
        return $encontrado;
    }

    // public function getPostulacionPorId(Request $request){
    //     $input = $request->all();
    //     $id = $input["id"];
    //     $postulacion = Postulacion::findOrFail($id);
    //     return $postulacion;
    // }
    public function getPostulacionPorUser(Request $request){
        $input = $request->all();
        $cod = $input["cod_usuario"];
        $postulaciones = Postulacion::where("cod_usuario",$cod)->get();
        return $postulaciones;
    }

    public function getPostulAceptPorPub(Request $request){
        $input = $request->all();
        $cod = $input["cod_publicacion"];
        $postulaciones = Postulacion::where("cod_publicacion",$cod)->where('aceptacion',1)->get();
        // $post = array();
        // for ($i=0; $i < $postulaciones.length; $i++) { 
        //     if ($postulaciones[$i]["aceptacion"] == 1) {
        //         $post.array_push($postulaciones[$i]);
        //     }
        // }
        return $postulaciones;
    }

    public function getPostPorPublicacion(Request $request){
        $input = $request->all();
        $cod_publicacion = $input["cod_publicacion"];
        $postulaciones = Postulacion::where("cod_publicacion",$cod_publicacion)->get();
        return $postulaciones;
    }

    public function editarPostulacion(Request $request){
        $input = $request->all();
        $postulacion = Postulacion::findOrFail($input['id']);
        $postulacion->aceptacion=$input["aceptacion"];
        $postulacion->save();
        return $postulacion;
    }

    public function eliminarPostulacion(Request $request){
        $input = $request->all();
        $reclamo = Postulacion::where("id",$input["id"])->delete();
        //$reclamo->delete();
        return "ok";
    }
}
