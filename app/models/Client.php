<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'phone', 'description'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at'
    ];


    /**
     * @return mixed
     */
    public function getList() {
        return $this
            ->orderBy('created_at', 'desc')
            ->paginate(9);
    }

    public function getAll() {
        return $this
            ->select('id', 'name', 'phone')
            ->orderBy('created_at', 'desc')
            ->get();
    }
}
