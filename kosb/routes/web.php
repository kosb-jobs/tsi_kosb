<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ZonasController;
use App\Models\Zona;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('welcome');
Route::get('/home_admin', function () {
    return view('home');
})->name('home');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/perfil', function () {
    if(Auth::user()->estado != 1){
        return view('perfil');
    }else{
        return invalidEstado();
    }
    
})->name('perfil');

Route::get('/crear_publicacion', function () {
    return view('crear_publicacion');
})->name('crear_publicacion');

Route::get('/buscar_trabajo', function () {
    return view('buscar_trabajo');
})->name('buscar_trabajo');

Route::get('/crear_perfil', function () {
    return view('crear_perfil');
})->name('crear_perfil');

Route::get('/admin_home', function () {
    return view('admin_home');
})->name('admin_home');

Route::get('/tabla_usuario_admin', function () {
    return view('tabla_usuario_admin');
})->name('tabla_usuario_admin');

Route::get('/reclamos', function () {
    return view('reclamos');
})->name('reclamos');

Route::get('/zonas', function () {
    return view('zonas');
})->name('zonas');

Route::get('/crear_admin', function () {
    return view('crear_admin');
})->name('crear_admin');

Route::get('/admin_reclamos', function () {
    return view('admin_reclamos');
})->name('admin_reclamos');


Route::get('/postulaciones_pub', function () {
    return view('postulaciones_a_mis_publicaciones');
})->name('postulaciones_pub');

require __DIR__.'/auth.php';



function invalidEstado(){
    if(Auth::user()->estado == 1){

        return view('banned');
    }else{

        return redirect()->route('welcome');
    }
}