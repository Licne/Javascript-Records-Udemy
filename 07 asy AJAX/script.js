'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

// AJAX
// XML HTTP 请求方式 比较古老
// 现在用的更多的是 JSON = 一大串字符 可以转换为js 的对象
const request = new XMLHttpRequest();
// 获取数据简称'GET'
// github public-apis
// 此处是异步的
request.open('GET', 'https://restcountries.com/v3.1/name/china');
request.send();

request.addEventListener('load', function () {
  // console.log(this.responseText);
  // JSON.parse 转化为对象
  const [data] = JSON.parse(this.responseText);
  console.log(data);

  const html = `
    <article class="country">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}people</p>
      <p class="country__row"><span>🗣️</span>${data.languages.zho}</p>
      <p class="country__row"><span>💰</span>${data.currencies.MOP.name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.getElementsByClassName.opacity = 1;
});

// 数据均能获取，但本地报错 据查为需要进行跨域 知识水平无法解决 暂时搁置

// ================== 欢迎来到 回调地狱！ ================== //
// 为了按顺序执行异步
// 回调 套 回调 再套 回调
// 简称 回调地狱
// 让代码难以理解 维护困难

setTimeout(() => {
  console.log('1s');
  setTimeout(() => {
    console.log('2s');
    setTimeout(() => {
      console.log('3s');
      setTimeout(() => {
        console.log('4s');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// Promise and fetch

const request_F = fetch('https://restcountries.com/v3.1/name/china');
console.log(request_F); // 返回了一个Promise

// 可以说是异步传递值的容器
// 未来值的容器 或 占位符
// 操作序列
// Promise ES6
// 时间敏感 随时间变化?
// Pending -> 确定settled (fulfiied) -> 生成一个值
//                  🔑   (rejectedf) -> Error
// 只被解决一次 之后保持不变
// 需要由fetch 创建

// 消费承诺
// Promise 可以使用then(function(接受一个Response参数))
// JSON 可以用于所有fetch
// 直接返回的fetch不可以直接用 要JSON一下
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json(); // 可用 此处json其实也是个异步函数 它也会返回一个承诺 不知道有啥用
    })
    .then(function (data) {
      console.log(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) return;

      return fetch(`https://restcountries.com/v3.1/name/${country}`);
      // return 23;
    })
    .then(response => response.json())
    .then(data => console.log(data));
};

// 化简为 .then(response => respomse.json()).then(data => func);

// Chaining Promise
// then总是返回一个promise 无论我们是否return
// 但是如果我们确实返回了个值 该值会成为履行值 fulfiled 的承诺

// ===================== 承诺的错误处理
// 在承诺种错误处理
// 被拒绝的承诺
// 两种处理被拒绝的promise
// 1.传递第二个回调函数
// .then(resposnse => response.json(), err => alert(err)); 捕捉错误
// 2.在链的最后加 .ctach(err => alert(err));
// 即可作用链全部的地方

// finally 无论promise 是否拒绝
// 在末尾都会被调用

// fetch 只拒绝断网时候的状态，像404什么的不行

// ================ 404 的处理 =============== //
// response.ok
// response.status

// if(!response.ok)
// throw new Error(`${response.status}`)
// throw 立即终止当前功能
// 并且返回的承诺会是一个拒绝的承诺，然后一直走到catch

// 事件循环 257
console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
console.log('Test end');

// Test start
// Test end
// Resolved promise 1 (微服务插队)
// 0 sec timer 回调

// ============= 建立自己的承诺

// 一种特殊的对象 接受一个参数 执行器函数?
// 当promise 构造开始运行 他会自动执行里边的excutor 函数
// 此函数包含异步行为 最终产生一个值 是承诺的未来价值
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('start open money');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('you win'); // 传递promise已实现的值
    } else {
      reject('you lost your money🔨'); // 这俩其实是就是下方的err
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

/////////
// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('I waited for 1 seconds🧶');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 s'));

// 对应之前的回调地狱
wait(2)
  .then(() => {
    console.log('I waited for 1 seconds🧶');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 1 seconds🧶');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 1 seconds🧶');
    return wait(1);
  })
  .then(() => {
    console.log('I waited for 1 seconds🧶');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 s'));

// Promise.resolve('往后传的值').then();
// Promise.reject()

// =========== 同步等待 Async_Await

// 定义异步函数
const whereAmI = async function (country) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  // then 的语法糖
  console.log(res);
  const data = await res.json();
  console.log(data);
};

// ========== await 的错误处理
// try ... catch
/*
 
try {
  let y =1;
  const x = 2;
  x = 3;
} catch(err) {
  alert(err.message);
}
*/


// ========= Promise.all
// const a = await Promise.all([promise1,promise2,promise3])
// 让承诺同时发生
// 接受一个数组，返回一个数组

// 短路
// 如果一个承诺拒绝了，整个承诺也都拒绝了
// 组合函数 👆
// ==========其他 组合函数

//Promise.race  比赛
// 接收一个数组 返回一个promise 哪个加载快返回哪个，无论是否拒绝

// 应用设置一个定时器，到时间没加载成功就拒绝


//Promise.allSettled 返回数组，所有已确定的承诺，不会短路
//Promise.any [ES2021]
// 接受一个数组 和race的区别 无视拒绝的 返回第一个确定的，除非都拒绝