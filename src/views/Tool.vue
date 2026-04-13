<script setup lang="ts">
  import config from '@/tool/index.json'
</script>

<template>
  <div class="overlay">
    <div class="card" v-for="tool in config.tool" :key="tool.path"
         @click="$router.push(`/tool/${encodeURIComponent(tool.path)}`)">
      <div class="title">{{tool.title}}</div>
      <div class="content">{{tool.content}}</div>
    </div>
  </div>
</template>

<style scoped>
  .overlay{
    columns: 2;
    column-gap: 1rem;
    margin: 1rem;
  }
  .card{
    break-inside: avoid;
    display: flex;
    flex-direction: column;
  }

  .card .title{
    border-radius: 15px;
    padding: 15px;
    font-size: 30px;
  }
  .card:nth-child(3n) .title{
    background-color: var(--color-primary-container);
  }
  .card:nth-child(3n+1) .title{
    background-color: var(--color-secondary-container);
  }
  .card:nth-child(3n+2) .title{
    background-color: var(--color-surface-3);
  }
  .card .content{
    padding: 10px;
  }


  @media screen and (max-width: 768px) {
    .overlay{
      columns: 1;
      column-gap: 0.3rem;
      margin: 0;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1280px) {
  }
</style>