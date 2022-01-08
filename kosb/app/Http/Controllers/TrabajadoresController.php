<?php

namespace App\Http\Controllers;
//A REVISAR
use App\Models\Trabajador;
use App\Models\User;
use Illuminate\Http\Request;

class TrabajadoresController extends Controller
{
    public function verTrabajador(Request $request){
        $input = $request->all();
        $trabajador = Trabajador::where('cod_usuario',$input['id'])->get();
        $user = User::findOrFail($input['id']);
        $trabajador->nombre_usuario = $user->name;
        $trabajador->apellido = $user->apellido;
        $trabajador->email = $user->email;
        $trabajador->fecha_nac = $user->fecha_nac;
        return $trabajador;
    }

    public function crearTrabajador(Request $request){
        $input = $request->all();
        $trabajador = new Trabajador();
        $trabajador->id = $input['id'];
        $trabajador->postulaciones_realizadas_tot = 1;
        $trabajador->postulaciones_activas = 1;
        $trabajador->save();
        return $trabajador;
    }
    
    public function agregarPostTotales(Request $request){
        $input = $request->all();
        $trabajador = Trabajador::where('cod_usuario',$input['id'])->get()->first();
        $postul_totales = $trabajador->postulaciones_realizadas_tot;
        $postul_activas = $trabajador->postulaciones_activas;
        $trabajador->postulaciones_realizadas_tot = $postul_totales + 1;
        $trabajador->postulaciones_activas = $postul_activas + 1;
        return $trabajador;
    }

    public function eliminarPostAct(Request $request){
        $index = $request->all();
        $trabajador = Trabajador::findOrFail($input['id']);
        $postul_activas = $trabajador->postulaciones_activas;
        $trabajador->postulaciones_activas = $postul_activas - 1;
        return $trabajador;
    }



}
