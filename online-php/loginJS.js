$(function() {
    $(".submitAll").click(function(e){
        e.preventDefault()
        var name = $(this).attr('name')
        var name2 = e.target.getAttribute('name')
        console.log(name + "  " + name2);
    })})

  $('#exampleModalCenter').on('shown.bs.modal', function () {
    $('#floatingRegister').trigger('focus')
  })

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
$('#passwordInline, #passwordConfirmInline').on('keyup', function () {
if ($('#passwordInline').val() != "" || $('#passwordConfirmInline').val() != "") {
  if ($('#passwordInline').val() == $('#passwordConfirmInline').val()) {
    $('#message').html('Matching').css('color', 'green');
    $('#message').css('display','block')
  } else {
    $('#message').html('Not Matching').css('color', 'red');
    $('#message').css('display','block')
   }
   } else { $('#message').html('').css('display', 'none')
   };
});
