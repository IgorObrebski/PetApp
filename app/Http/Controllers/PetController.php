<?php

namespace App\Http\Controllers;

use App\Enums\Status;
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
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        return response()->json($this->petService->getPet($id));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        return response()->json($this->petService->addPet($request->all()));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        return response()->json($this->petService->updatePet($request->all()));
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
