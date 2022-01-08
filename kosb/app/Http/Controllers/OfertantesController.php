<?php

namespace App\Http\Controllers;
//A REVISAR
use App\Models\Ofertante;
use App\Models\User;
use Illuminate\Http\Request;

class OfertantesController extends Controller
{
    public function verOfertante(Request $request){
        $input = $request->all();
        $ofertante = Ofertante::where("cod_usuario",$input['id'])->get()->first();
        // $user = User::findOrFail($input['id']);
        // $ofertante->nombre_usuario = $user->name;
        // $ofertante->apellido = $user->apellido;
        // $ofertante->email = $user->email;
        // $ofertante->fecha_nac = $user->fecha_nac;
        return $ofertante;
    }

    public function crearOfertante(Request $request){
        $input = $request->all();
        
        $ofertante = new Ofertante();
        $ofertante->cod_usuario = $input['id'];
        $ofertante->ofertas_total_publ = 1;
        $ofertante->publicaciones_activas = 1;
        $ofertante->save();
        return $ofertante;
    }
    
    public function agregarPubTotales(Request $request){
        $input = $request->all();
        $ofertante = Ofertante::where('cod_usuario',$input['id'])->get()->first();
        $publicaciones_totales = $ofertante->ofertas_total_publ;
        $public_activas = $ofertante->publicaciones_activas;
        $ofertante->ofertas_total_publ = $publicaciones_totales + 1;
        $ofertante->publicaciones_activas = $public_activas + 1;
        $ofertante->save();
        return $ofertante;
    }

    public function eliminarPubAct(Request $request){
        $index = $request->all();
        $ofertante = Ofertante::findOrFail($input['id']);
        $public_activas = $ofertante->publicaciones_activas;
        $ofertante->publicaciones_activas = $public_activas - 1;
        return $ofertante;
    }
}
