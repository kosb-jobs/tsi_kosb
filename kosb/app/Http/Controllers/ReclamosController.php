<?php

namespace App\Http\Controllers;
//FALTANTE
use App\Models\Reclamo;
use Illuminate\Http\Request;

class ReclamosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getReclamos(){
        $reclamo=Reclamo::all();

        return $reclamo;
    }
    
    public function crearReclamo(Request $request){
        $input = $request->all();
        $reclamo = new Reclamo();
        $reclamo->titulo_reclamo=$input["titulo_reclamo"];
        $reclamo->cod_usuario=$input["cod_usuario"];
        $reclamo->fecha_reclamo = $input["fecha_reclamo"];
        $reclamo->descripcion_reclamo=$input["descripcion_reclamo"];
        $reclamo->tipo_reclamo=$input["tipo_reclamo"];
        // $reclamo->fecha_respuesta=$input["fecha_respuesta"];
        // $reclamo->contenido_respuesta=$input["contenido_respuesta"];
        // $reclamo->cod_admin=$input["cod_admin"];
        $reclamo->save();
        return $reclamo;
    }

    public function getReclamoPorId(Request $request){
        $input = $request->all();
        $id = $input["id"];
        $reclamo = Reclamo::findOrFail($id);
        return $reclamo;
    }

    public function getReclamoSinR(){
        $reclamo = Reclamo::where("contenido_respuesta",null)->get();
        return $reclamo;
    }

    public function getReclamosPorUsuario(Request $request){
        $input = $request->all();
        $cod_usuario = $input["filtro"];
        $reclamo = Reclamo::where("cod_usuario",$cod_usuario)->get();
        return $reclamo;
    }

    public function actualizarReclamo(Request $request){
        $input = $request->all();
        $reclamo = Reclamo::findOrFail($input["id"]);
        // $reclamo->titulo_reclamo=$input["titulo_reclamo"];
        // $reclamo->cod_usuario=$input["cod_usuario"];
        // $reclamo->fecha_reclamo=$input["fecha_reclamo"];
        // $reclamo->descripcion_reclamo=$input["descripcion_reclamo"];
        // $reclamo->tipo_reclamo=$input["tipo_reclamo"];
        $reclamo->fecha_respuesta=$input["fecha_respuesta"];
        $reclamo->contenido_respuesta=$input["contenido_respuesta"];
        $reclamo->cod_admin=$input["cod_admin"];

        $reclamo->save();
        return $reclamo;
    }

    public function eliminarReclamo(Request $request){
        $input = $request->all();
        $reclamo = Reclamo::findOrFail($input["id"]);
        $reclamo->delete();
        return "ok";
    }
}
