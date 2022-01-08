<?php

namespace App\Http\Controllers;
//FALTANTE
use App\Models\Suspension;
use App\Models\User;
use Illuminate\Http\Request;

class SuspensionesController extends Controller
{
    public function desactivarUsuario(Integer $id){
        $usuario = User::findOrFail($id);
        $usuario_antiguo = $usuario;
        $usuario->estado = 1;
        $usuario->save();

        return $usuario;
    }

    public function crearSuspension(Request $request){
        $input = $request->all();
        $suspension = new Suspension();

        $suspension->cod_usuario = $input['cod_usuario'];
        $suspension->cod_admin = $input['cod_admin'];
        $suspension->fecha_comien_susp = $input["fecha_comien_susp"];
        $suspension->fecha_final_susp = $input["fecha_final_susp"];
        $suspension->descripcion_susp = $input["descripcion_susp"];
        $suspension->save();
        //desactivarUsuario($input['cod_usuario']);
        return $suspension;
    }
    public function actualizarSuspension(Request $request){
        $input = $request->all();
        $suspension = Suspension::findOrFail($input['id']);

        $suspension->fecha_comien_susp = $input["fecha_comien_susp"];
        $suspension->fecha_final_susp = $input["fecha_final_susp"];
        $suspension->descripcion_susp = $input["descripcion_susp"];
        $suspension->save();
        return $suspension;
    }
    public function eliminarSuspension(Request $request){
        $input = $request->all();
        $suspension = Suspension::findOrFail($input['id']);
        $suspension->delete();
        return 'ok';
    }
}
