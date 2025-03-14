<?php

namespace App\Repositories;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class PetRepository implements PetRepositoryInterface
{
    protected Client $client;
    protected string $baseUri = 'https://petstore.swagger.io/v2/pet';

    public function __construct()
    {
        $this->client = new Client();
    }

    public function getPet($id)
    {
        try {
            $response = $this->client->get("{$this->baseUri}/{$id}");
            return json_decode($response->getBody(), true);
        } catch (GuzzleException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function getPetsByStatus(string $status)
    {
        try {
            $response = $this->client->get("{$this->baseUri}/findByStatus", [
                'query' => [
                    'status' => $status,
                ]
            ]);
            return json_decode($response->getBody(), true);
        } catch (GuzzleException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function addPet(array $data)
    {
        try {
            $response = $this->client->post('', ['json' => $data]);
            return json_decode($response->getBody(), true);
        } catch (GuzzleException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function updatePet(array $data)
    {
        try {
            $response = $this->client->put('', ['json' => $data]);
            return json_decode($response->getBody(), true);
        } catch (GuzzleException $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public function deletePet($id)
    {
        try {
            $response = $this->client->delete("{$this->baseUri}/{$id}");
            return json_decode($response->getBody(), true);
        } catch (GuzzleException $e) {
            return ['error' => $e->getMessage()];
        }
    }
}
