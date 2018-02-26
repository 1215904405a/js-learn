function foo() {
console.log( a ); // 输出2和其他语言动态作用域（3）不同
}
function bar() { var a = 3;
foo(); }
var a = 2; bar();
