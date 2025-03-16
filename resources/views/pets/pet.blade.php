@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="d-flex justify-content-end">
            <button id="back-button" type="button" class="btn btn-light" onclick="dispatcher.redirectToGivenUrl('')">Wróc</button>
        </div>
        <div class="d-flex justify-content-between align-items-center">
            <h1>{{ $pet->name }}</h1>
            <div>
                <button class="btn btn-warning edit-pet">✏️ Edytuj</button>
                <button onclick="dispatcher.deletePet({{ $pet->id }}, true)" class="btn btn-danger delete-pet">🗑️ Usuń</button>
            </div>
        </div>

        <p><strong>Kategoria:</strong> {{ $pet->category->name }}</p>
        <p><strong>Status:</strong> <span class="badge text-bg-info">{{ $pet->status }}</span></p>

        <div class="tags d-flex flex-wrap gap-1">
            @foreach($pet->tags as $tag)
                <span class="badge text-bg-light text-truncate" style="max-width: 140px;">{{ $tag->name }}</span>
            @endforeach
        </div>
    </div>
@endsection
