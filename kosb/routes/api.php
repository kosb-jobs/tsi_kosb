<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ZonasController;
use App\Http\Controllers\RubrosController;
use App\Http\Controllers\DuracionesController;
use App\Http\Controllers\PublicacionesController;
use App\Http\Controllers\PostulacionesController;
use App\Http\Controllers\SuspensionesController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\ReclamosController;
use App\Http\Controllers\TrabajadoresController;
use App\Http\Controllers\OfertantesController;
use App\Http\Controllers\AdministradoresController;
use App\Http\Controllers\PuntuacionesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
 
//ZONASCONTROLLERS
//LISTO
Route::get("zonas/get",[ZonasController::class,"getZonas"]);
Route::get("zonas/get/id",[ZonasController::class,"getZonaPorId"]);
Route::get("zonas/get/nom_zona",[ZonasController::class,"getZonaPorNombre"]);
Route::post("zonas/delete",[ZonasController::class,"eliminarZona"]);
Route::post("zonas/update",[ZonasController::class,"actualizarZona"]);
Route::post("zonas/create",[ZonasController::class,"crearZona"]);

//RUBROSCONTROLLERS
//LISTO
Route::get("rubros/get",[RubrosController::class,"getRubros"]);
Route::get("rubros/get/id",[RubrosController::class,"getRubroPorId"]);
Route::get("rubros/get/nom_rubro",[RubrosController::class,"getRubroPorNombre"]);
Route::post("rubros/delete",[RubrosController::class,"eliminarRubro"]);
Route::post("rubros/update",[RubrosController::class,"actualizarRubro"]);
Route::post("rubros/create",[RubrosController::class,"crearRubro"]);

//DURACIONESCONTROLLERS
//LISTO
Route::get("duraciones/get",[DuracionesController::class,"getDuraciones"]);
Route::get("duraciones/get/id",[DuracionesController::class,"getDuracionPorId"]);
Route::get("duraciones/get/titulo_duracion",[DuracionesController::class,"getDuracionPorNombre"]);
Route::post("duraciones/delete",[DuracionesController::class,"eliminarDuracion"]);
Route::post("duraciones/update",[DuracionesController::class,"actualizarDuracion"]);
Route::post("duraciones/create",[DuracionesController::class,"crearDuracion"]);


// USERSCONTROLLERS
Route::get("users/get/id",[UsersController::class,"getUsuarioPorId"]);
Route::get("users/get/datos/completos",[UsersController::class,"getUserPorIdDatosTO"]);
Route::get("users/get",[UsersController::class,"getUsuarios"]);
Route::post("users/update",[UsersController::class,"actualizarUsuario"]);
Route::post("users/delete",[UsersController::class,"eliminarUsuario"]);
Route::post("users/desactivar",[UsersController::class,"desactivarUsuario"]);
Route::post("users/activar",[UsersController::class,"activarUsuario"]);

// POSTULACIONCONTROLLERS
Route::post("postulaciones/create",[PostulacionesController::class,"crearPostulacion"]);
Route::post("postulaciones/delete",[PostulacionesController::class,"eliminarPostulacion"]);
Route::post("postulaciones/responder",[PostulacionesController::class,"editarPostulacion"]);
Route::get("postulaciones/get/user",[PostulacionesController::class,"getPostulacionPorUser"]);
Route::get("postulaciones/get/user/aceptadas",[PostulacionesController::class,"getPostulAceptPorUser"]);
Route::get("postulaciones/get/user/completa",[PostulacionesController::class,"getPostulPorIdConUser"]);
Route::get("postulaciones/get/pub",[PostulacionesController::class,"getPostPorPublicacion"]);
Route::get("postulaciones/get/aceptadas",[PostulacionesController::class,"getPostulAceptPorPub"]);

