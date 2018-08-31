// const questionInput = document.getElementById('textarea_Question');
// const count = document.getElementById('count');
// document để lấy tất cả các phần tử trong file html

questionInput.addEventListener("input", function () {
    count.innerText  = 200 - questionInput.value.length;
});

$(document).ready(function(){
    $('#textarea_Question').on("input", function(){
        $('#count').text$('#textarea_Question').attr('maxlenght')
    })
})