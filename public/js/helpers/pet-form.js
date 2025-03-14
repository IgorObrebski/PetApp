$(document).ready(function() {
    $('#add-pet').on('click', function() {
        const modalTitle = 'Dodaj nowego pupila';
        const modalBody = `
            <form id="addPetForm">
                <div class="mb-3">
                    <label for="petName" class="form-label">Nazwa pupila</label>
                    <input type="text" class="form-control" id="petName" placeholder="Wpisz nazwę pupila" required>
                </div>
                <div class="mb-3">
                    <label for="petStatus" class="form-label">Status</label>
                    <select class="form-select" id="petStatus" required>
                        <option value="available">Dostępny</option>
                        <option value="sold">Sprzedany</option>
                        <option value="pending">Oczekujący</option>
                    </select>
                </div>
            </form>
        `;
        const actionText = 'Zapisz';
        const actionCallback = function () {
            const petName = $('#petName').val();
            const petStatus = $('#petStatus').val();
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
            if (petName && petStatus) {
                EventBus.trigger("loading:start");

                $.ajax({
                    url: '/pet',
                    method: 'POST',
                    data: {
                        name: petName,
                        status: petStatus,
                        _token: csrfToken
                    },
                    beforeSend: function() {
                        EventBus.trigger("loading:start");
                    },
                    success: function (response) {
                        alert('Pupil został dodany!');
                    },
                    error: function (xhr) {
                        const errorMessage = xhr.responseJSON && xhr.responseJSON.error
                            ? xhr.responseJSON.error
                            : 'Coś poszło nie tak! Spróbuj ponownie.';
                        showModal('Błąd', `<p>${errorMessage}</p>`, 'Spróbuj ponownie');
                    },
                    complete: function () {
                        EventBus.trigger("loading:stop");
                    }
                });
            } else {
                alert('Proszę wypełnić wszystkie pola.');
            }
        };

        showModal(modalTitle, modalBody, actionText, actionCallback);
    });
});
