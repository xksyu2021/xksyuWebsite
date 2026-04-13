<script setup lang="ts">
import {ref} from "vue";
const x_r = ref(false)
const z_r = ref(false)
const size = ref(100)
</script>

<template>
  <div class="overlay no-select">
    <div class="card imgCard">

    </div>
    <div class="card opCard">
      <div class="row advRow">
        <div class="button buttonA">导入图片</div>
        <div class="button buttonB">标记原点</div>
      </div>
      <div>标度放缩 <input type="text" class="field" v-model="size" /> %</div>
      <div class="row">
        <div class="row"><input type="checkbox" id="check_x_r" v-model="x_r" />x轴反转</div>
        <div class="row"><input type="checkbox" id="check_y_r" v-model="z_r" />z轴反转</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay{
  display: flex;
  margin: 1rem;
  gap: 1rem;
}
.card{
  border-radius: 15px;
  padding: 1rem;
}
.imgCard{
  background-color: var(--color-secondary-container);
}
.opCard{
  background-color: var(--color-surface-2);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}
.button{
  border-radius: 10px;
  padding: 0.5rem;
  color: var(--color-on-primary-container);
}
.buttonB{
  background-color: var(--color-secondary-container);
}
.buttonA{
  background-color: var(--color-inverse-primary);
}
.field{
  width: 3rem;
}
.row{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.advRow{
  gap: 10px;
  font-size: 1.3rem;
}
</style>