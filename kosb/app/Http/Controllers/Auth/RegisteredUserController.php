<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Trabajador;
use App\Models\Ofertante;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Illuminate\View\View
     */
    public function create()
    {
        return view('auth.register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);
        $trabajador = new Trabajador();
        $trabajador->cod_usuario = $user->id;
        $trabajador->postulaciones_realizadas_tot = 0;
        $trabajador->postulaciones_activas = 0;
        $trabajador->puntuacion_trabajador = 0;
        $trabajador->save();

        $ofertante = new Ofertante();
        $ofertante->cod_usuario = $user->id;
        $ofertante->ofertas_total_publ = 0;
        $ofertante->publicaciones_activas = 0;
        $ofertante->puntuacion_ofertante = 0;
        $ofertante->save();
        return redirect(RouteServiceProvider::HOME);
    }
}
