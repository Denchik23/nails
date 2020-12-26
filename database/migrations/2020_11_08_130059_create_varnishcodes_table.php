<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVarnishcodesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('varnishcodes', function (Blueprint $table) {
            $table->id();
            $table->char('code', 100);
            $table->char('color', 6)->nullable();
            $table->unsignedBigInteger('manufacturer_id');
            $table->foreign('manufacturer_id')
                ->references('id')
                ->on('manufacturers')
                ->onDelete('cascade');
            $table->unique(['code', 'manufacturer_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('varnishсodes');
    }
}
