<?php

namespace App\Http\Controllers;
//A REVISAR
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Postulacion;
use App\Models\Publicacion;
use App\Models\Administrador;
use App\Models\Ofertante;
use App\Models\Trabajador;

class Datos{
    public $cod_usuario;
    public $cod_trabajador;
    public $cod_ofertante;

    public function __construct($cod_ofertante, $cod_trabajador, $cod_usuario){}
}

class UsersController extends Controller
{
    public function getUsuarios(){
        $usuarios = User::all();
        return $usuarios;
    }
    public function getUsuarioPorId(Request $request){
        $input = $request->all();
        $usuario = User::findOrFail($input["id"]);
        return $usuario;
    }
    public function getUserPorIdDatosTO(Request $request){
        $input = $request->all();
        
        $usuario = User::findOrFail($input["id"]);
        $trabajador = Trabajador::where('cod_usuario',$input["id"])->get()->first();
        $ofertante = Ofertante::where('cod_usuario',$input["id"])->get()->first();
        $datos_completos = (object)[
            "cod_usuario"=>$usuario['id'],
            "name" => $usuario['name'],
            "apellido" => $usuario['apellido'],
            "fecha_nac" => $usuario['fecha_nac'],
            "email" => $usuario['email'],
            "estado" => $usuario['estado'],
            "cod_trabajador"=>$ofertante['id'],
            "publicaciones_activas"=>$ofertante['publicaciones_activas'],
            "ofertas_total_publ"=>$ofertante['ofertas_total_publ'],
            "puntuacion_ofertante"=>$ofertante['puntuacion_ofertante'],
            "cod_ofertante" => $trabajador['id'],
            "postulaciones_activas" => $trabajador['postulaciones_activas'],
            "postulaciones_realizadas_tot" => $trabajador['postulaciones_realizadas_tot'],
            "puntuacion_trabajador" => $trabajador['puntuacion_trabajador']
        ];
        
        return $datos_completos;
    }
    public function actualizarUsuario(Request $request){
        $input = $request->all();
        $usuario = User::findOrFail($input["id"]);
        $antiguo = $usuario;
        $usuario->name=$input["name"];
        $usuario->apellido = $input["apellido"];
        $usuario->sexo = $input["sexo"];
        $usuario->fecha_nac = $input["fecha_nac"];
        $usuario->email = $antiguo->email;
        $usuario->estado = $antiguo->estado;
        $usuario->password = $antiguo->password;
        $usuario->save();

        return $usuario;
    }


    public function desactivarUsuario(Request $request){
        $input = $request->all();
        $usuario = User::findOrFail($input["id"]);

        $usuario_antiguo = $usuario;
        $usuario->estado = $input["estado"];
        $usuario->save();

        return $usuario;
    }

    public function activarUsuario(Request $request){
        $input = $request->all();
        $usuario = User::findOrFail($input["id"]);

        $usuario_antiguo = $usuario;
        $usuario->estado = $input["estado"];
        $usuario->save();
        
        return $usuario;
    }

    public function eliminarUsuario(Request $request){
        $input = $request->all();
        $admin = Administrador::where('cod_usuario',$input['id'])->get();
        if(count($admin) == 0){
            $post_proceso = Postulacion::where("cod_usuario", $input["id"])->where("aceptacion",1)->get();
            $pub_proceso  = Publicacion::where("cod_usuario", $input["id"])->where("estado", "FPP")->get();
            if (count($post_proceso) == 0 && count($pub_proceso) == 0){
                Postulacion::where("cod_usuario",$input["id"])->delete();
                Publicacion::where("cod_usuario",$input["id"])->delete();
                $usuario = User::findOrFail($input["id"]);
                $usuario->delete();
                return 'ok';
            }else{
                return 'No se puede eliminar el administrador cuando tiene postulaciones aceptadas o publicaciones en proceso de trabajo';
            }
            

        }else{
            return 'Es administrador';
        }
        

        
    }


}


