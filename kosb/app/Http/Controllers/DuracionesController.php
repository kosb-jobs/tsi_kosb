<?php

namespace App\Http\Controllers;
//DURACIONES FINALIZADOS
use Illuminate\Http\Request;
use App\Models\Duracion;
use App\Models\Administrador;

class DuracionesController extends Controller
{
    public function getDuraciones(){
        $duracion=Duracion::all();

        return $duracion;
    }
    public function crearDuracion(Request $request){
        $input = $request->all();
        $admin = Administrador::where("cod_usuario", $input["cod_admin"])->get()->first();
        $duracion = new Duracion();
        $duracion->titulo_duracion=$input["titulo_duracion"];
        $duracion->cod_admin=$admin->id;
        $duracion->fecha_edicion=$input["fecha_edicion"];

        $duracion->save();
        return $duracion;

    }
    public function getDuracionPorId(Request $request){
        $input = $request->all();
        $id = $input["id"];
        $duracion = Duracion::findOrFail($id);
        return $duracion;
    }

    public function getDuracionPorNombre(Request $request){
        $input = $request->all();
        $titulo_duracion = $input["titulo_duracion"];
        $duracion = Duracion::where("titulo_duracion",$titulo_duracion)->get();
        return $duracion;
    }

    public function actualizarDuracion(Request $request){
        $input = $request->all();
        $duracion = Duracion::findOrFail($input["id"]);
        $duracion->titulo_duracion=$input["titulo_duracion"];
        $duracion->cod_admin=$input["cod_admin"];
        $duracion->fecha_edicion=$input["fecha_edicion"];

        $duracion->save();
        return $duracion;
    }

    public function eliminarDuracion(Request $request){
        $input = $request->all();
        $duracion = Duracion::findOrFail( $input["id"]);
        $duracion->delete();
        return "ok";
        
    }
}
