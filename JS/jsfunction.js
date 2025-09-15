// function Hello(user="guest"){
//     console.log(`hello ${user}`);
// }

// Hello();

// function sum(a,b){
//     console.log("before return: ");
//     return a+b;
// }
// console.log("After return: ");
// console.log(sum(1,6));
// console.log(sum());

// const hello=()=>console.log("hello world");
// hello();

const add=(a,b)=>(a+b);
// console.log(add(2,5));

function hello(user, callback){
    console.log(`hello ${user}`);
    callback();
}

hello('admin',()=>{
    console.log(add(4,5));
});

