<?php

namespace App\Http\Controllers;
//A REVISAR
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Postulacion;
use App\Models\Publicacion;
use App\Models\Administrador;


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
            Postulacion::where("cod_usuario",$input["id"])->delete();
            Publicacion::where("cod_usuario",$input["id"])->delete();
            $usuario = User::findOrFail($input["id"]);
            $usuario->delete();
            return 'ok';
        }else{
            return 'Es administrador';
        }
        

        
    }


}


