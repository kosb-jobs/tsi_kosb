<?php

namespace App\Http\Controllers;
use Illuminate\Database\Eloquent\Builder;
//FALTANTE
use App\Models\Postulacion;
use App\Models\Publicacion;
use App\Models\Trabajador;
use App\Models\User;
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
            $trabajador = Trabajador::where("cod_usuario", $input['cod_usuario'])->get()->first();
            $trabajador->postulaciones_realizadas_tot += 1;
            $trabajador->postulaciones_activas += 1;
            $postulacion = new Postulacion();
            $postulacion->cod_publicacion=$input["cod_publicacion"];
            $postulacion->cod_usuario=$input["cod_usuario"];
            $postulacion->aceptacion=$input["aceptacion"];
            $postulacion->fecha_postulacion=$input["fecha_postulacion"];
            $postulacion->save();
            $trabajador->save();
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

    public function getPostulAceptPorUser(Request $request){
        $input = $request->all();
        $cod = $input["cod_usuario"];
        
        $postulaciones = Postulacion::where("cod_usuario",$cod)->where("aceptacion",1)->get();
        //$puntuacion = Puntuacion::where();
        return $postulaciones;
    }

    public function getPostulPorIdConUser(Request $request){
        $input = $request->all();
        $id = $input["id"];
        $postulacion = Postulacion::findOrFail($id);
        $publicacion = Publicacion::findOrFail($postulacion->cod_publicacion);
        $usuario = User::findOrFail($publicacion->cod_usuario);
        $lista = ["postulacion"=>$postulacion,"publicacion"=>$publicacion,"usuario_creador"=>$usuario];
        return $lista;
    }

    public function getPostulAceptPorPub(Request $request){
        $input = $request->all();
        $cod = $input["cod_publicacion"];
        $postulaciones = Postulacion::where("cod_publicacion",$cod)->where('aceptacion',1)->get();
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
        $trabajador = Trabajador::where("cod_usuario",$postulacion->cod_usuario);
        if($input["aceptacion"] == 0){
            if ($trabajador->postulaciones_activas > 0) {
                $trabajador->postulaciones_activas -=1;
            }else{
                $trabajador->postulaciones_activas = 0;
            }
        }
        $postulacion->save();
        return $postulacion;
    }

    public function eliminarPostulacion(Request $request){
        $input = $request->all();
        $postulacion = Postulacion::where("id",$input["id"])->get()->first();
        if ($postulacion->aceptacion == 1){
            return "La eliminación no puede realizarse una vez que la postulación fue aceptada";
        }else{
            $postulacion->delete();
            return "ok";
        }
        
    }
}
