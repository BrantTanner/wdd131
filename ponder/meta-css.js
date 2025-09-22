const PI = 3.14;
let radius = 3;

let area = radius * radius * PI

console.log(area)

radius = 20;

area = radius * radius * PI;

console.log(area);

const one = 1;
const two = '2';

let result = one + two;
console.log(result);

result = one + Number(two);
console.log(result);

let course = "CSE13"; //global scope (works outside the curly braces)
if (true) {
    let student = "John"; //local scope (variable is inside the curly braces)
    console.log(course); //works because in braces
    console.log(student);//works because in braces
}
console.log(course); //works because is global scope
// console.log(student); //does not work since it's local scope
