<script>

export default {
  emits: ['start-game'],
  data(){
    return{

      playerName: '',
      randomName:'apple'
    }
  },
    methods: {
        sendDataToParent() {
          if (this.playerName === ''){
            this.playerName = this.randomName
            this.$emit('start-game', this.playerName);
          }else {
            this.$emit('start-game', this.playerName);
          }
    },
  },
}
</script>

<template>
<!-- Open the modal using ID.showModal() method -->
<button class="btn btn-ghost normal-case text-3xl" onclick="my_modal_1.showModal()">Start Game!</button>
<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Welcome to Breakout game, please Leave your name here!</p>
    <input type="text" placeholder="your name" class="input input-bordered input-info w-full max-w-xs" v-model="playerName" required="true"/>
    <div class="modal-action">
      <button class="btn"  @click="sendDataToParent">Submit</button>
    </div>
  </form>
</dialog>


</template>

<style>
</style>