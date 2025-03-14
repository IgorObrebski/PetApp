window.deletePet = function(petId, singleDelete) {

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

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
                beforeSend: function () {
                    EventBus.trigger("loading:start");
                }
            }).done(function (response) {
                alert("Zwierzak został usunięty.");
                if(!singleDelete){
                    $(`#pet-card-${petId}`).remove();
                    pets = pets.filter(pet => pet.id !== petId);
                }
            }).fail(function () {
                EventBus.trigger('openModal', {
                    title: 'Błąd',
                    body: '<p>Nie udało się usunąć zwierzaka :(</p>',
                });
            }).always(function () {
                EventBus.trigger("loading:stop");
                if(singleDelete){
                    window.location.href = `/pet`;
                }
            });
        }
    });
};
