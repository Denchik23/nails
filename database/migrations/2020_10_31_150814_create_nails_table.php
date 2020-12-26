<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nails', function (Blueprint $table) {
            $table->id();
            $table->dateTime('termin', 0);
            $table->boolean('repair')->default(0);
            $table->unsignedBigInteger('client_id');
            $table->foreign('client_id')
                ->references('id')
                ->on('clients')
                ->onDelete('cascade');
            $table->string('description')->nullable();
            $table->integer('price')->nullable();
            $table->smallInteger('status')->default(0);
            $table->timestamps();
            $table->unique('termin', 'client_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nails');
    }
}
