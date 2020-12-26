<?php

namespace App\Http\Controllers;

use App\models\Client;
use App\models\Nail;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NailController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Nail $nail)
    {
        if ($request->method('get')) {
            //dd($nail->getList());
            return $nail->getList();
        }
    }

    public function nailToday(Request $request, Nail $nail)
    {
        if ($request->method('get')) {
            $out = [];
            $nailsToday = $nail->getToday();
            foreach ($nailsToday as $item) {
                $dataNail = Carbon::createFromFormat('Y-m-d H:i:s', $item->termin);
                //dd($item->termin);
                $out[] = [
                    'id' => $item->id,
                    'data' => $dataNail->isoFormat('d MMMM'),
                    'time' => $dataNail->format('H:i'),
                    'client' => $item->client
                ];

            }

            return $out;
        }
    }

    public function perMonth (Request $request, Nail $nail)
    {
        if ($request->method('get')) {
            $currentMonth = Carbon::now();
            return $nail->getPerMonthData($currentMonth);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Nail $nail)
    {
        if ($request->method('put')) {
            //dd($request->all());

            $request->validate([
                'termin' => 'required|date',
                'client_id' => 'required|integer|min:1',
                'description' => 'nullable|string|max:256',
            ]);
            $newRecord = $nail->firstOrCreate($request->all());
            if ($newRecord->wasRecentlyCreated) {
                return $this->success('Запись успешно сохранена');
            } else {
                return $this->error('Такая запись уже существует');
            }


        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Nail $nail)
    {
        if ($request->method('post')) {

            // TODU Сделать нормальную валидацию
            $request->validate([
                'id' => 'required|integer|min:1',
                'client_id' => 'required|integer|min:1',
                'status' => 'required|integer',
                'description' => 'nullable|string|max:255',
            ]);

            $updateNail = $nail->find($request->input('id'));
            $updateNail->termin = $request->input('termin');
            $updateNail->repair = $request->input('repair');
            $updateNail->client_id = $request->input('client_id');
            $updateNail->description = $request->input('description');
            $updateNail->price = $request->input('price');
            $updateNail->status = $request->input('status');
            $updateNail->save();
            return $this->success('Запись №'.$updateNail->id.' успешно обновлена');
        }
    }

    /**
     * Display the specified resource.
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Nail $nail, $id)
    {
        if ($request->method('get')) {
            return $nail->find($id);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        if ($request->method('delete')) {
            if (Nail::destroy($id)) {
                return $this->success('Заявка успешно удалена');
            } else {
                return $this->error('Ошибка удаления!');
            }
        }
    }
}
