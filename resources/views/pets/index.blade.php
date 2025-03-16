@extends('layouts.app')

@section('title', 'Lista Zwierzaków')

@section('content')
    <div class="mb-3 d-flex align-items-center justify-content-between">
        <div>
            <label for="petStatus" class="form-label fw-bold">
                🐾 Wybierz Status Zwierzaka: Gotowy do Przytulenia czy Już Zajęty? 🐾
            </label>
            <select class="form-select w-50" id="petStatus">
                <option value="" disabled selected>🔍 Wybierz status zwierzaka</option>
            </select>
        </div>
        <button id="add-pet" type="button" class="btn btn-success" onclick="dispatcher.createPet()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cat"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/></svg> Dodaj pupila
        </button>
    </div>

    @if (session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    <div id="pets-list" class="row g-3"></div>

    <div class="d-flex justify-content-center mt-4">
        <button id="prevPage" class="btn btn-primary me-2" disabled>⬅️ Poprzednia</button>
        <span id="pageInfo" class="align-self-center"></span>
        <button id="nextPage" class="btn btn-primary ms-2">Następna ➡️</button>
    </div>

    <script id="pets-data" type="application/json">@json($pets ?? [])</script>
    <script id="status-data" type="application/json">@json($statuses)</script>
    <span id="current-status" class="d-none">{{ $selectedStatus ?? '' }}</span>
@endsection

@push('scripts')
    <script src="{{ asset('js/pets.js') }}"></script>
@endpush
