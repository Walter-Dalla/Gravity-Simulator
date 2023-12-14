const km = 1000

var configs = {
    p5:{
        scale: 0.006,
        x: 1000,
        y: 1000
    },
    math: {
        fixed: 5
    },
    earth:{
        x: 0,
        y: 0,
        mass: 1, //597200 * Math.pow(10, 24),
        radius: 6 * km
    },
    
    moons : [

        {
            x: 1,
            y: 10 * km,
            mass: 73476730900 * Math.pow(10, 22),
            radius: 2 * km,
            speedX: 0,
            speedY: 0,
            accelerationX: 0,
            accelerationY: 0,
            crash: false
        },

        {
            x: 0,
            y: 10 * km,
            mass: 73476730900 * Math.pow(10, 22),
            radius: 2 * km,
            speedX: 0,
            speedY: 0,
            accelerationX: 0,
            accelerationY: 0,
            crash: false
        },
        {
            x: 10 * km,
            y: 0,
            mass: 73476730900 * Math.pow(10, 22),
            radius: 2*km,
            speedX: 0,
            speedY: 0,
            accelerationX: 0,
            accelerationY: 0,
            crash: false
        },
        {
            x: -10 * km,
            y: 0,
            mass: 73476730900 * Math.pow(10, 22),
            radius: 2*km,
            speedX: 0,
            speedY: 0,
            accelerationX: 0,
            accelerationY: 0,
            crash: false
        },
        {
            x: 0,
            y: -10 * km,
            mass: 73476730900 * Math.pow(10, 22),
            radius: 2*km,
            speedX: 0,
            speedY: 0,
            accelerationX: 0,
            accelerationY: 0,
            crash: false
        },

        {
            x: 10 * km,
            y: 10 * km,
            mass: 73476730900 * Math.pow(10, 22),
            radius: 2 * km,
            speedX: 0,
            speedY: 0,
            accelerationX: 0,
            accelerationY: 0,
            crash: false
        },
        {
            x: -10 * km,
            y: 10 * km,
            mass: 73476730900 * Math.pow(10, 22),
            radius: 2*km,
            speedX: 0,
            speedY: 0,
            accelerationX: 0,
            accelerationY: 0,
            crash: false
        },
        {
            x: 10 * km,
            y: -10 * km,
            mass: 73476730900 * Math.pow(10, 22),
            radius: 2*km,
            speedX: 0,
            speedY: 0,
            accelerationX: 0,
            accelerationY: 0,
            crash: false
        },
        {
            x: -10 * km,
            y: -10 * km,
            mass: 73476730900 * Math.pow(10, 22),
            radius: 2*km,
            speedX: 0,
            speedY: 0,
            accelerationX: 0,
            accelerationY: 0,
            crash: false
        }
    ],
}

function setup() {
    createCanvas(configs.p5.x, configs.p5.y);
    background(220);
    
    drawCircles([configs.earth])
}


function mousePressed(){
    calculateMovement(configs.moons);
}

function draw() {
    drawCircles(configs.moons);
    calculateMovement(configs.moons);
}

function drawCircles(objects){
    strokeWeight(200);
    scale(configs.p5.scale, configs.p5.scale);

    objects.forEach(moon => {
        circle(moon.x + width * 80, -moon.y + height * 80, moon.radius);
    });
}

function calculateMovement(objects){
    objects.forEach(moon => {
        if(moon.crash){
            return;
        }
        
        calculateAcceleration(moon);
        calculateSpeed(moon);
        calculateSpace(moon);
    });
}

function calculateAcceleration(moon){
    const gravity = 9.81;
    
    var alfa = 0;
    if(moon.y == 0){
        if(moon.x > 0) {
            alfa = 3*Math.PI/2;
        }
        else {
            alfa = Math.PI/2;
        }
    }
    else if(moon.x == 0){
        if(moon.y > 0){
            alfa = Math.PI;
        }
        else{
            alfa = 0;
        }
    }
    else {
        tang = moon.y/moon.x;
        alfa = Math.atan(tang);
    }

    const cos = Math.cos(alfa);
    const sin = Math.sin(alfa);
    
    var gravityY = gravity*cos;
    moon.accelerationY += gravityY;

    var gravityX = gravity*sin;
    moon.accelerationX += gravityX;
    
}

function calculateSpeed(moon){
    moon.speedX += moon.accelerationX;
    moon.speedY += moon.accelerationY;
}

function getDistanceFromOrigin(x, y){
    const distance = round(Math.sqrt(round(Math.pow(x, 2)) + round(Math.pow(y, 2))));
    return distance;
}

function round(num){
    return (Math.round(num * 100) / 100)
}

function calculateSpace(moon){
    moon.x += moon.speedX;
    moon.y += moon.speedY;

    const distance = getDistanceFromOrigin(moon.x, moon.y);
    
    if(moon.radius + configs.earth.radius > distance + 2* moon.radius || distance >= 50000  ) // por alguma rasão tenho que add o diametro da lua aqui
        {
            console.log("crash!")
            
            moon.speed = 0;
            moon.accelerationX = 0;
            moon.accelerationY = 0;
            moon.crash = true;
        }
}
