// import { addToCart, totalPrice as price, tq } from './shoppingCart';
// console.log('Export module');

// // 会首先执行 import里边的
// // as 把... 看作 ...
// // export 里也可以这样

// addToCart('bread', 5);
// console.log(price, tq);

// import * as ShoppingCart from './shoppingCart.js';
// // 看作为一个对象
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// import add, { cart } from './shoppingCart.js';
import add from './shoppingCart.js';
add('bread', 5);
// 默认导出
// 不要混合使用默认导出 和命名导出
add('apple', 5);
add('bananas', 5);

// console.log(cart);

// ES2022 我们可以使用await 在 异步之外 但 只适用 import
const res = fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json();
// top-level await 这里的await 会阻塞进程
console.log(data);

const getLastPost = async function () {
  const res = fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  console.log(data);

  return { title: data.at(-1).title, text: data.at(-1).body };
};

const lastPost = getLastPost();
console.log(lastPost);
// 此处 lastPost 为 pending

// 此处使用 top-level await
const lastPost2 = await getLastPost();
console.log(lastPost2);

// 模块编程 P274 闭包小知识
// SE6 之前的模块化编程

// Common js >> node.js 非知识点

// dir/ls 目录
// cd.. 返回上一级
// cd xxx
// clear 清空
// touch xxx.js xxx.txt 创建多文件
// del 删除
// mv name ../ 移动文件到上一级
// mkdir 新建目录
// rmdir 删除目录(mac)

// =================  使用npm
// npm -v 版本
// npm init ? 创建一个json 包括巴拉巴拉

// npm install xxx 安装包
// npm i xxx 同

// 简单使用lodash 进行深度克隆
import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'bread', quantity: 5 },
  ],
  user: { loggedIn: true },
};

const stateClone = Object.assign({}, state);
state.user.loggedIn = false;
console.log(stateClone);

const stateDeepClone = cloneDeep(state);
console.log(stateDeepClone);

// 如果你失去了你的node_nodules 可以使用 npm i 找回
// 前提你拥有json(

// =========== Pracel

// npm i parcel --save-dev
// npx parcel index.html

// 第二种 npm run start
// start 为 在package.json 中写的脚本
// "start": parcel index.html

// npm run build
// build 为 脚本
// "build": parcel build indexl.html


// 只有parcel 能理解 不会进入最终的包中
// 热模块重装 用于维护页面
if (module.hot) {
  module.hot.accept();
}


import 'core-js/stable';
// 用于转化find promise 等 ES6 的东西 ?

// polifilling async functions 
import 'regenerator-runtime/runtime';


// ============== 干净现代的js语法 