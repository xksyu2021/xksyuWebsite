<script setup lang="ts">
import { ref, onMounted } from 'vue'
const config = ref({
  clips:[] as string[],
  article:[] as {path:string,title: string,date: string,clip: string,content: string}[]
})
onMounted(async () => {
  const response = await fetch('/article/index.json')
  config.value = await response.json()
})

const clipSelect = ref("")
const clipAll = ref(true)
</script>

<template>
  <div class="clipRow">
    <div class="clip">全部显示</div>
    <div class="overlayA" v-for="clip in config.clips">
      <div class="clip">{{clip}}</div>
    </div>
  </div>
  <div class="grid">
    <div class="overlayB" v-for="post in config.article">
      <div class="card" v-if="post.clip === clipSelect || clipAll">
        <div class="title">{{post.title}}</div>
        <div class="line">
          <div class="clip">{{post.clip}}</div>
          <div class="date">{{post.date}}</div>
        </div>
        <div class="content">{{post.content}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.clipRow{
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 3rem 1rem 1rem;
  background-color: var(--color-secondary-container);
  padding: 2rem;
  border-radius: 100px;
}

.grid{
  display: flex;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  margin: 1rem;
}

.overlayB{
   border-radius: 15px;
   break-inside: avoid;
   box-sizing: border-box;
}
.overlayB:nth-child(odd){
  background-color: var(--color-primary-container);
}
.overlayB:nth-child(even){
  border-width: 1.5px;
  border-style: solid;
  border-color: var(--color-on-primary-container);
}

.card{
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  white-space: pre-wrap;
}


.card .title{
  font-size: 2.5rem;
}
.card .content{
  font-size: 1.2rem;
}
.card .date{
  font-size: 0.9rem;
  color: gray;
}
.card .line{
  display: flex;
  align-items: center;
  gap:1rem
}
.clip{
  padding: 0.5rem 1rem;
  border-radius: 50px;
  background-color: var(--color-accent-soft-yellow);
  display: flex;
  text-align: center;
  justify-content: center;
}
</style>