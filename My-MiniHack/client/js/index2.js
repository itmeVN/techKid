$(document).ready(function(){
    let url = document.location.search;
    let id = new URLSearchParams(url.slice(1)).get('gameId');
    let stt = 0;
    let getSetTimeOut; 
    console.log(id);
    $.ajax({
        url: `http://localhost:6969/games/${id}`,
        method: "GET",
        success: function(data){
            console.log(data);
            $('#player1').text(data.games.player1.name);
            $('#player2').text(data.games.player2.name);
            $('#player3').text(data.games.player3.name);
            $('#player4').text(data.games.player4.name);
            $('#sops1').text(data.games.player4.sops)
            $('#sops2').text(data.games.player4.sops)
            $('#sops3').text(data.games.player4.sops)
            $('#sops4').text(data.games.player4.sops)
            if(data.games.player1.score.length != 0 ){
                 stt = data.games.player1.score.length;
                   for(let i =0;i<stt;i++)
                    {
                        $('#tableScore').append(`
                        <tr> 
                        <th> ${i+1}</th>
                        <td> <input type="number" class= "score" id-player="1" id-row="${i}" value="${data.games.player1.score[i]}"></td>
                        <td> <input type="number" class= "score" id-player="1" id-row="${i}" value="${data.games.player1.score[i]}"></td>
                        <td> <input type="number" class= "score" id-player="1" id-row="${i}" value="${data.games.player1.score[i]}"></td>
                        <td> <input type="number" class= "score" id-player="1" id-row="${i}" value="${data.games.player1.score[i]}"></td>
                        </tr>
                        `);
                    }      
            }
        },
        error: function(err){
            if(err) console.log(err);
            else
                console.log("Get Success Player'sName!!!");
        }
    }) 
    
    $('#addround').on('click',function(e){
            e.preventDefault();
            console.log("Clicked");
            $.ajax({
                url:"http://localhost:6969/games/addround",
                method: "PUT",
                data : {
                    id
                },
                success: function(data){
                   console.log(data);
                    stt = data.games.player1.score.length;
                    $('#tableScore').append(`
                    <tr class="tr-scores"> 
                    <th> ${stt}</th>
                    <td> <input type="number" class= "score" id-player="1" id-row="${stt-1}" value="${data.games.player1.score[stt-1]}"></td>
                    <td> <input type="number" class= "score" id-player="2" id-row="${stt-1}" value="${data.games.player2.score[stt-1]}"></td>
                    <td> <input type="number" class= "score" id-player="3" id-row="${stt-1}" value="${data.games.player3.score[stt-1]}"></td>
                    <td> <input type="number" class= "score" id-player="4" id-row="${stt-1}" value="${data.games.player4.score[stt-1]}"></td>
                    </tr>
                    `);
                }
            })
        })

    $('#tableScore').on('change','input',function(e){
        console.log($(e.target).attr('id-row'));
        $.ajax({
            url: "http://localhost:6969/games/updateScore",
            method: 'PUT',
            data:{
                id,
                player:  $(e.target).attr('id-player'),
                row:  $(e.target).attr('id-row'),
                newScore:  $(e.target).val()
            },
            success: function(data){
                console.log(data);
            }
        })
    })

    })