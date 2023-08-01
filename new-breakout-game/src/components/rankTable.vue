<script>
export default {
    props:{ data: {
      type: Array,
      default: () => []
    }}
}
</script>

<template>
<button class="btn" onclick="my_modal_2.showModal()">Table of Ranking</button>
<dialog id="my_modal_2" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">Table of Ranking</h3>
    <p class="py-4">Welcome to Breakout game, please Leave your name here!</p>
    <div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr>
        <th>1</th>
        <td>{{ data }}</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      <!-- row 2 -->
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      <!-- row 3 -->
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
</template>