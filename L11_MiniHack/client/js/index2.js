$(document).ready(function(){
    // lấy câu hỏi từ server trả về
    let id = "";
    $.ajax({
        url: `http://localhost:6969/game`,
        method: 'GET',
        success: function(data){
            id =  req.params.gameId;
            console.log("Success!!!" + id);
            // $('.answer').attr("id-data",data.question._id);
        },
        error: function(){
            console.log("Error!!!");
        }
        
    })
    $.ajax({
        url: `http://localhost:6969/game/${id}`,
        method: 'GET',
        data: {
            Id : id
        },
        success: function(data){
          if(data.game){
              $('#player1').text(data.game.player1.name);
              $('#player2').text(data.game.player2.name);
              $('#player3').text(data.game.player3.name);
              $('#player4').text(data.game.player4.name);
          }
            // $('#content').text(data.question.content);
            // $('.answer').attr("id-data",data.question._id);
        },
        error: function(){
            console.log("Error!!!");
        }
        
    })
})