// TRABAJADORCONTROLLERS
Route::post("trabajador/agregarpost",[TrabajadoresController::class,"agregarPostTotales"]);
Route::post("trabajador/eliminarpost",[TrabajadoresController::class,"eliminarPostAct"]);
Route::post("trabajador/get/user",[TrabajadoresController::class,"verTrabajador"]);
Route::post("trabajador/actualizar/puntuacion",[TrabajadoresController::class,"actualizarPuntuacionTrabajador"]);
Route::get("/trabajador/get/cod_usuario",[TrabajadoresController::class,"getPuntuacionTrabajador"]);





//OFERTANTESCONTROLLERS
Route::post("ofertante/agregarpub",[OfertantesController::class,"agregarPubTotales"]);
Route::post("ofertante/eliminarpub",[OfertantesController::class,"eliminarPostAct"]);
Route::get("ofertante/get/user",[OfertantesController::class,"verOfertante"]);

//ADMINISTRADORESCONTROLLERS
Route::post("admin/crear",[AdministradoresController::class,"crearAdmin"]);
Route::post("admin/delete",[AdministradoresController::class,"eliminarAdministrador"]);
Route::get("admin/get/user",[AdministradoresController::class,"verAdmin"]);
Route::get("admin/get",[AdministradoresController::class,"getAdministradores"]);

// PUBLICACIONESCONTROLLERS
Route::post("publicaciones/create",[PublicacionesController::class,"crearPublicacion"]);
Route::post("publicaciones/delete",[PublicacionesController::class,"eliminarPublicacion"]);
Route::post("publicaciones/update",[PublicacionesController::class,"actualizarPublicacion"]);
Route::post("publicaciones/estado",[PublicacionesController::class,"cambiarEstadoPub"]);
Route::get("publicaciones/get/estado",[PublicacionesController::class,"filtroPublicacionUserAcep"]);
Route::get("publicaciones/get",[PublicacionesController::class,"getPublicaciones"]);
Route::get("publicaciones/get/zona",[PublicacionesController::class,"filtroPublicacionSelectZona"]);
Route::get("publicaciones/get/rubro",[PublicacionesController::class,"filtroPublicacionSelectRubro"]);
Route::get("publicaciones/get/duracion",[PublicacionesController::class,"filtroPublicacionSelectDuracion"]);
Route::get("publicaciones/get/null",[PublicacionesController::class,"getPublicacionesNull"]);
Route::get("publicaciones/get/text",[PublicacionesController::class,"filtroPublicacionText"]);
Route::get("publicaciones/get/id",[PublicacionesController::class,"filtroPublicacionId"]);
Route::get("publicaciones/get/user",[PublicacionesController::class,"filtroPublicacionUser"]);
Route::get("publicaciones/get/tipo",[PublicacionesController::class,"filtroPublicacionTipo"]);

// RECLAMOSCONTROLLERS
Route::post("reclamos/create",[ReclamosController::class,"crearReclamo"]);
Route::post("reclamos/delete",[ReclamosController::class,"eliminarReclamo"]);
Route::post("reclamos/update",[ReclamosController::class,"actualizarReclamo"]);
Route::get("reclamos/get",[ReclamosController::class,"getReclamos"]);
Route::get("reclamos/get/id",[ReclamosController::class,"getReclamoPorId"]);
Route::get("reclamos/get/user",[ReclamosController::class,"getReclamosPorUsuario"]);
Route::get("reclamos/get/sinRespuesta",[ReclamosController::class,"getReclamoSinR"]);

// SUSPENSIONESCONTROLLERS

Route::post("suspensiones/create",[SuspensionesController::class,"crearSuspension"]);

//PUNTUACIONESCONTROLLERS

Route::post("puntuaciones/create",[PuntuacionesController::class,"crearPuntuacion"]);
Route::get("puntuaciones/get/id_user",[PuntuacionesController::class,"getPuntuacionPorUsuario"]);
Route::get("puntuaciones/get/id_publicaciones",[PuntuacionesController::class,"getPuntuacionPorPublicacion"]);
