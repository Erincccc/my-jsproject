<script >
import { ref, onMounted} from 'vue';
import inputBox from './inputBox.vue'
import rankTable from './rankTable.vue'

export default {
    components :{
        inputBox,
        rankTable,
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
                w: 400,
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
            player: [],

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
            this.moveBall();
            this.movePaddle();
            this.draw()
            this.animationId = requestAnimationFrame(this.update);
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
            if(this.player === []){
                this.player.push(this.score)
            }
         },
        startAnimation() {
            cancelAnimationFrame(this.animationId);
            this.initialisatePage()
            this.update();
        },
        handleInputSubmit(data) {
            this.player = [];
            this.player.push(data);
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
    <div class="relative">
        <canvas ref="canvas" class="bg-slate-100 block rounded-md" width="800" height="600"></canvas>
        <button class="btn btn-info bg-sky-600 hover:bg-sky-700 border-transparent  shadow-md"  @click="startAnimation">start!</button>
        <button class="btn btn-info bg-sky-600 hover:bg-sky-700 border-transparent  shadow-md"  @click="stopAnimation">stop!</button>
        <inputBox class="absolute" @input-submit="handleInputSubmit"></inputBox>
        <rankTable class="absolute" :data="player"></rankTable>
    </div>
</template>

<style scoped>
</style>
