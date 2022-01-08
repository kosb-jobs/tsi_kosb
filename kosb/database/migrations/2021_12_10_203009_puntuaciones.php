<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Puntuaciones extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('puntuaciones', function (Blueprint $table) {
            $table->bigIncrements('id'); // auto incremental de puntuaciones
            $table->foreignId('id_user')->constrained('users'); //refenria a users
            $table->foreignId('id_publicaciones')->constrained('publicaciones'); //referencia a publicaciones
            $table->foreignId('id_postulaciones')->constrained('postulaciones'); //referencia a postulaciones
            $table->float('puntuacion'); //verificar que float se utiliza asi
            $table->string('comentario'); //comentario chikito
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('puntuaciones');
    }
}
