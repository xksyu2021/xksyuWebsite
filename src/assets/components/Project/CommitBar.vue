<script setup lang="ts">
const timestampNow: number = Date.now()
const timestampStart: number = Date.parse("2025-07-05T00:00:00")
const day = Math.floor((timestampNow - timestampStart)/(1000*60*60*24))
</script>

<template>
  <div  class="row">
    <div class="github">
      <img src="https://ghchart.rshah.org/xksyu2021" alt=""/>
    </div>
    <img class="pic" src="/public/img/projectPic.png" alt=""/>
    <div class="count">
      接触程序设计知识
      <div  class="line2">至今已经<span class="num">{{day}}</span>天</div>
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
</style>