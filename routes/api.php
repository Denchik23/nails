<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('login', 'JWTAuthController@login');
//    Route::post('register', 'JWTAuthController@register');
    Route::post('logout', 'JWTAuthController@logout');
    Route::post('refresh', 'JWTAuthController@refresh');
    Route::get('profile', 'JWTAuthController@profile');
});


Route::group([
    'middleware' => 'api'
], function ($router) {
    Route::get('nailtoday', 'NailController@nailToday');
    Route::get('nail-per-month', 'NailController@perMonth');
    Route::get('nail', 'NailController@index');
    Route::get('find-one/{id}', 'NailController@show')->where(['id' => '[0-9]+']);
    Route::put('add-nail', 'NailController@store');
    Route::post('update-nail', 'NailController@update');
    Route::delete('nail/{id}', 'NailController@destroy')->where(['id' => '[0-9]+']);
    //todo  Переименовать в search
    Route::post('list-client', 'ClientController@list');
    Route::put('add-client', 'ClientController@store');
    Route::get('client', 'ClientController@index');
    Route::get('all-clients', 'ClientController@getAll');
    Route::post('client', 'ClientController@update');
    Route::delete('client/{id}', 'ClientController@destroy')->where(['id' => '[0-9]+']);
});
