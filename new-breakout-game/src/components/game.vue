<script >
import { ref, onMounted} from 'vue';
import inputBox from './inputBox.vue'
import rankTable from './rankTable.vue'
import endBox from './endBox.vue';

export default {
    components :{
        inputBox,
        rankTable,
        endBox,
    },
    data(){
        return{
            ball:{
                x: 0,
                 y: 0,
                size: 10,
                speed: 4,
                dx: 4,
                dy: -4,
                visible: true
            },
            paddle: {
                x: 0,
                y: 0,
                w: 100,
                h: 10,
                speed: 8,
                dx: 0,
                visible: true 
            },
            brickRowCount : 9,
            brickColumnCount : 5,
            brickInfo: {
                w: 70,
                h: 20,
                padding: 10,
                offsetX: 45,
                offsetY: 60,
                visible: true
            },
            bricks : [],
            animationId: null ,
            score : 0,
            playerName: '',
            players: [],
            gameStarted: false,
            gameOver: false,
        }
    },
    methods: {
        drawBall() {
            const ctx = this.$refs.canvas.getContext('2d');
            ctx.beginPath();
            ctx.arc(this.ball.x, this.ball.y, this.ball.size, 0, Math.PI * 2);
            ctx.fillStyle = this.ball.visible ? '#075985' : 'transparent';
            ctx.fill();
            ctx.closePath();
        },
        drawPaddle() {
            const ctx = this.$refs.canvas.getContext('2d');
            ctx.beginPath();
            ctx.rect(this.paddle.x, this.paddle.y, this.paddle.w, this.paddle.h);
            ctx.fillStyle = this.paddle.visible ? '#075985' : 'transparent';
            ctx.fill();
            ctx.closePath();
        },
        drawBricks() {
            const ctx = this.$refs.canvas.getContext('2d');
            this.bricks.forEach(column => {
            column.forEach(brick => {
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible ? '#075985' : 'transparent';
            ctx.fill();
            ctx.closePath();
            });
        });
        },
        createBricks(){
            for (let i = 0; i < this.brickRowCount; i++){
                this.bricks[i] = [];
                for (let j = 0; j < this.brickColumnCount; j++) {
                    const x = i * (this.brickInfo.w + this.brickInfo.padding) + this.brickInfo.offsetX;
                    const y = j * (this.brickInfo.h + this.brickInfo.padding) + this.brickInfo.offsetY;
                    this.bricks[i][j] = {x, y, ...this.brickInfo };
                }
            }
        },
        moveBall() {
            this.ball.x += this.ball.dx;
            this.ball.y += this.ball.dy;
            //墙壁碰撞 
            if(this.ball.x + this.ball.size> this.$refs.canvas.width || this.ball.x - this.ball.size< 0) {
                    this.ball.dx *= -1;
                }
            if (this.ball.y + this.ball.size> this.$refs.canvas.height || this.ball.y - this.ball.size < 0){
                    this.ball.dy *= -1;
                }
            //挡板碰撞
            if (
                this.ball.x - this.ball.size > this.paddle.x &&
                this.ball.x + this.ball.size < this.paddle.x + this.paddle.w &&
                this.ball.y + this.ball.size > this.paddle.y
            ) {
                this.ball.dy = -this.ball.speed;
                }

            //砖块碰撞
            this.bricks.forEach(column => {
                column.forEach(brick => {
                    if (brick.visible) {
                        if (
                            this.ball.x - this.ball.size > brick.x &&
                            this.ball.x + this.ball.size < brick.x + brick.w  &&
                            this.ball.y + this.ball.size > brick.y &&
                            this.ball.y - this.ball.size < brick.y + brick.h
                        ){
                            this.ball.dy *= -1;
                            brick.visible = false;
                            this.increaseScore();
                        }
                     }
                })
            });
            if (this.ball.y + this.ball.size > this.$refs.canvas.height) {
                this.stopAnimation()
            }
        },
        drawScore() {
            const ctx = this.$refs.canvas.getContext('2d');
            ctx.font = '20px Arial';
            ctx.fillText(`Score: ${this.score}`, this.$refs.canvas.width - 100, 30);
        },
        increaseScore(){
            this.score++;
            if (this.score % (this.brickRowCount * this.brickColumnCount) === 0) {
                this.stopAnimation();
            }

        },

        movePaddle(){
            this.paddle.x += this.paddle.dx;

            if(this.paddle.x + this.paddle.w > this.$refs.canvas.width){
                this.paddle.x = this.$refs.canvas.width - this.paddle.w;
                }
            if(this.paddle.x < 0){
                this.paddle.x = 0;
                }
        },
        draw(){
            const ctx = this.$refs.canvas.getContext('2d');
            ctx.clearRect(0,0,this.$refs.canvas.width, this.$refs.canvas.height);
            this.drawPaddle();
            this.drawBall();
            this.drawScore();
            this.drawBricks();
        },
        update() {
            const ctx = this.$refs.canvas.getContext('2d');
            ctx.clearRect(0,0,this.$refs.canvas.width, this.$refs.canvas.height)
            this.animationId = requestAnimationFrame(this.update);
            this.moveBall();
            this.movePaddle();
            this.draw()
        },
        initialisatePage(){
            const canvas = this.$refs.canvas;
            this.ball.x = canvas.width / 2;
            this.ball.y = canvas.height / 2;
            this.paddle.x = canvas.width / 2 - 200;
            this.paddle.y = canvas.height - 20;
            this.score = 0;
            this.draw();
            this.createBricks();

        },

        keyDown(e) {
            if (e.key === 'Right' || e.key === 'ArrowRight') {
                this.paddle.dx = this.paddle.speed;

            }
            if (e.key === 'Left' || e.key === 'ArrowLeft') {
                this.paddle.dx = -this.paddle.speed;
            }
        },
        keyUp(e) {
            if (
                e.key === 'Right' ||
                e.key === 'ArrowRight' ||
                e.key === 'Left' ||
                e.key === 'ArrowLeft'
            ) {
                this.paddle.dx = 0;
                }
    },
        stopAnimation() {
            cancelAnimationFrame(this.animationId);
            this.gameOver = true;
         },
        startAnimation(playerName) {
            console.log(playerName);
            this.playerName = playerName
            this.gameStarted = true;
            cancelAnimationFrame(this.animationId);
            this.initialisatePage()
            this.update();
        },
        submitScore(score){
            this.players.push( {name: this.playerName, score});
            this.players.sort((a, b) => b.score - a.score);
            this.gameOver = false;
            this.gameStarted = false;
            console.log(score);
            const ctx = this.$refs.canvas.getContext('2d');
            ctx.clearRect(0,0,this.$refs.canvas.width, this.$refs.canvas.height)
        },




    },
    created() {
    document.addEventListener('keydown', this.keyDown);
    document.addEventListener('keyup', this.keyUp);
},

    mounted() {
    const canvas = this.$refs.canvas;
    this.ball.x = canvas.width / 2;
    this.ball.y = canvas.height / 2;
    this.paddle.x = canvas.width / 2 - 200;
    this.paddle.y = canvas.height - 20;


  }
}

