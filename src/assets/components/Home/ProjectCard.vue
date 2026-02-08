<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  const config = ref({
    project:[] as {name: string,content: string,link: string,logo: string}[]
  })
  onMounted(async () => {
    const response = await fetch('/content/home.json')
    config.value = await response.json()
  })
</script>

<template>
  <div class="list">
    <div class="project" v-for="singleProject in config.project" v-if="config.project">
      <div class="titleLine">
        <img :src="singleProject.logo" alt=""/>
        <div class="title" >{{singleProject.name}}</div>
      </div>
      <div class="content">{{singleProject.content}}</div>
    </div>
  </div>
</template>

<style scoped>
.list{
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.list .project{
  flex-grow: 1;
  padding: 2.5rem;
  background-color: var(--color-surface-2);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
  color: var(--color-on-primary-container);
}
.list .project:hover{
  background-color: var(--color-outline);
  transition: background-color 0.7s ease;
}

.project .titleLine{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}
.titleLine img{
  width: 1.7rem;
  height: 1.7rem;
}
.titleLine .title{
  font-size: 2rem;
  font-family: "ENFB", sans-serif;
}
.project .content{
  font-size: 1.2rem;
}
</style>