<template>
  <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-slate-500 bg-opacity-50" v-if="gameOver">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="font-bold text-lg">Congratulations!</h3>
      <div class="py-4 text-lg font-bold">Your score is {{ score }}.</div>
      <div class="flex justify-end">
        <button class="btn"  @click="submitScore">Confirm</button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ['score','gameOver'],
  emits: ['submit-score'],
  methods: {
    submitScore() {
      this.$emit('submit-score', this.score);
    },
  },
};
</script>

