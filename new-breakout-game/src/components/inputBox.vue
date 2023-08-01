<script>

export default {
    data(){
        return{
            inputValue: '',
        }
    },
    methods: {
        sendDataToParent() {
            this.$emit('input-submit', this.inputValue)
            this.inputValue = ''
    }

    },

}

</script>

<template>
<!-- Open the modal using ID.showModal() method -->
<button class="btn" onclick="my_modal_1.showModal()">open modal</button>
<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Welcome to Breakout game, please Leave your name here!</p>
    <input type="text" placeholder="Type here" class="input input-bordered input-info w-full max-w-xs" v-model="inputValue"  />
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn"  @click="sendDataToParent">Submit</button>
    </div>
  </form>
</dialog>


</template>

<style>
</style>