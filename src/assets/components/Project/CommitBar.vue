<script setup lang="ts">
import { ref, onMounted } from 'vue'
const config = ref({
  bar:{
    githubLink:''as string,date:''as string,dateContent:''as string,dateContentB:''as string
  }
})
const day = ref(1314)
onMounted(async () => {
  const response = await fetch('/content/project.json')
  config.value = await response.json()
  const timestampNow: number = Date.now()
  const timestampStart: number = Date.parse(config.value.bar.date)
  day.value = Math.floor((timestampNow - timestampStart)/(1000*60*60*24))
})
</script>

<template>
  <div  class="row no-select">
    <div class="github">
      <img :src="config.bar.githubLink" alt=""/>
    </div>
    <img class="pic" src="/public/img/projectPic.png" alt=""/>
    <div class="count">
      {{config.bar.dateContent}}
      <div  class="line2">{{config.bar.dateContentB}}<span class="num">{{day}}</span>天</div>
    </div>
  </div>
</template>

<style scoped>
  .row{
    display: flex;
    gap: 1rem;
    margin: 1rem 1rem 0;
    align-items: start;
  }
  .github{
    display: flex;
    align-items: center;
    background-color: var(--color-secondary-container);
    padding: 3rem;
    border-radius: 15px;
    height: 100px;
  }
  .pic{
    height: 196px;
    border-radius: 15px;
    width: auto;
    max-height: 100%;
  }
  .count{
    font-size: 1.5rem;
    border-radius: 15px;
    height: 196px;
    width: auto;
    max-width: 100%;
    background-color: var(--color-surface-3);
    box-sizing: border-box;
    word-wrap: break-word;
    overflow-wrap: break-word;
    color: var(--color-on-primary-container);
    padding: 2rem;
    flex: 1;
  }
  .count .line2{
    text-align: end;
  }
  .count .num{
    font-size: 5rem;
    color: black;
  }

  @media screen and (max-width: 768px) {
    .row{
      display: flex;
      flex-wrap: wrap;
      max-width: 100vw;
      margin: 0;
      gap: 0.5rem;
    }
    .github{
      padding: 1rem;
      height: auto;
      display: flex;
      justify-content: center;
    }
    .github img{
      width: 88vw;
      height:auto;
    }
    .pic{
      width: 30vw;
      height:auto;
    }
    .count{
      font-size: 1rem;
      width: 65vw;
      height: auto;
      padding: 1rem;
    }
    .count .num{
      font-size: 2rem;
    }
  }
</style>