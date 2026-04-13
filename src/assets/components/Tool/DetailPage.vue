<script setup lang="ts">
import { useRoute } from 'vue-router'
import {defineAsyncComponent, onMounted, ref, shallowRef, watch} from "vue";

const config = ref({name:'' as string})
onMounted(async () => {
  const responseB = await fetch('/content/basic.json')
  config.value = await responseB.json()
})

const route = useRoute()
const Tool = shallowRef();
watch(
    () => route.params.id,
    (newId) => {
      if (newId) {
        const componentName = (newId as string).replace('.vue', '');
        Tool.value = defineAsyncComponent(() => import(`@/tool/${componentName}.vue`));
      }
    },
    { immediate: true }
);

</script>

<template>
  <div class="row">
    <div @click="$router.back()" class="back">
      <div class="bi bi-arrow-left-circle"/>
    </div>
    <div class="head no-select">{{config.name}}</div>
  </div>
  <Tool class="SubContent"/>
</template>

<style scoped>
.row{
  display: flex;
  gap:1rem;
  margin: 0 1rem;
}
.back{
  background-color:var(--color-secondary-container);
  padding: 1.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
}
.head{
  background-color:var(--color-surface-2);
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex: 1;
  font-size: 1.5rem;
  font-family: "ZHFA", sans-serif;
}

.SubContent{
  margin: 0 1rem;
}

</style>