// $(".alert").alert('close');

$('.resolve-button').on('click', function () {
    var id = $(this).data().id;
    alert(id);
    // $.ajax({
    //     method: "POST",
    //     url: "/resolve",
    //     data: { "id": id },
    //     success: (result) => {
    //         if (result) {
    //             location.reload();
    //         }
    //     }
    // });
});