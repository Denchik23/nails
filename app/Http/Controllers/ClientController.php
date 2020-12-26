<?php

namespace App\Http\Controllers;

use App\models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Client $client)
    {
        if ($request->method('get')) {
            // dd($client->getList());
            return $client->getList();
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Client $client)
    {
        if ($request->method('put')) {
            //dd($request->all());

            $request->validate([
                'name' => 'required',
                'phone' => 'required',
                'description' => 'nullable|string|max:15',
            ]);

            $dataClient = [
                'name' => $request->input('name'),
                'phone' => preg_replace('/[^0-9]/', '', $request->input('phone')),
                'description' => $request->input('description'),
            ];

            $client->firstOrCreate($dataClient);

            return $this->success('Клиент успешно добавлен');
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $client)
    {
        if ($request->method('post')) {

            $request->validate([
                'id' => 'required|integer|min:1',
                'name' => 'required',
                'phone' => 'required',
                'description' => 'nullable|string|max:255',
            ]);

            $updateClient = $client->find($request->input('id'));
            $updateClient->name = $request->input('name');
            $updateClient->phone = $request->input('phone');
            $updateClient->description = $request->input('description');
            $updateClient->save();
            return $this->success('Клиент №'.$updateClient->id.' успешно обновлен');
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
            if (Client::destroy($id)) {
                return $this->success('Клиент успешно удален');
            } else {
                return $this->error('Ошибка удаления!');
            }
        }
    }

    public function getAll(Request $request, Client $client) {
        if ($request->method('get')) {
            return $client->getAll();
        }
    }

    /**
     * Список клиентов для поиска в vue multiselect
     * @param Request $request
     * @param Client $client
     * @return array
     */
    public function list(Request $request, Client $client) {
        if ($request->method('post')) {
            $users = [];
            $search = $request->get('query');

            if (!empty($search)) {
                $users = $client->where('name', 'like', $search.'%')->get();
            }
            return $users;
        }
    }
}
