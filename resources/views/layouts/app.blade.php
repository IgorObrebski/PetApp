<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Moja Aplikacja')</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    @stack('styles')
</head>
<body>

<header class="bg-dark text-white p-3">
    <div class="container">
        <h1 class="m-0">AnimaLand</h1>
    </div>
</header>

<main class="container mt-4">
    @yield('content')
</main>

<div class="modal fade" id="globalModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalTitle">Tytuł modala</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Zamknij"></button>
            </div>
            <div class="modal-body" id="modalBody">
                Treść modala...
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Zamknij</button>
                <button type="button" class="btn btn-primary" id="modalActionBtn">OK</button>
            </div>
        </div>
    </div>
</div>

<div id="loading-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5); z-index: 1050; justify-content: center; align-items: center;">
    <div class="spinner-border text-light" role="status" style="width: 4rem; height: 4rem;"></div>
</div>

<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="{{ asset('js/helpers/bus.js') }}"></script>
<script src="{{ asset('js/helpers/delete-pet.js') }}" defer></script>
<script src="{{ asset('js/pets-list.js') }}" defer></script>
@stack('scripts')

</body>
</html>
