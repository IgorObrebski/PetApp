$(document).ready(function () {
    let pets = JSON.parse($('#pets-data').text()); // Pobieramy JSON zwierzaków
    let statuses = JSON.parse($('#status-data').text());
    let statusSelect = $('#petStatus');
    let currentStatus = $('#current-status').text().trim();

    let statusesLabels = {
        'available': '🐶 Gotowy do adopcji',
        'sold': '🚀 Już adoptowany',
        'pending': '⏳ Oczekuje na adopcję'
    };
    let statusesIcons = {
        'available': '🐶',
        'sold': '🚀',
        'pending': '⏳'
    };


    // Generowanie opcji <select>
    statuses.forEach(status => {
        let option = $('<option>', {
            value: status,
            text: statusesLabels[status] || status
        });

        if(status === currentStatus){
            option.prop('selected', true)
        }

        statusSelect.append(option);
    })

    // Obsługa zmiany statusu → przekierowanie na URL
    statusSelect.on('change', function () {
        let selectedStatus = $(this).val();
        if (selectedStatus) {
            window.location.href = `/pet/findByStatus?status=${selectedStatus}`;
        }
    });

    /** PAGINACJA **/
    const petsPerPage = 9;
    let currentPage = 1;

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
        paginatedPets.forEach((pet, index) => {
            let petCard = $(`
                         <div id="pet-card-${pet.id}" class="card shadow-sm">
                            <div class="card-body d-flex flex-column" style="gap:10px">
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="card-title text-truncate " style="max-width: 450px;">${pet.name ? pet.name : "Brak"}</div>
                                <span class="badge rounded-pill text-bg-info" style="gap: 5px; color:white !important;">${statusesIcons[pet.status]}${pet.status}</span>
                            </div>
                            <div class="d-flex align-items-center" style="gap:10px">
                               <span class="badge rounded-pill text-bg-success text-truncate"  style="max-width: 300px;">Kategoria: ${pet.category ? pet.category.name : "Brak"}</span>
                            </div>
                            <div class="tags d-flex flex-wrap gap-1"></div>
                            <div class="action-buttons">
                                <button class="btn btn-info action-btn" style="padding: 2px 2px 2px 2px !important; color:white !important;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                                </button>
                                <button class="btn btn-warning action-btn" style="padding: 2px 2px 2px 2px !important;color:white !important;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                                </button>
                                <button onclick="" data-id=${pet.id} class="btn btn-danger action-btn" style="padding: 2px 2px 2px 2px !important;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                </button>
                            </div>
                        </div>
            `);
            let tags = pet.tags.map(tag => `
             <span class="badge rounded-pill text-bg-light text-truncate" style="max-width: 140px;" title="${tag.name}">
                 ${tag.name}
             </span>`).join('');
            petCard.find('.tags').append(tags);
            gridContainer.append(petCard);
        })
        petsList.append(gridContainer);
        updatePagination();
    }

    //PAGINATION
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
    renderPets();

    //HANDLE DELETE

    $('#pets-list').on('click', '.btn-danger', function () {
        const petId = $(this).data('id');  // Pobieramy ID zwierzaka
        const csrfToken = $('meta[name="csrf-token"]').attr('content');

        EventBus.trigger('openModal', {
            title: 'Usuń zwierzaka',
            body: '<p>Czy na pewno chcesz usunąć tego zwierzaka?</p>',
            actionText: 'Usuń',
            actionCallback: function () {
                $.ajax({
                    url: `/pet/${petId}`,
                    method: 'DELETE',
                    data: {
                        _token: csrfToken
                    },
                    success: function (response) {
                        alert("Zwierzak został usunięty.");
                        $(`#pet-card-${petId}`).remove();
                        pets = pets.filter(pet => pet.id !== petId);
                        renderPets();
                    },
                    error: function () {
                        EventBus.trigger('openModal', {
                            title: 'Błąd',
                            body: '<p>Nie udało się usunąć zwierzaka :(</p>',
                        })
                    }
                });
            }
        });
    });
});
