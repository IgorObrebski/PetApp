<?php

namespace App\Repositories;


interface PetRepositoryInterface
{
    public function getPet(int $id);
    public function getPetsByStatus(string $status);
    public function addPet(array $data);
    public function updatePet(array $data);
    public function deletePet(int $id);
}
