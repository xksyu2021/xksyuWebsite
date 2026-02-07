<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  const config = ref({
    project:[] as {id:string,name: string,github: string,gogs: string,content: string}[]
  })
  onMounted(async () => {
    const response = await fetch('/content/project.json')
    config.value = await response.json()
  })

  const linkTo = (url: string) => {
    window.location.href = url
  }
</script>

<template>
  <div class="column">
    <div class="project" v-for="singleProject in config.project" v-if="config.project">
      <div class="headLine">
        <div class="title">{{singleProject.name}}</div>
        <div class="buttonGroup no-select">
          <div class="fButton buttonA" @click="linkTo(singleProject.github)">Github</div>
          <div class="fButton buttonB" @click="linkTo(singleProject.gogs)">Gogs</div>
        </div>
      </div>
      <div class="content">{{singleProject.content}}</div>
    </div>
  </div>
</template>

<style scoped>
.column{
  display: flex;
  flex-direction: column;
}
.project{
  display: flex;
  flex-direction: column;
  width: auto;
  max-width: 100%;
  margin: 1rem;
  gap: 1rem;
  border-radius: 15px;
  padding: 2rem;
  box-sizing: border-box;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.project:nth-child(odd){
  background-color: var(--color-primary-container);
}
.project:nth-child(even){
  align-items: end;
}

.headLine{
  display: flex;
  gap: 5rem;
  font-size: 3.5rem;
  font-family: "ENFB", sans-serif;
  align-items: center;
}

.headLine .buttonGroup{
  display: flex;
  gap: 1rem;
  align-items: center;
}
.headLine .fButton{
  height: auto;
  width: 5rem;
  font-size: 1.3rem;
  border-radius: 100px;
  padding: 0.6rem;
  text-align: center;
  border-width: 1.5px;
  border-style: solid;
}
.buttonGroup .buttonA{
  background-color: var(--color-secondary-container);
  //border-color: var(--color-secondary);
  border: none;
}
.buttonGroup .buttonB{
  background-color: var(--color-tertiary-container);
  border-color: var(--color-tertiary);
}

.content{
  font-size: 1.3rem;
  white-space: pre-wrap;
}

</style>