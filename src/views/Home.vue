<script setup lang="ts">
  import HeadCard from "@/assets/components/Home/HeadCard.vue";
  import CodeCard from "@/assets/components/Home/CodeCard.vue";
  import ContactCard from "@/assets/components/Home/ContactCard.vue";
  import ProjectCard from "@/assets/components/Home/ProjectCard.vue";
</script>

<template>
  <div  class="Line LineA">
    <HeadCard/>
    <CodeCard/>
  </div>
  <div  class="Line LineB">
    <ContactCard/>
    <project-card/>
  </div>
</template>

<style scoped>
  .Line{
    display: flex;
    gap: 1rem;
    margin: 1rem;
    //flex-grow: 1;
  }
</style>