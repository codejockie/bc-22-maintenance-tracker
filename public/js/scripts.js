// $(".alert").alert('close');

$('.resolve-button').on('click', function () {
    var id = $(this).data().id;
    $.ajax({
        method: "POST",
        url: "/resolve",
        data: { "id": id },
        success: (result) => {
            if (result) {
                location.reload();
            }
        }
    });
});

$('.reject-button').on('click', function () {
    var id = $(this).data().id;
    $('#rejectrequest').val(id);
});

setTimeout(function() {
    $(".alert").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
    });
}, 5000);
