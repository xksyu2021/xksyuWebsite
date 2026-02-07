<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from "markdown-it";

const route = useRoute()
const post = ref<any>(null)

onMounted(async () => {
  const response = await fetch('/article/index.json')
  const data = await response.json()
  post.value = data.article.find((item: any) => item.path === route.params.id)
})

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true
})
const contentHtml = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    const id = route.params.id
    const response = await fetch(`/article/${id}`)

    if (response.ok) {
      const rawText = await response.text()
      contentHtml.value = md.render(rawText)
    } else {
      contentHtml.value = '<h1>文章不存在</h1>'
    }
  } catch (error) {
    contentHtml.value = '<h1>加载失败</h1>'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="post" class="page">
    <div class="row">
      <div @click="$router.back()" class="back">
        <div class="bi bi-arrow-left-circle"/>
      </div>
      <div class="head">夏空拾雨小站</div>
    </div>
    <div class="card">
      <div class="title">{{post.title}}</div>
      <div class="line">
        <div class="clip">{{post.clip}}</div>
        <div class="date">{{post.date}}</div>
      </div>
      <div class="content">{{post.content}}</div>
    </div>

    <div class="markdown-body" v-html="contentHtml"/>

  </div>
</template>

<style scoped>
  .markdown-body {
    padding: 2rem;
    line-height: 1.6;
    text-align: left;
    font-size: 1.3rem;
  }

  .page{
    display: flex;
    flex-direction: column;
    margin: 1rem 5rem;
    gap:2rem
  }
  .row{
    display: flex;
    gap:2rem
  }
  .back{
    background-color:var(--color-secondary-container);
    padding: 1.5rem;
    width: 2rem;
    height: 2rem;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.7rem;
  }
  .head{
    background-color:var(--color-surface-2);
    padding: 1.5rem;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-content: center;
    flex: 1;
    font-size: 1.5rem;
    font-family: "ZHFA", sans-serif;
  }

  .card{
    padding: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    white-space: pre-wrap;
    background-color: var(--color-surface-5);
    border-radius: 50px;
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
  .card .clip{
    padding: 0.5rem 1rem;
    border-radius: 50px;
    background-color: var(--color-accent-soft-yellow);
    display: flex;
    text-align: center;
    justify-content: center;
  }
</style>