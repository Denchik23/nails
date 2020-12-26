<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class Nail extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'termin', 'repair', 'client_id', 'description'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at'
    ];

    protected $casts = [
        'termin' => 'datetime:Y-m-d\TH:i',
        'status' => 'string',
    ];

    /**
     * @return mixed
     */
    public function getList() {
        return $this
            ->orderBy('created_at', 'desc')
            ->with('client')
            ->paginate(9);
    }

    public function getToday () {
        return $this
            ->select('id', 'termin', 'client_id')
            ->with('client')->where('status', 0)
            ->get();
    }

    public function getPerMonthData (Carbon $month)
    {
        $out = [];
        $dateStart = $month->startOfMonth()->toDateTimeString();
        $dateEnd = $month->endOfMonth()->toDateTimeString();

        $out['total'] = $this->whereBetween('termin', [$dateStart, $dateEnd])->count();
        $out['sum'] = $this->whereBetween('termin', [$dateStart, $dateEnd])->sum('price');
        //dd($out);
        return $out;
    }

    /**
     * Get the client associated with the Client.
     */
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
