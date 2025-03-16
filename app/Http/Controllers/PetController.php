<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use Exception;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Services\PetService;

class PetController
{

    private PetService $petService;

    public function __construct(PetService $petService)
    {
        $this->petService = $petService;
    }

    /**
     * @return Factory|View|Application|object
     */
    public function index(): View
    {
        return view('pets.index', [
            'statuses' => Status::cases(),
            'selectedStatus' => null, // Brak wybranego statusu
            'pets' => [] // Brak zwierzaków
        ]);
    }

    public function findByStatus(Request $request)
    {
        $status = $request->query('status');

        if (!$status) {
            return redirect()->route('pet.index')->with('error', 'Niepoprawny status!');
        }

        $pets = $this->petService->getPetsByStatus($status);

        return view('pets.index', [
            'statuses' => Status::cases(),
            'selectedStatus' => $status,
            'pets' => $pets
        ]);
    }


    /**
     * @param $id
     * @return Application|Factory|object|View
     */
    public function show($id)
    {
        try {
            $pet = $this->petService->getPet($id);

            if (isset($pet['error'])) {
                return response()->view('errors.pet-not-found', ['message' => $pet['error']], 404);
            }

            $pet = json_decode(json_encode($pet));

            return view('pets.pet', [
                "pet" => $pet
            ]);

        } catch (Exception $e) {
            return response()->view('errors.500', ['message' => 'Coś poszło nie tak! Spróbuj ponownie później.'], 500);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $pet = $this->petService->addPet($request->all());
            return response()->json($pet, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Nie udało się dodać zwierzaka. Spróbuj ponownie.'], 500);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        try{
            $pet = $this->petService->updatePet($request->all());
                 return response()->json($pet, 200);
        }catch (\Exception $e){
            return response()->json(['error' => 'Nie udało się edytować zwierzaka. Spróbuj ponownie.'], 500);
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function destroy($id): JsonResponse
    {
        try {
            $result = $this->petService->deletePet($id);

            if (isset($result['error'])) {
                return response()->json(['error' => $result['error']], 500);
            }

            return response()->json(['deleted_at' => now(), 'id' => $id], 200);
        } catch (Exception $e) {
            return response()->json(['error' => 'Wystąpił błąd podczas usuwania zwierzaka.'], 500);
        }
    }
}
