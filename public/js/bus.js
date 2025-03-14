window.EventBus = $({});


function showModal(title, body, actionText, actionCallback) {
    $('#modalTitle').text(title);
    $('#modalBody').html(body);
    $('#modalActionBtn').text(actionText || 'OK');

    // Usuwamy poprzedni event, by uniknąć wielokrotnych wywołań
    $('#modalActionBtn').off('click').on('click', function () {
        if (typeof actionCallback === 'function') {
            actionCallback();
        }
        $('#globalModal').modal('hide');
    });

    $('#globalModal').modal('show');
}

EventBus.on('openModal', function (event, data) {
    showModal(data.title, data.body, data.actionText, data.actionCallback);
});
