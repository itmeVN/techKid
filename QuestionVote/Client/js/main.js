$(document).ready(function(){
    $.ajax({
        url: 'http://localhost:6969/question',
        method: 'GET',
        success: function(data){
            console.log("Success!!!" + data.question);
            $('#content').text(data.question)
            $('.answer').attr("id-data",data.question.id);
        },
        error: function(){
            console.log("Error!!!");
        }
        
    })

    $('.answer').on('click',function(e){
        let answer = $(e.target).attr('id-answer');
        let questionId = $(e.target).attr('id-data');
        console.log(answer,questionId);
        $.ajax({
            url: 'http://localhost:6969/question',
            method: 'PUT',
            
        })
    })
})