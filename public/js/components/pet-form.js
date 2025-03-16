function formView(){
    return `
            <form id="addPetForm">
                <div class="mb-3">
                    <label for="petName" class="form-label">Nazwa pupila</label>
                    <input type="text" class="form-control" id="petName" placeholder="Wpisz nazwę pupila" required>
                </div>
                <div class="mb-3">
                    <label for="petCategory" class="form-label">Kategoria</label>
                    <input type="text" class="form-control" id="petCategory" placeholder="Wpisz kategorię" required>
                </div>
                <div class="mb-3">
                    <label for="petStatus" class="form-label">Status</label>
                    <select class="form-select" id="petStatusForm" required>
                        <option value="" disabled selected>🔍 Wybierz status zwierzaka</option>
                        <option value="available">Dostępny</option>
                        <option value="sold">Sprzedany</option>
                        <option value="pending">Oczekujący</option>
                    </select>
                </div>
            </form>
        `;
}

window.formView = formView;
