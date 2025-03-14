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
    statusSelect.on('change', function () {
        let selectedStatus = $(this).val();
        if (selectedStatus) {
            window.location.href = `/pet/findByStatus?status=${selectedStatus}`;
        }
    });
    PetsList.init(pets);
    $('#pets-list').on('click', '.btn-danger', function () {
        const petId = $(this).data('id');
        deletePet(petId);
    });

    // Obsługa przekierowania do szczegółów zwierzaka
    $('#pets-list').on('click', '.btn-info', function () {
        const petId = $(this).data('id');
        window.location.href = `/pet/${petId}`;
    });
});
