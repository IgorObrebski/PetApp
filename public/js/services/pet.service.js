class PetService {
    #csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    viewPet(petId) {
        this.redirectToGivenUrl(petId)
    }
    createPet(){
        let that = this
        EventBus.trigger('openModal', {
            title: 'Dodaj nowego pupila',
            body: window.formView(),
            actionCallback: () => {
                const petName = $('#petName').val();
                const petCategory = $('#petCategory').val();
                const petStatus = $('#petStatusForm').val();
                if (petName && petStatus) {
                    EventBus.trigger("loading:start");

                    $.ajax({
                        url: '/pet',
                        method: 'POST',
                        data: {
                            name: petName,
                            status: petStatus,
                            category: {name: petCategory, id: 0},
                            _token: that.#csrfToken
                        },
                        beforeSend: function() {
                            EventBus.trigger("loading:start");
                        },
                        success: function (response) {
                            EventBus.trigger('openModal', {
                                title: '',
                                body: '<p>Zwierzak został dodany 🐶</p>',
                            });
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
            }
        })
    }
    editPet(pet){
        let that = this

        EventBus.trigger('openModal', {
            title: 'Edytuj pupila',
            body: window.formView(),
            actionCallback: () => {
                const petName = $('#petName').val();
                const petCategory = $('#petCategory').val();
                const petStatus = $('#petStatus').val();

                if (petName && petStatus) {
                    EventBus.trigger("loading:start");

                    $.ajax({
                        url: '/pet',
                        method: 'POST',
                        data: {
                            id: pet.id,
                            name: petName,
                            status: petStatus,
                            category: {name: petCategory, id: 0},
                            _token: that.#csrfToken
                        },
                        beforeSend: function() {
                            EventBus.trigger("loading:start");
                        },
                        success: function (response) {
                            EventBus.trigger('openModal', {
                                title: '',
                                body: '<p>Zwierzak został Edytowany 🐶</p>',
                            });
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
            }
        })

        $('#globalModal').on('shown.bs.modal', () => {
            $('#petName').val(pet.name);
            $('#petCategory').val(pet.category ? pet.category.name : '');
            $('#petStatusForm').val(pet.status);
        });
    }
    deletePet(petId , singleDelete=false) {
        let that = this
        EventBus.trigger('openModal', {
            title: 'Usuń zwierzaka',
            body: '<p>Czy na pewno chcesz usunąć tego zwierzaka?</p>',
            actionText: 'Usuń',
            actionCallback: function () {
                $.ajax({
                    url: `/pet/${petId}`,
                    method: 'DELETE',
                    data: {
                        _token: that.#csrfToken
                    },
                    beforeSend: function () {
                        EventBus.trigger("loading:start");
                    }
                }).done(function (response) {
                    EventBus.trigger('openModal', {
                        title: '',
                        body: '<p>Zwierzak został usunięty</p>',
                    });
                    if(singleDelete){
                        window.location.href = `/pet`;
                    }
                }).fail(function () {
                    EventBus.trigger('openModal', {
                        title: 'Błąd',
                        body: '<p>Nie udało się usunąć zwierzaka :(</p>',
                    });
                }).always(function () {
                    EventBus.trigger("loading:stop");
                });
            }
        });
    }
    redirectToGivenUrl(url){
        window.location.href = `/pet/${url}`;
    }
}

const dispatcher = new PetService();
