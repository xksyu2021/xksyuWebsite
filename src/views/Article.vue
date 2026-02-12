<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
const config = ref({
  clips:[] as string[],
  article:[] as {path:string,title: string,date: string,clip: string,content: string}[]
})
onMounted(async () => {
  const response = await fetch('/article/index.json')
  config.value = await response.json()
})

const clipSelect = ref("全部显示")
const clipAll = ref(true)

const filteredArticles = computed(() => {
  if (clipAll.value) return config.value.article
  return config.value.article.filter(post => post.clip === clipSelect.value)
})

</script>

<template>
  <div class="clipRow no-select">
    <div class="clip" @click="clipAll = true">全部显示</div>
    <div class="overlayA" v-for="clip in config.clips">
      <div class="clip" @click="clipSelect=clip;clipAll=false">{{clip}}</div>
    </div>
  </div>
  <div class="grid">
    <div class="overlayB" v-for="post in filteredArticles" :key="post.path"
         @click="$router.push(`/post/${encodeURIComponent(post.path)}`)">
      <div class="card">
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
  columns: 3;
  column-gap: 1rem;
  margin: 1rem;
}

.overlayB{
  border-radius: 15px;
  break-inside: avoid;
  box-sizing: border-box;
  margin-bottom: 1rem;
}
.overlayB:nth-child(3n+1){
  background-color: var(--color-primary-container);
}
.overlayB:nth-child(3n+2){
  border-width: 1.5px;
  border-style: solid;
  border-color: var(--color-on-primary-container);
}
.overlayB:nth-child(3n){
  background-color: var(--color-surface-2);
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

.clip:hover{
  background-color: var(--color-primary-container);
  transition: background-color 0.7s ease;
}

@media screen and (max-width: 768px) {
  .clipRow{
    flex-flow: wrap;
    gap: 0.7rem;
    margin: 1rem 0;
    padding: 0.5rem;
    font-size: 0.9rem;
  }
  .grid{
    columns: 1;
    column-gap: 0.3rem;
    margin: 0;
  }

  .card{
    padding:1rem;
    gap: 0.5rem;
  }
  .card .title{
    font-size: 1.8rem;
  }
  .card .content{
    font-size: 0.9rem;
  }
  .card .date{
    font-size: 0.7rem;
  }
  .card .line{
    gap:0.7rem
  }
  .card .clip{
    padding: 0.4rem 0.8rem;
    font-size: 0.7rem;
  }
}
</style>