<?php

namespace App\Http\Controllers;
//A REVISAR 
use Illuminate\Http\Request;
use App\Models\Rubro;

class RubrosController extends Controller
{
    public function getRubros(){
        $rubros=Rubro::all();

        return $rubros;
    }
    
    public function crearRubro(Request $request){
        $input = $request->all();
        $rubro = new Rubro();
        $rubro->nom_rubro=$input["nom_rubro"];
        $rubro->cod_admin=$input["cod_admin"];
        $rubro->fecha_edicion=$input["fecha_edicion"];

        $rubro->save();
        return $rubro;

    }

    public function getRubroPorId(Request $request){
        $input = $request->all();
        $id = $input["id"];
        $rubro = Rubro::findOrFail($id);
        return $rubro;
    }

    public function getRubroPorNombre(Request $request){
        $input = $request->all();
        $nom_rubro = $input["nom_rubro"];
        $rubro = Rubro::where("nom_rubro",$nom_rubro)->get();
        return $rubro;
    }

    public function actualizarRubro(Request $request){
        $input = $request->all();
        $rubro = Rubro::findOrFail($input["id"]);
        $rubro->nom_rubro=$input["nom_rubro"];
        $rubro->cod_admin=$input["cod_admin"];
        $rubro->fecha_edicion=$input["fecha_edicion"];

        $rubro->save();
        return $rubro;
    }

    public function eliminarRubro(Request $request){
        $input = $request->all();
        $rubro = Rubro::findOrFail($input["id"]);
        $rubro->delete();
        return "ok";
        
    }
}
