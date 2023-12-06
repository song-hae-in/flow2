let bob = {
    name : "bob",
    age : 99,
    money : 100
};

let {name:n , age:age, money:m, height: h =180} = bob;
let {money}  = bob;

console.log(n);
console.log(age);
console.log(m);
console.log(h);

console.log(money);
