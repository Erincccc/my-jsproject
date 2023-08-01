<script>
import { ref } from 'vue'
export default {
  props:['players'],
    data() {
        return {
            scores: [],
            };
  },
  methods: {

  },
    
}
</script>

<template>
<label class="swap swap-flip text-3xl"> 
  <!-- this hidden checkbox controls the state -->
  <input type="checkbox" />
    <div class="swap-on">🥳</div>
    <div class="swap-off">😇</div>
</label>
<button class="btn btn-ghost normal-case text-xl" onclick="my_modal_2.showModal()">Table of Ranking</button>
<dialog id="my_modal_2" class="modal">
  <form method="dialog" class="modal-box text-slate-700">
    <h3 class="font-bold text-lg ">Table of Ranking</h3>
    <p class="py-4">Welcome to Breakout game, please Leave your name here!</p>
    <div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody v-for="(item,index) in players" >
      <tr>
        <th>{{ index+1 }}</th>
        <td>{{ item.name }}</td>
        <td>{{ item.score }}</td>
      </tr>
    </tbody>
  </table>
</div>
    <div class="modal-action">
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
</template>