<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  const config = ref({
    codeCard: {
      plat: [] as { name: string, color: string }[],
      codeLang: [] as { name: string, color: string }[]
    }
  })
  onMounted(async () => {
    const response = await fetch('/content/home.json')
    config.value = await response.json()
  })
</script>

<template>
  <div class="codeCard no-select">
    <div class="title">开发平台</div>
    <div   class="content">
      <div class="single" v-for="singlePlat in config.codeCard.plat"  v-if="config.codeCard">
        <div class="word">{{singlePlat.name}}</div>
        <div class="block" :style="{ '--block-color': singlePlat.color}" />
      </div>
    </div>
    <div class="title">编程语言</div>
    <div   class="content">
      <div class="single" v-for="singleLang in config.codeCard.codeLang"  v-if="config.codeCard">
        <div class="word">{{singleLang.name}}</div>
        <div class="block"  :style="{ '--block-color': singleLang.color}" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .codeCard{
    color: var(--color-on-primary-container);
    padding: 3rem;
    background-color: var(--color-surface-2);
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
    width: fit-content;
  }
  .codeCard .content{
    display: flex;
    justify-content: flex-start;
    width: auto;
  }
  .codeCard .title{
    font-size: 1.5rem;
    margin-top: 1rem;
  }
  .codeCard .single{
    display: flex;
    flex-direction: column;
  }
  .codeCard .single .word{
    margin-right: 1rem;
  }
  .codeCard .single .block{
    --block-color: #cccccc;
    width: 95%;
    min-width: 1rem;
    height: 0.8rem;
    color: var(--block-color);
    background-color: var(--block-color);
    border-radius: 10px;
  }

  @media screen and (max-width: 768px) {
    .codeCard{
      padding: 1rem;
      flex: 1;
    }
    .codeCard .title{
      font-size: 1.3rem;
      margin-top: 0.5rem;
    }
  }
</style>