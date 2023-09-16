//exporting module


// // 阻塞代码
// console.log('Start fetching users');
// const res = await fetch('https://jsonplaceholder.typicode.com/users');
// console.log('Finish fetching');





console.log('Exporting module');
// 私有作用于当前模块
const shoppingCost = 10;
const cart = [];

// 命名导出
export const addToCart = function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${product} ${quantity} add to cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

export { totalPrice, totalQuantity as tq };

// 默认导出
export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${product} ${quantity} add to cart`);
}


