'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// 如何架构一个项目
// 1.user stories 从用户角度思考，我的身份想要做什么 从中能得到什么益处
// 2. features 有用户的需求->需要实现什么功能
// 3. 构建流程图
// 4. 架构


// =============  地理 API  ==================== //

// 第一个函数为成功获取地理 第二个为失败
// 成功传入参数 地理对象
if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(function(position){
    // 基于 {x} 的变量
    // latitude = position.coords.latitide
    const {latitude} = position.coords;
    const {longitude} = position.coords;
    console.log(position);

    const coords = [latitude,longitude];

    // ============= 引用外部库 ==================== //
    // ============= Leaflet 地图 库 =============== //
    // 在html 里引用 自己去看()

    const map = L.map('map').setView(coords, 17);
    // (坐标,缩放)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // 引用库的方法
    map.on('click',function(mapEvent){

        form.classList.remove('hidden');
        inputDistance.focus();

        console.log(mapEvent);
        const {lat, lng } = mapEvent.latlng;

        L.marker([lat, lng]).addTo(map)
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup',
        }))
        .setPopupContent('Workout')
        .openPopup();
    })

},
function(){
    alert('Could not get');
});



// ===============  本地储蓄 ======================= //
// 调用web api 
// JSON.stringify(obj) 将js对象转换为字符串
// 不要存太多数据

const obj = {
    name: 'obj',
    year: 111,
};

const obj2 = {
    name: 'obj2',
    year: 222,
}

// 写入
localStorage.setItem('workouts',JSON.stringify(obj));
localStorage.setItem('workouts2',JSON.stringify(obj2));

// 读取
const objG = JSON.parse(localStorage.getItem('workouts'));
console.log(objG);

