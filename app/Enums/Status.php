<?php

namespace App\Enums;

enum Status: string
{
    case SOLD = 'sold';
    case AVAILABLE = 'available';
    case PENDING = 'pending';
}
