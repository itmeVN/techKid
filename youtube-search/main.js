$(document).ready(function(){
    let USER_QUERY = "";
    let nexpageTokken;
// submit nút thì sẽ in ra kết quả tìm kiếm
    $('#search').on('submit',function(e){
        e.preventDefault();
        USER_QUERY = $('#keyword').val();
        console.log(USER_QUERY);   
        $.ajax({
            url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${USER_QUERY}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
            method : 'GET',
            success: function(data){
                    console.log(data);
                    nexpageTokken = data.nextPageToken;
                    // Xóa hết result list cũ để thay bằng result list mới
                    $('#result-list').html('');
                    for(let i=0;i<data.items.length;i++)
                    {
                        $('#result-list').append(`
                        <a class="result col-md-12" href='https://www.youtube.com/watch?v=${data.items[i].id.videoId}?autoplay=true' target= "_bank" >
                        <div class="video_infor">
                            <img src = "${data.items[i].snippet.thumbnails.high.url}">
                            <h2 class="title"> ${data.items[i].snippet.title} </h2>
                            <p class="Des"> ${data.items[i].snippet.description}</p>
                            <span>View >></span>
                        </div>
                        `)
                    }      
            },
            error: function(){
                console.log("Error!!");
            }
        })
    })
// Tự động tìm kiếm theo input mà không cần phải nhấn nút submit

$('#keyword').on('input',function(e){
        let searching = setInterval(function(){
            console.log('old query : ' + USER_QUERY);
            let old_USER_QUERY = USER_QUERY;
            USER_QUERY = $('#keyword').val();
            if(USER_QUERY === "")
            {
                $('#result-list').html('');
                clearInterval(searching)
            }
            else if( USER_QUERY === old_USER_QUERY)
            {
                clearInterval(searching);
            }
            else
            {
                e.preventDefault();
                $.ajax({
                    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${USER_QUERY}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw`,
                    method : 'GET',
                    success: function(data){
                            console.log(data);
                            nexpageTokken = data.nextPageToken;
                            $('#result-list').html('');
                            for(let i=0;i<data.items.length;i++)
                            {
                                $('#result-list').append(`
                                <a class="result col-md-12" href='https://www.youtube.com/watch?v=${data.items[i].id.videoId}?autoplay=true' target= "_bank" >
                                <div class="video_infor">
                                    <img src = "${data.items[i].snippet.thumbnails.high.url}">
                                    <h2 class="title"> ${data.items[i].snippet.title} </h2>
                                    <p class="Des"> ${data.items[i].snippet.description}</p>
                                    <span>View >></span>
                                </div>
                                `)
                            }      
                    },
                    error: function(){
                        console.log("Error!!");
                    }
                })
            }
           
        },1000)
    })



// Khi kéo đến hết trang thì tự động load thêm dữ liệu tìm được
    $(window).on("scroll", function() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if(nexpageTokken === undefined && USER_QUERY != "")
                alert("Het roi!!!");
            else if (USER_QUERY === ""){
                $('#result-list').html('');
            }
            else{
                $.ajax({
                    url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${USER_QUERY}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=${nexpageTokken}`,
                    method : 'GET',
                    success: function(data){
                            console.log(data);
                            nexpageTokken = data.nextPageToken;
                            for(let i=0;i<data.items.length;i++)
                            {
                                $('#result-list').append(`
                                <a class="result col-md-12" href='https://www.youtube.com/watch?v=${data.items[i].id.videoId}?autoplay=true' target= "_bank" >
                                <div class="video_infor">
                                    <img src = "${data.items[i].snippet.thumbnails.high.url}">
                                    <h2 class="title"> ${data.items[i].snippet.title} </h2>
                                    <p class="Des"> ${data.items[i].snippet.description}</p>
                                    <span>View >></span>
                                </div>
                                `)
                            }      
                    },
                    error: function(){
                        console.log("Error!!");
                    }
                })
            }
            
        }
    });


})


