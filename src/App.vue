<script setup lang="ts">
  import Bar from '@/assets/components/Bar.vue'
  import Law from "@/assets/components/Law.vue";
</script>

<template>
  <main>
    <Bar/>
    <div class="MAINcontent">
      <RouterView/>
      <Law/>
    </div>
  </main>
</template>
