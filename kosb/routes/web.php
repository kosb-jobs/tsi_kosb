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
    if(Auth::user() == false){
        return view('crear_perfil');
    }else if(Auth::user()->estado != 1){
        return view('home');
    }else{
        return invalidEstado();
    }
})->name('home');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/perfil', function () {
    if(Auth::user() == false){
        return view('crear_perfil');
    }else if(Auth::user()->estado != 1){
        return view('perfil');
    }else{
        return invalidEstado();
    }
    
})->name('perfil');

Route::get('/crear_publicacion', function () {
    if(Auth::user() == false){
        return view('crear_perfil');
    }else if(Auth::user()->estado != 1){
        return view('crear_publicacion');
    }else{
        return invalidEstado();
    }
})->name('crear_publicacion');

Route::get('/buscar_trabajo', function () {
    if(Auth::user() == false){
        return view('buscar_trabajo');
    }else if(Auth::user()->estado != 1){
        return view('buscar_trabajo');
    }else{
        return invalidEstado();
    }
})->name('buscar_trabajo');

Route::get('/crear_perfil', function () {
    if(Auth::user() == false){
        return view('crear_perfil');
    }else if(Auth::user()->estado != 1){
        return view('crear_perfil');
    }else{
        return invalidEstado();
    }
})->name('crear_perfil');

Route::get('/admin_home', function () {
    if(Auth::user() == false){
        return view('crear_perfil');
    }else if(Auth::user()->estado != 1){
        return view('admin_home');
    }else{
        return invalidEstado();
    }
})->name('admin_home');

Route::get('/tabla_usuario_admin', function () {
    if(Auth::user() == false){
        return view('crear_perfil');
    }else if(Auth::user()->estado != 1){
        return view('tabla_usuario_admin');
    }else{
        return invalidEstado();
    }
})->name('tabla_usuario_admin');

Route::get('/reclamos', function () {
    if(Auth::user() == false){
        return view('crear_perfil');
    }else if(Auth::user()->estado != 1){
        return view('reclamos');
    }else{
        return invalidEstado();
    }
})->name('reclamos');

Route::get('/zonas', function () {
    if(Auth::user() == false){
        return view('crear_perfil');
    }else if(Auth::user()->estado != 1){
        return view('zonas');
    }else{
        return invalidEstado();
    }
    
})->name('zonas');

Route::get('/crear_admin', function () {
    if(Auth::user() == false){
        return view('crear_perfil');
    }else if(Auth::user()->estado != 1){
        return view('crear_admin');
    }else{
        return invalidEstado();
    }
})->name('crear_admin');

Route::get('/admin_reclamos', function () {
    if(Auth::user() == false){
        return view('crear_perfil');
    }else if(Auth::user()->estado != 1){
        return view('admin_reclamos');
    }else{
        return invalidEstado();
    }
})->name('admin_reclamos');


Route::get('/postulaciones_pub', function () {
    if(Auth::user() == false){
        return view('crear_perfil');
    }else if(Auth::user()->estado != 1){
        return view('postulaciones_a_mis_publicaciones');
    }else{
        return invalidEstado();
    }
})->name('postulaciones_pub');

Route::get('/reclamos_suspendido', function () {
    if(Auth::user() == false){
        return view('crear_perfil');
    }
    return view('reclamos_susp');
})->name('reclamos_suspendido');

require __DIR__.'/auth.php';



function invalidEstado(){
    if(Auth::user()->estado == 1){

        return view('banned');
    }else{

        return redirect()->route('welcome');
    }
}