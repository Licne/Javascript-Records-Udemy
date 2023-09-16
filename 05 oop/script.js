'use strict'

// ================ 构造函数 ============== //
const Person = function(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
    console.log(this);

    // 不要搁构造函数里定义
    // this.calcAge = function () {
    //     console.log('Never to this')
    // };
}

const licnev = new Person('licnev', 2003);

// 1. new {} is created 空对象
// 2. function is called , this = {}
// 3. {} linked to prototype 连接到原型
// 4. 函数自动返回从一开始那个空的对象

const rifuru = new Person('rifuru',322)

// js 并没有传统的类

// 判断是否为某类的对象 ? 
console.log(rifuru instanceof Person);


// =============  原型继承 ================== //

// Propotypes
// 每个函数都有一个原型的属性
// 通过函数建立的对象 可以访问通过prototype创建的方法
Person.prototype.calcAge = function() {
        console.log('Should to this');
};

licnev.calcAge();

// __proto__ 第三步创建 连接原型
console.log(licnev.__proto__);
console.log(licnev.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(licnev));

Person.prototype.species = 'human';
console.log(licnev.species, rifuru.species);
console.log(licnev.hasOwnProperty('firstName')); //true
console.log(licnev.hasOwnProperty('species')); //false

// calcAge 和 species 并不是person的原型 但是 可以通过对象来访问

// =================== 原型链 ============================= //

console.log(licnev.__proto__.__proto__);
// object.prototype is the top
console.log(licnev.__proto__.__proto__.__proto__);

const arr = [3,4,5,6,7,1,3,3,3,3,8,9];
console.log(arr.__proto__ === Array.prototype);

// 仅用测试，最好别这样
Array.prototype.unique = function() {
    return [...new Set(this)];
}
console.log(arr.unique());

// ==================ES6 modern ============================ //
// 语法糖

// 我超! 家的感觉( 

// const PersonCl = class {} 
// 本质还是个函数 拥有声明，表达式
class PersonCl {
    constructor(firstName,birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

    // 实际还是prototype
    calcAge() {
        console.log('yeah home');
    };

    static hey() {
        console.log('hey');
    }
}

const lorina = new PersonCl('lorina', 2003);
console.log(lorina);
lorina.calcAge();

console.log(lorina.__proto__ === PersonCl.prototype);

PersonCl.prototype.greet = function(){
    console.log('hello hello');
}

lorina.greet();

// 1.类没有被提升，不能先用后声明
// 2.class are first-calss citizes
// 3.类会以严格模式进行 即使你没说


// getter and setter assessor 属性 其他 data 属性
// 咱也不知道有啥用 get 取得 set 设置
// 可以理解为变量式函数?

const account = {
    owner : 'licnev',
    movements : [12,13,46,45], 

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    },

};

console.log(account.latest);

account.latest = 50;

//============= Static Methods ========= //
// 不使用原型继承，需要使用类进行调用
//Array.from()
// 见上方class 类

PersonCl.hey();


// =========== Object.create() ================= //
// 第三种 oop
// 最少用到的 

const PersonProto = {
    calcAge() {
        console.log('yeah home');
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const ayarin = Object.create(PersonProto);
console.log(ayarin.__proto__ === PersonProto);

const Shiro = Object.create(PersonProto);
Shiro.init('Shiro', 0);


// ============  继承 ======================== //
// 我超，又是家的感觉

const life = function(firstName,birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};

life.prototype.calcAge = function() {
    console.log(this.birthYear);
};



const human = function(firstName,birthYear,kind) {
    // 构造 ******
    life.call(this,firstName,birthYear);
    this.kind = kind;
};

// 必须写在函数前边 如果写在后边 会覆盖
// 原型链连接
human.prototype = Object.create(life.prototype);

human.prototype.wtKind = function () {
    console.log(this.firstName + ' is ' + this.kind);
};

const meru = new human('meru',2020,'majyo');
meru.wtKind();
meru.calcAge();



///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀

1. 使用构造函数实现一个电动汽车(EV)作为Car的CHILD“类”。除了制造和当前速度，电动汽车也有当前电池充电%(“充电”属性);

2. 实现一个'chargeBattery'方法，它接受参数'chargeTo'，并将电池电量设置为'chargeTo';

3.执行一种“加速”方法，将汽车的速度提高20，并减少1%的电量。然后记录这样一条信息:“特斯拉以140公里/小时的速度行驶，充电22%”;

4. 创建一个电动汽车对象，并尝试调用'accelerate'， 'brake'和'chargeBattery'(充电到90%)。注意当你“加速”时会发生什么!提示:回顾多态性的定义😉



数据车1:“特斯拉”时速120公里，充电23%
*/


const Car = function(make, curSpeed){
    this.make = make;
    this.curSpeed = curSpeed;  
};

const EV = function(make, curSpeed, batCharge){
    Car.call(this,make,curSpeed);
    this.batCharge =batCharge;
}

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function(chargeTo) {
    this.batCharge = chargeTo;
};

EV.prototype.accelerate = function(){
    this.curSpeed += 20;
    this.batCharge--;
    console.log(`${this.make} going at ${this.curSpeed} km/h, with a charge of${this.batCharge}%`);
}

const tsl = new EV('Tesla',120,23);

tsl.chargeBattery(25);
tsl.accelerate();

// ================ EX6 继承 ====================== //
class StudentCl extends PersonCl{
    // 不需要传递子类新参数甚至构造函数都不用写
    constructor(fullName,birthYear,course){
        // 传递给父类，不需要指定乐
        // 总是需要第一个发生
        super(fullName,birthYear);
        // this.course = course;
    }
}

// =========== 隐私保护 =================== //
// 类字段 仍然还在开发 19 目前据说已经完成

// Pulic Private fields and methods 
// 和他们四个的static形式

const sirome = new StudentCl('sirome cor',314);
sirome.calcAge();


class Account {

    // Public fields 
    tacale = navigator.language; //重点分号与没有const 不在原型链上
    

    //Private fields 无法外部访问
    // 不能在里边定义👇
    #movements = [123];
    #pin;

    constructor(owner,currency,pin){
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin; 

        // protected property
        // 并不是真正的私有 只是一种规则(
        // this._movements = [123];
    };

    // Private methods
    #approveLoan(val){
        return true;
    }

    deposit(val) {
        this.currency += val;
        return this;
    }
}

const myAc = new Account('me',123,114514);
// myAc.#approveLoan(1);
// console.log(myAc.#movements); 报错


//  =============== Chainging ================== //

myAc.deposit(200).deposit(300).deposit(-15);
//在函数返回时 使用return;


