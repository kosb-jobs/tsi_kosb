<?php

namespace App\Http\Controllers;
//AUN FALTAN COSAS
use Illuminate\Http\Request;
use App\Models\Publicacion;
use App\Models\Ofertante;
use App\Models\Postulacion;

class PublicacionesController extends Controller
{

    public function getPublicaciones(){
        $publicaciones = Publicacion::all();
        return $publicaciones;
    }
    public function getPublicacionesNull(){
        $publicaciones = Publicacion::where("estado",null)->get();
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
    public function filtroPublicacionUserAcep(Request $request){
        $input = $request->all();
        $filtro = $input["filtro"];

        $publicacion = Publicacion::where("cod_usuario",$filtro)->where("estado","!=",null)->get();
        return $publicacion;
    }
    public function filtroPublicacionId(Request $request){
        $input = $request->all();
        $filtro = $input["filtro"];
        //$publicacion = Publicacion::where("id",$filtro)->get();
        $publicacion = Publicacion::findOrFail($filtro);
        return $publicacion;
    }

    public function filtroPublicacionText(Request $request){
        $input = $request->all();
        $filtro = $input["filtro"];
        $publicaciones = Publicacion::where("titulo_publicacion","LIKE","%".$filtro."%")
        ->orWhere("descripcion","LIKE","%".$filtro."%")
        ->get();
        return $publicaciones;
    }
    public function filtroPublicacionSelectZona(Request $request){
        $input = $request->all();
        $filtro = $input["filtro"];
        $publicaciones = Publicacion::where("cod_zona",$filtro)->get();
        return $publicaciones;
    }

    public function filtroPublicacionSelectRubro(Request $request){
        $input = $request->all();
        $filtro = $input["filtro"];
        $publicaciones = Publicacion::where("cod_rubro",$filtro)->get();
        return $publicaciones;
    }
    public function filtroPublicacionSelectDuracion(Request $request){
        $input = $request->all();
        $filtro = $input["filtro"];
        $publicaciones = Publicacion::where("cod_rubro",$filtro)->get();
        return $publicaciones;
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

        $postulaciones = Postulacion::where("cod_publicacion",$cod_publicacion)->get();
        $publicacion = Publicacion::where("id",$cod_publicacion)->get()->first();
        if (count($postulaciones) == 0 and $publicacion->estado != 'FPP'){
            $ofertante_ = Ofertante::where("cod_usuario",$publicacion->cod_usuario)->get()->first();
            $ofertante_->publicaciones_activas = $ofertante_->publicaciones_activas == 0? 0: $ofertante_->publicaciones_activas - 1;
            $ofertante_->save();

            $publicacion->delete();
            return "ok";
        }elseif ($publicacion->estado == 'FPP') {
            return "La publicación no se puede eliminar si está en estado de trabajo o en proceso de finalización";
        } elseif( count($postulaciones) >= 1){
            $cantidad = count($postulaciones);
            return "La publicación no puede ser eliminada porque tiene $cantidad postulacion(es)";
        }
        
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

    public function cambiarEstadoPub(Request $request){
        $input = $request->all();
        $publicacion = Publicacion::findOrFail($input["id"]);
        $postulaciones = Postulacion::where('cod_publicacion',$input["id"])->where('aceptacion',1)->get();
        $mensaje;
        if(count($postulaciones) > 0){
            if ($input["estado"] == 'FPP') {
                $publicacion->estado = $input['estado'];
                $mensaje =  'Proceso de postulación finalizado correctamente';
            }else{
                $publicacion->estado = $input['estado'];
                $mensaje = 'Proceso de trabajo finalizado con exito';
            }

        }else {
            $mensaje = 'No Puedes cambiar de proceso si no hay postulaciones';
        }
        $publicacion->save();
        return $mensaje; 
    }
}
