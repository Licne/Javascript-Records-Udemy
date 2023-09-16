'use strict';

// ES5 函数参数默认值
// a = a ||1;
// ES6 形参 = 值
// 当传入undifined意味着使用默认值

// 函数返回函数 函数作为一个值
const greet = greeting => name => console.log(`${greeting} ${name}`);
// 以上为箭头函数简化 实际 第一个函数要
// return function (name){内容};




// call函数 允许手动设置this指针，用于不同对象
// apply 第二个参数需要是数组，在现代js中 不太用乐，数组可以使用'...'之后用call 
const team1 ={
    tGroup: 'Fire',
    id: 't1',
    list: [],

    addTeam (Num, name){
        console.log(
            `The ${name} has ${Num} in ${this.tGroup} with id is ${this.id}`
        );
        this.list.push({books: `${this.id}${Num}`,name});
    },
};

const team2 = {
    tGroup: 'Yama',
    id: 't2',
    list: [],
};

const book = team1.addTeam;
// book(120,'FF1'); 不工作，this指向未定义

book.call(team2, 120, 'FF1');
// 第一个参数 改变作用的对象
 

// bind 绑定，bind返回新函数,不绑定跳过用null
const bookT2 = book.bind(team2);
bookT2(11,'WT2');
const bookT22 = book.bind(team2,178);
bookT22('WT4');



// 立即执行函数 将(function(){内容})();
// (() => {})
// 实际上是将函数当作参数，外边的括号假装是个函数，创建作用域，用于封装?


// array篇

let arr = [1,2,3,4,5,6,7];

// 读取，返回数组 索引 [2,4)，-1为最后一个以此类推同字符串
// array.slice(2,4)

arr.slice(2,4);


// 提取 删除原来的提取出来
// array.splice(index,number,item ...) 从索引index 开始 删除number个 

// 反向 改变了原始的数组    !!!
// array.reverse(arr);

// 连接 连接数组
// arr1.concat(arr2);
// [...arr1,...arr2] 同

// 连接成字符串，字符串章节有
// array.join('-');

// 传统 arr.at(0) === arr[0] (适用字符串)
// array.at(-1) 找最后的元素

// 遍历 相当于 for of 数组，每次会将元素传给函数
// array.forEach(function(当前元素，索引，整个数组){});\
// break等无效
arr.forEach(function(numb,index,arr){
    console.log(numb * 5);
})
console.log('------FOREACH------');

// forEach
// 作用于MAP
// (value,key,map) 参数
// 作用于SET value = key0 


// ======================D O M========================//

// 添加html代码
// const html = `<html></html>`
// .insertAdjacentHTML('afterbegin', html);


// 修改标签内的html
// .innerHTML = ''; //清空代码


//=============数据转换 map fliter reduce==============//

const notChange = [5,48,75,89,165,-233,-456,-742];

// map 类似于映射? 返回一个变换后的数组
// arr.map (function(item,index,arr))
/*
1 --- 2
3 --- 6
...
512 === 1024 
*/

const mapChange = notChange.map(function(cha){
    return cha * 2;
});
console.log(mapChange);
// 如果 return 23;
// 则 输出的数组为 [23,23,23,23,23] 新数组每一个元素对应return

// fliter 过滤 滤波器(不是) 
// arr.fliter(function(mov){return mov > 0});
// return mov > 0; 大于0的返回，mov是形参

const fliterChange = notChange.filter(mov => mov > 0);
console.log(fliterChange);


// reduce 累加 
//const value = arr.reduce(function(acc,cur,i,arr),0) 累加器 当前值 索引 数组 '0'=初始值

const reduceChange = notChange.reduce((acc,cur) => acc + cur,0);
console.log(reduceChange);

// find 寻找 返回第一个找到的 findindex 其他都一样，返回索引
// arr.find(mov => mov > 0) 寻找满足条件的
// arr.find(mov +> mov.properties === 'the data') 允许寻找对象中的匹配的元素，返回对象

// some arr.some(function(mov => mov > 0)) 判断是否有元素符合条件 返回布尔值
// every 同上，但判断所有元素

// flat(深度) 平铺
// arr.flat(4) 平铺四层

// flatMap() map+flat 只深入一层

// arr.sort((a,b) => {}) 排序，不填默认为字符串排序 会直接改变数组
// return <0 a,b 不交换
// return >0 b,a 交换

// fill 填充 arr.fill(内容,起始索引,结束索引) [起始,结束)
// new Array(6) 单个数字，会创建6个空元素的数组

// const y = Array.from({length: 7}, (cur , i) => i+1)
//创建一个数组 长度为7 填充以函数


// P155 什么时候用什么函数