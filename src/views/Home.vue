<script setup lang="ts">
  import HeadCard from "@/assets/components/Home/HeadCard.vue";
  import CodeCard from "@/assets/components/Home/CodeCard.vue";
  import ContactCard from "@/assets/components/Home/ContactCard.vue";
  import ProjectCard from "@/assets/components/Home/ProjectCard.vue";
</script>

<template class="home">
  <div  class="Line LineA">
    <HeadCard class="headCard"/>
    <CodeCard class="codeCard"/>
  </div>
  <div  class="Line LineB">
    <ContactCard class="contactCard"/>
    <project-card class="projectCard"/>
  </div>
</template>

<style scoped>
  .Line{
    display: flex;
    gap: 1rem;
    margin: 1rem;
  }
  @media screen and (max-width: 768px) {
    .home{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .Line{
      flex-direction: column;
      margin: 0.3rem;
      gap: 0.5rem;
      align-items: center;
    }
    .headCard,.codeCard{
      width: 88vw;
    }
  }
</style>