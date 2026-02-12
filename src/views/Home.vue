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
    <div class="mediaWarn">! 建议使用电脑访问网站<br>文章内的表格与代码块<br>在手机上可能显示异常</div>
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
  .mediaWarn{
    display: none;
    padding: 1rem;
    border-radius: 10px;
    background-color: antiquewhite;
    flex: 1;
    font-size: 1rem;
    color: var(--color-on-primary-container);
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
    .headCard,.codeCard,.mediaWarn{
      width: 88vw;
    }
    .mediaWarn{
      display: flex;
    }
  }
</style>