</script>

<template>
<div class="navbar bg-sky-900 w-screen text-neutral-content mb-2 shadow-lg">
    <div class="flex-none ">
    <div class="drawer" >
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                <label for="my-drawer" class="btn btn-square btn-ghost">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
        <div class="drawer-side">
            <label for="my-drawer" class="drawer-overlay"></label>
                <div class=" p-4 w-80 h-full bg-slate-300 text-base-content">
                    <h2 class="font-bold">How To Play:</h2>
                    <p>
                     Use your right and left keys to move the paddle to bounce the ball up
                     and break the blocks.
                    </p >
                    <p>If you miss the ball, your score and the blocks will reset.</p>
                </div>
        </div>
  </div>
</div>
  <div class="flex-1">
    <h1 class="text-4xl text-[#fff]">Breakout!</h1>
  </div>
  <div class="flex-none">
    <rankTable  :players="players"></rankTable>    
  </div>
</div>
    <div class="container items-center flex justify-center">
        <canvas ref="canvas" class="bg-slate-100 rounded-md " width="800" height="600"></canvas>  
        <div class="absolute top-1/2 left-2/5 transform translate-x-1/5 -translate-y-1/3" v-if="!gameStarted">
            <inputBox @start-game="startAnimation"></inputBox>
        </div>  
    </div>
     <div>
        <endBox :score="score"  @submit-score="submitScore" :gameOver="gameOver"/>
    </div>
</template>

<style scoped>
</style>

