@extends('layouts.app')

@section('title', 'Lista Zwierzaków')

@section('content')
    <div class="mb-3">
        <label for="petStatus" class="form-label fw-bold">
            🐾 Wybierz Status Zwierzaka: Gotowy do Przytulenia czy Już Zajęty? 🐾
        </label>
        <select class="form-select w-50" id="petStatus">
            <option value="" disabled selected>🔍 Wybierz status zwierzaka</option>
        </select>
    </div>

    @if (session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
    @endif

    <div id="pets-list" class="row g-3">
        <!-- Karty zwierzaków pojawią się tutaj -->
    </div>

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
