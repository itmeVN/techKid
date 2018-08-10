//  funName1(5);
// // Có thể gọi trước khi khai báo 
//  function funName1(age){
//     console.log(age);
// }
// // Không thể gọi trước khi khai báo
// const  funName = function(age) {
//     console.log(age);
// }
// funName(6);
// // ES6 không thể gọi trước khi khai báo 
// const funName2 = (age) => {
//     console.log(age);
// }
// funName2(7)
// function print(){
//     let a =6;
// }
// print();
// console.log(a);

function fun(num){
    for(let i=num;i>=0;i--){
        setTimeout(function(){
            console.log(i);
        }, 1000*(num -i));
    }
}

fun(5)
fun(5)

