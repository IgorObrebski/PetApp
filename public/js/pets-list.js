window.PetsList = (function () {
    const petsPerPage = 9;
    let pets = [];
    let currentPage = 1;

    function init(petsData) {
        pets = petsData;
        renderPets();
    }

    function renderPets() {
        let startIndex = (currentPage - 1) * petsPerPage;
        let paginatedPets = pets.slice(startIndex, startIndex + petsPerPage);

        let petsList = $('#pets-list');
        petsList.empty();

        if (paginatedPets.length === 0) {
            petsList.append('<p class="text-muted">⚠️ Brak zwierzaków do wyświetlenia.</p>');
            return;
        }

        let gridContainer = $('<div class="pets-grid"></div>');
        paginatedPets.forEach((pet) => {
            let petCard = $(`
                <div id="pet-card-${pet.id}" class="card shadow-sm">
                    <div class="card-body d-flex flex-column" style="gap:10px">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="card-title text-truncate" style="max-width: 450px;">${pet.name ? pet.name : "Brak"}</div>
                            <span class="badge rounded-pill text-bg-info" style="gap: 5px; color:white !important;">${getStatusIcon(pet.status)}${pet.status}</span>
                        </div>
                        <div class="d-flex align-items-center" style="gap:10px">
                            <span class="badge rounded-pill text-bg-success text-truncate" style="max-width: 300px;">Kategoria: ${pet.category ? pet.category.name : "Brak"}</span>
                        </div>
                        <div class="tags d-flex flex-wrap gap-1">${getTags(pet.tags)}</div>
                        <div class="action-buttons">
                            <button data-id=${pet.id} class="btn btn-info action-btn">🔍</button>
                            <button class="btn btn-warning action-btn">✏️</button>
                            <button data-id=${pet.id} class="btn btn-danger action-btn">🗑️</button>
                        </div>
                    </div>
                </div>
            `);
            gridContainer.append(petCard);
        });
        petsList.append(gridContainer);
        updatePagination();
    }

    function getTags(tags) {
        return tags.map(tag => `<span class="badge rounded-pill text-bg-light text-truncate" style="max-width: 140px;" title="${tag.name}">${tag.name}</span>`).join('');
    }

    function getStatusIcon(status) {
        const statusesIcons = {
            'available': '🐶',
            'sold': '🚀',
            'pending': '⏳'
        };
        return statusesIcons[status] || '';
    }

    function updatePagination() {
        let totalPages = Math.ceil(pets.length / petsPerPage);
        $('#pageInfo').text(`Strona ${currentPage} z ${totalPages}`);
        $('#prevPage').prop('disabled', currentPage === 1);
        $('#nextPage').prop('disabled', currentPage === totalPages || pets.length === 0);
    }

    $('#prevPage').on('click', function () {
        if (currentPage > 1) {
            currentPage--;
            renderPets();
        }
    });

    $('#nextPage').on('click', function () {
        if (currentPage * petsPerPage < pets.length) {
            currentPage++;
            renderPets();
        }
    });

    return { init };
})();
