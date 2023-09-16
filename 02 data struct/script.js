'use strict';

// 数组解构
const arr = [0,1,2];
const [x,y,z] = arr;
console.log(x,y,z);
// const[x, ,z] = arr; 跳过
// 一种交换的方式 [x,y] = [y, x]
// 可以使用函数套上方内容
// 可以数组嵌套数组进行解构
// 初试化数组也可以 
// [x = 1,y = 1, z= 1,] = [2,2];



// 对象解构
const backpack = {
    money: [1,23,64],
    food: 'rice',
    weapon: 'sword',
    smallBackpack:{
        price: 1
    }
}
// const {money, food, weapon} = backpack;
// 名称需要匹配
// 自定义名字只需要 例:name:name222
// 初始化默认值 name:name222 = 'gg'
let money = 2, food = 3;
// 用变量结构如果没有()，会认为{}块。块不能赋值，所以需要加个()
({money,food} = backpack); 
// 结构对象
const {smallBackpack:{price : pri}} = backpack;



// 拓展运算符 '...'
const arr2 = [7,8,9];
const newarr2 = [1,2,...arr2];
console.log(newarr2); 
console.log(...newarr2); // 1 2 7 8 9 
// 可以用于传参
// 可以达成复制对象
// const a = {...b};




//rest pattern
const [a,b,...others] = [1,2,3,4,5];
// a, b会赋值，剩余的进入others;
// others = [3,4,5];
// rest 需要放在最后一个 
// 用于函数传递自定义数量参数
const restP = function(...numbers){
    console.log(numbers);
}


// ?? 空赋值操作符 
let xxx;
const xx = xxx ?? 10 ;
// xx = 10 当xxx为null或undefined时候，不包括0,''
// 相同👇 && ??
let a2;
let a1 = a2 || 10;
a1 ||= 10;



// for of 循环
const menu = ['gold','sliver','copper'];
for (const item of menu ) console.log(item);
// entries 函数
// 将数组变为[索引,内容]的形式进行解构
for (const item of menu.entries()) console.log(item);


// ES6增强文字写法 详见P104-112

// 可选链接

const withOptional = {
    withOp:{
        name: 1
        //fuck: 2
    }
}

console.log(withOptional.withOp?.fuck);
// undefined 不使用?.会报错 
console.log(withOptional.order?.(0,1));
// 方法 数组也适用



// object.keys() 返回对象的属性名
// object.values() 返回对象的值
//object.entries() 同上方数组




// Set 集 中属性唯一
// 没有索引 顺序不重要
const aSet = new Set([
    'copper',
    'copper',
    'copper',
    'silver',
    'silver',
    'gold',    
]);

console.log(aSet);

console.log(new Set('copper')); 

console.log((aSet.size)); // 3
console.log(aSet.has('diamond')); // false

// add and delete clear
aSet.add('diamond');
aSet.delete('copper');
// aSet.clear();


// for(const order of aSet) console.log(aSet); 不能适用

const notSet = ['copper','copper','copper','silver','silver','gold']

const anotherSet = new Set(notSet);
console.log(anotherSet);
const anotherSet2 = [...new Set(notSet)]; // 成为数组
console.log(anotherSet2);



// Maps 
// 对象存有键值对，其中的键可以是任何数据类型

const person = new Map();


const out1 = person.set('name','alice');
console.log(out1); 
// map.set() 返回该map
// 为 Map 对象中的键设置值

// 键 允许为 数字 布尔 字符串
// 键值也允许为数组
person
    .set(1,'1a')
    .set(true, 'the true')
    .set('arr',[1,2,3,4]);

console.log(person);

// map.get() 取值
console.log(person.get(1));

// map.delete() 删除
// map.size
// map.clear
// map.keys
// map.values

// 数组作为键的情况
// person.set([1,2],'it\s a arr'); 
// console.log([1,2]); //undefined '[1,2]'并不算一个对象 ?

const arrIn = [1,2];
person.set(arrIn,'it\s a arr');
console.log(person.get(arrIn));

// 键也可以是html中的标签(对象)
// person.set(document.querySelector('p'),'p');
// console.log(document.querySelector('p').textContent);

// 令一种更方便的方式

const question = new Map([
    [1,'a'],
    [2,'b'],
    [3,'c'],
]);

const backpackMap = new Map(Object.entries(backpack));





// string 
// 1.同数组

const plane = '3u8294';
const school = 'tong shan zhong zhuan';
console.log(plane[2]);
console.log('b123'[0]);
console.log(plane.length);

// string.indexOf('a')首个字母的索引
// string.lastIndexOf('b')末尾
// 允许'ab'
// -1 没找到

// string.slice(4); 提取某索引开始后边的
// string.slice(4,7); 开始索引-结束索引 长度为7-4
console.log(plane.slice(2,4)); //范围 [2,4)
console.log(school.slice(0, school.indexOf(' ')));
console.log(school.lastIndexOf(' ')+1);
//参数为负 末尾为-1
console.log(plane.slice(-2)); //94
console.log(plane.slice(1,-1)); //u829


//大小写输出
//string.toLowerCase/toUpperCase ()

//输出空格去掉
// string.trim();

// 替换 a->b 只替换第一个
// string.replace('a','b');
// 替换全部 因为课程没字幕，查也看不懂就先记录一下 
// string.replace(/a/g,'b')

// 判断是否存在，输出booleans值
// const isIncludes = string.includes('abc');

// 判断开头结尾是否为目标字符串，输出Booleans
// string.starts/endsWith('start')

// 分割 'its my copper and gold' 输出为一个数组
// string.split(' ')

// 添加 数组->字符串
// string.join(' ')
const sstring = 'its my copper and gold';
const jarr = sstring.split(' ');
console.log(jarr);
const jstring = jarr.join('===');
console.log(jstring);

//填充 在开头和结尾 达到一定长度例为30 输出字符串
// string.padStart/End(30,'+)
console.log(sstring.padStart(30,'+').padEnd(40,'-'));

//重复输出
//string.repeat(5)








// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.querySelector('.check').addEventListener('click',function(){
    const check = document.querySelector('.in').value;
    const cutCheck = check.split('\n');
    for( const [i, row] of cutCheck.entries()){
        const [ichi ,ni] = row.toLowerCase().trim().split('_');
        const out = `${ichi}${ni.replace(
            ni[0],
            ni[0].toUpperCase()
            )}`;
        console.log(`${out.padEnd(20)}${'✅'.repeat(i + 1)}`);
    }

});


