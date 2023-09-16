'use strict';

//List


// js原生选择器
// documnet.querySelector(); 返回元素;
// 读取textContent属性，👇;
document.querySelector('.message').textContent;
// 读取输入的value属性
document.querySelector('.guess').value;

// 读取css中的background-color属性

/*

document.querySelector('body').style.backgroundColor = 'red';

*/

// 注意属性后的要为String 不能写30rem 要写'30rem'

// DOM:允许js改变html,css中的元素
// documet看作一个特殊的对象，我门可以在在js中访问
document.querySelector('.message').textContent = 'I change the message'

// DOM !== Javascript
// DOM 实际上是WEB API的东西的一部分
// 我们可以从javascrpt中访问

// 添加事件监听 event handle 事件处理程序
// addEventListener(事件，函数)



document.querySelector('.check').addEventListener('click',function(){
    console.log(document.querySelector('.guess').value);
});



// 随机数 Math.random() 范围0-1
// Math.trunc() 省略小数部分
// 1-20
Math.trunc(Math.random()*20)+1;

// 全选类名
const theOpen = document.querySelectorAll('.open');
for(let i = 0; i < theOpen.length ; i++){
    console.log(theOpen[i].textContent);
}

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.close');
const closeFun = function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
// 读取classList并改变
// 注:此处for循环闭包监听有问题💫
for(let i = 0; i < theOpen.length ; i++)
theOpen[i].addEventListener('click', function(){
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

close.addEventListener('click', closeFun);
overlay.addEventListener('click', closeFun);

// 读取键盘上的按键 此处还有keyup keypress 
// 传入的e为按下按键的对象，包含其所有的属性
// contains 包含
document.addEventListener('keydown', function(e){
    console.log(e.key);
    if(e.key === 'Backspace'){
        if(!modal.classList.contains('hidden')){
            closeFun();
        }
    }
    
})


// arguments ?
// this ?
// 以上二者具有繁杂知识点
// 教程087章节涉及许多原理性理论，注意回顾


// 如何复制对象(js底层原理理解)
const thefirstObject = {
    thedata1: 1;
}
Object.assign({},thefirstObject);
// 仅适用于第一层，如果对象里还有对象就没法完全复制
// 深度克隆咱不教(

