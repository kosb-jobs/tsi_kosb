<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Administrador;
class AdministradoresController extends Controller
{
    public function getAdministradores(){
        $administradores = Administrador::all();
        return $administradores;
    }

    public function verAdmin(Request $request){
        $input = $request->all();
        $administrador = Administrador::where('cod_usuario',$input['id'])->get();
        return $administrador;
    }

    public function crearAdmin(Request $request){
        $input = $request->all();
        $administrador = new Administrador();
        
        $administrador->cod_usuario = $input['cod_usuario'];
        $administrador->tipo_admin = $input['tipo_admin'];
        $administrador->save();
        return $administrador;
    }

    public function eliminarAdministrador(Request $request){
        $input = $request->all();
        $administrador = Administrador::findOrFail($input['id']);
        $administrador->delete();
        return 'ok';
    }
}
