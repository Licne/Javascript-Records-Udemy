'use strict';

///////////////////////////////////////
// Modal window

const btnScollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



// DOM //

// seleect elements
// document.getElementById('ssection--1');
// document.getElementsByTagName('button');
// document.getElementsByClassName('btn');

// add and insert ==============//

// const html = `<html></html>`
// .insertAdjacentHTML('afterbegin', html);

/*
const message = documney.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'That is a message.';

// 可以插入或移动
header.prepend(message);
header.append(message);

// 复制 不移动原来的
header.append(message.cloneNode(ture));

// 另一种
header.before(message);
header.after(message);
*/

//delete    ===========//

//message.remove();




//======= 风格 属性 类  ========//

// STYLE

// message.style.backgroundColor = '123456';
// message.style.width = '120%';
// message.style.height = getComputedStyle(message).height + 40 + 'px';

// 设置属性setProperty(属性名，值)
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// 类似标签里的 class = 'xxx' 同级
// logo.getAttribute('src');
// logo.setAttribute('属性名', '值');

// logo.classList.方法();

/////////////////////////////////////////////////
// ==================页面滚动===================//
//////////////////////////////////////////////////


// 取得元素的坐标 getBoundingClientRect 取决于窗口 是相对的
btnScollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
// e.target == btnScollTo
// 不使用.target 会报错

  console.log('当前页面滚动位置X/Y',window.pageXOffset,window.pageYOffset);
  console.log('当前页面高度宽度',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth);


// ===== 滚动 (x横坐标,y纵坐标)
// s1corords.top 相对于页面来说的坐标
//  window.scrollTo(s1coords.left + window.pageXOffset,s1coords.top + window.pageYOffset);

// window.scrollTo(options)
/*
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: window.pageYOffset,
    behavior:'smooth',
// 行为属性 smooth 平滑的
  })
*/

// 上边的比较老派，下边的是现代的，不用计算力 效果是一样滴
  section1.scrollIntoView({behavior: 'smooth'});

})



// ============================================== // 
//        悬停监听(不叫这名字) mouseenter          //
//=============================================== //

/*

const h1 = document.querySelector('h1');
h1.addEventListener('mouseenter', alertH1);
const alertH1 = function(e){
  alert('fuck you man~');
  
  h1.removeEventListener('mouseenter', alertH1);
  // 删除监听 可以让该监听只监听一次
};

*/

//====================== 捕获与冒泡  ============ //
// 当事件发生，事件先在dom树顶端生成，然后向下传递到发生的位置(捕获)
// 此后 事件向上开始冒泡，相当于父节点也进行了该事件
// 用人话说就是 当点击目标后 容纳目标的容器也相当于被点击了


// e.stopPropagation 停止冒泡，通常没啥用 
// e.addEventListener('xxx',func,true) 当写true时，e.target e.currentTaeget 监听捕获阶段



///========================= 导航栏 ==========================//
// ==========================事件委托 =======================//

/*
document.querySelectorAll('.nav__link').forEach(function(el) {
  el.addEventListener('click',function(e){
    e.preventDefault();
    // 阻止默认行为 例:herf = "#section__1";
    console.log('link');
    const id = this.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  })
})
*/

// 事件委托 evnet delegation 
// 1.将监听器添加到所有目标的公共元素中
// 2.确定使什么元素引发的事件

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
})




// ========================DOM 遍历 ============================ //

const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight')); //选择h1 中的 
console.log(h1.childNodes); //所有节点 包括textcont 一堆
console.log(h1.children); // 元素 <br> <span> 什么的
h1.firstElementChild.color = 'white'; 

//Going upwards: parents

console.log(h1.parentNode);
console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-primary)';

//Going sideways: siblings

console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);



// ================ 选项卡 切换 组件 ========================= //

const tabs = document.querySelectorAll('.operations__tab');

const tabsContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  if(!clicked) return; // 如果点到别的地方，找不到ope -- clicked = null ，阻断; 这样种写法更加的modern


  // remove
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  document
  .querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add('operations__content--active');
});


// ============= 导航条 虚化 =============================== //

const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

const nav = document.querySelector('.nav');


// pASSING "argument" into handler
// 我的理解是 首先bind 先把数值绑定 此时this-> 0.5(1) 之后返回一个函数
// 此时addE 传入目标 e e作为参数传入 handleHover 函数
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));



// ===================  粘性导航  ============================ // 

/*

const initialCoords = section1.getBoundingClientRect();

window.addEventListener('scroll', function(){
  console.log(window.scrollY);

  if(this.window.scrollY > initialCoords.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});

*/

// ================= intersection obsever API ================ //
// ===============交叉点观察者API ??? ======================== //
// 观察某个目标元素的方式变化与另一个元素或方式相交
/*
const obsCallback =function(entries,observer) {
  entries.forEach(entry => {
    console.log(entry);
  })
};

const obsOptions = {
  root: null,
  threhold:[0,1,0.2],
};

const observer = new IntersectionObserver();
observer.observe(section1);

*/


const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries;

  // inTntersecting 为entry内的属性

  if(entry.isIntersecting) nav.classList.remove('sticky');
  else nav.classList.add('sticky');

}

// 创建观察者 第一个参数为callback function 将侦测传入函数 函数可选两个参数
// ? entries 和 oberver
// 第二个参数为设定监视的窗口的对象，root不设定则默认为document也就是窗口
//  对象内 threhold 为触发函数时，root 与 目标重叠的百分比
// rootMargin 边框

const headerObserver = new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin: `-${navHeight}px`,
});

// 传入想监视的目标
headerObserver.observe(header);



// ==================== 滚动加载页面 ======================== //

const allSections = document.querySelectorAll('.section')

const revealSection = function(entries,observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
  // 触发后将不再监听
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15,
});
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})



// ================ Lazy loading images ==================== //

const imagTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries,observer){
  const [entry] = entries;
  console.log(entry);

  if(!entry.isIntersecting) return;

  // 替换 src 与 data-crc

  entry.target.src = entry.target.dataset.src;

  // 加载监听
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg,{
  root:null,
  threshold:0,
  rootMargin: '200px',
});

imagTargets.forEach(img => imgObserver.observe(img));



// ================== slide compoment =================== //

const slides =document.querySelectorAll('.slide');

let curSlide = 0;
const maxSlide = slides.length;

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(-800px)';

const dotContainer = document.querySelector('.dots');

const creatDots = function(){
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',`<button class = "dots__dot" data-slide ="${i}"></button>`)
  });
};

creatDots();

const activateDot = function(){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${curSlide}"]`).classList.add('dots__dot--active');
}

const goToSlide = function(){
  slides.forEach((s,i) => s.style.transform = `translateX(${100 * (i - curSlide)}%)`);
}

goToSlide();
activateDot();




const nextSlide = function(){
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  }else{
    curSlide++;
  }

  goToSlide();
  activateDot();
};

const prevSlide = function(){
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  }else{
    curSlide--;
  }

  goToSlide();
  activateDot();
};



btnRight.addEventListener('click',nextSlide);
btnLeft.addEventListener('click',prevSlide);

document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowLeft')prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    curSlide = slide;
    goToSlide();
    activateDot();
  }
});

// =============== More Event   ========================== //

document.querySelector('DOMContentLoaded',function(e){
});

// 当DOM 树转化完毕(HTML) 执行
// 如果js引用写在html末尾就没啥卵用

window.addEventListener('load',function(e) {
});

// 全部加载完毕

window.addEventListener('beforeunload',function(e){
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
  // 历史遗留问题
});

// 关闭页面时触发

// ========== js  不同形式加载 ================ //
// 写在html后 
// defer (延迟)
// async (异步)