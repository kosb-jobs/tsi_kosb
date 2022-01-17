<?php

namespace App\Http\Controllers;
//A REVISAR
use Illuminate\Http\Request;
use App\Models\Zona;
use App\Models\Administrador;

class ZonasController extends Controller
{
    public function getZonas(){
        $zonas=Zona::all();

        return $zonas;
    }

    public function crearZona(Request $request){
        $input = $request->all();
        $admin = Administrador::where("cod_usuario", $input["cod_admin"])->get()->first();
        $zona = new Zona();
        $zona->nom_zona=$input["nom_zona"];
        $zona->cod_admin=$admin->id;
        $zona->fecha_edicion=$input["fecha_edicion"];

        $zona->save();
        return $zona;

    }
    public function getZonaPorId(Request $request){
        $input = $request->all();
        $id = $input["id"];
        $zona = Zona::findOrFail($id);
        return $zona;
    }

    public function getZonaPorNombre(Request $request){
        $input = $request->all();
        $nom_zona = $input["nom_zona"];
        $zona = Zona::where("nom_zona",$nom_zona)->get();
        return $zona;
    }
    

    public function actualizarZona(Request $request){
        $input = $request->all();
        $zona = Zona::findOrFail($input["id"]);
        $zona->nom_zona=$input["nom_zona"];
        $zona->cod_admin=$input["cod_admin"];
        $zona->fecha_edicion=$input["fecha_edicion"];

        $zona->save();
        return $zona;
    }

    public function eliminarZona(Request $request){
        $input = $request->all();
        $zona = Zona::findOrFail($input["id"]);
        $zona->delete();
        return "ok";
    }
    

}
