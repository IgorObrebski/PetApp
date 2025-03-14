<?php

namespace App\Services;

use App\Enums\Status;
use App\Repositories\PetRepositoryInterface;

class PetService
{
    protected PetRepositoryInterface $petRepository;

    public function __construct(PetRepositoryInterface $petRepository)
    {
        $this->petRepository = $petRepository;
    }

    public function getPet($id)
    {
        return $this->petRepository->getPet($id);
    }

    public function getPetsByStatus(string $status)
    {
        return $this->petRepository->getPetsByStatus($status);
    }

    public function addPet(array $data)
    {
        return $this->petRepository->addPet($data);
    }

    public function updatePet(array $data)
    {
        return $this->petRepository->updatePet($data);
    }

    public function deletePet($id)
    {
        return $this->petRepository->deletePet($id);
    }
}
