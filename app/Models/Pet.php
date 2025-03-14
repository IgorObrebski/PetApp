<?php

namespace App\Models;

use App\Enums\Status;
use Illuminate\Support\Collection;


class Pet
{
    /** @var int */
    public int $id;

    /** @var string */
    public string $name;

    /** @var Status */
    public Status $status;

    /** @var Category */
    public Category $category;

    /** @var Collection<int, Tag> */
    public Collection $tags;

    /** @var string[] */
    public array $photoUrls;
}
