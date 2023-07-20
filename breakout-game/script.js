const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;
const delay = 500;

// 创建小球
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4,
    visible: true

};
//创建挡板
const paddle = {
    x: canvas.width / 2 - 200,
    y: canvas.height - 20,
    w: 400,
    h: 10,
    speed: 8,
    dx: 0,
    visible: true 

};
//创建砖块
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
};
const bricks = [];
for (let i = 0; i < brickRowCount; i++){
    bricks[i] = [];
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x, y, ...brickInfo };
    }
}

//绘画小球
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = ball.visible ? '#0095dd' : 'transparent';
    ctx.fill();
    ctx.closePath();
};
//绘画挡板
function drawPaddle () {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = paddle.visible ? '#0095dd' : 'transparent';
    ctx.fill();
    ctx.closePath();
}
//创建砖块
function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}
//计分
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 100,30)
}

function movePaddle(){
    paddle.x += paddle.dx;

    if(paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w;
    }
    if(paddle.x < 0){
        paddle.x = 0;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    //墙壁碰撞
    if(ball.x + ball.size> canvas.width || ball.x - ball.size< 0) {
        ball.dx *= -1;
    }
    if (ball.y + ball.size> canvas.height || ball.y - ball.size < 0){
        ball.dy *= -1;
    }
    //挡板碰撞
    if (
        ball.x - ball.size > paddle.x &&
        ball.x + ball.size < paddle.x + paddle.w &&
        ball.y + ball.size > paddle.y
      ) {
        ball.dy = -ball.speed;
      }

    //碰撞砖块
    bricks.forEach(column => {
        column.forEach(brick => {
            if (brick.visible) {
                if (
                    ball.x - ball.size > brick.x &&
                    ball.x + ball.size < brick.x + brick.w  &&
                    ball.y + ball.size > brick.y &&
                    ball.y - ball.size < brick.y + brick.h
                ){
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                }
            }
        });
    });

    //撞到地上归0
    // if(ball.y + ball.size > canvas.height){
    //     showAllBricks();
    //     score = 0;
    // }

}

function increaseScore(){
    score++;
    if (score % (brickRowCount * brickColumnCount) === 0) {
        ball.visible = false;
        paddle.visible = false;

        setTimeout(function() {
            score = 0;
            showAllBricks();
            paddle.x = canvas.width /2 - 40;
            paddle.y = canvas.height - 20;
            ball.x = canvas.width / 2;
            ball.y = canvas.width / 2;
            ball.visible = true;
            paddle.visible = true;
        },delay)
    }
}
function showAllBricks(){
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        })
    })
}

function draw(){

    ctx.clearRect(0,0,canvas.width, canvas.height)
    drawBall();
    drawPaddle();
    drawBricks();
    drawScore();
}
function update() {
    moveBall();
    movePaddle();

    draw();

    requestAnimationFrame(update);
}
update();


//键盘时间
function keyDown(e) {
    if(e.key === 'Right' || e.key === 'ArrowRight'){
        paddle.dx = paddle.speed;
    }
    if(e.key === 'Left' || e.key === 'ArrowLeft'){
        paddle.dx = -paddle.speed;
    }
}

function keyUp(e){
    if(
        e.key === 'Right' || 
        e.key === 'ArrowRight' ||
        e.key === 'Left' ||
        e.key === 'ArrowLeft'
    ){
        paddle.dx = 0;
    }
}

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));