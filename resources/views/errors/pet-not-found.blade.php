@extends('layouts.app')

@section('content')
    <div class="container text-center mt-5">
        <h1 class="text-danger">🐾 O nie! Zwierzak nie został znaleziony.</h1>
        <p class="text-muted">Nie mogliśmy znaleźć zwierzaka o podanym ID. Może został już adoptowany? 🐕</p>
        <a href="{{ url('/pet') }}" class="btn btn-primary">🔙 Wróć na stronę główną</a>
    </div>
@endsection
