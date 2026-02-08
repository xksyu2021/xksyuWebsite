<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from "markdown-it";
import MarkdownItGitHubAlerts from "markdown-it-github-alerts";

const route = useRoute()
const post = ref<any>(null)
const config = ref({name:'' as string})

onMounted(async () => {
  const responseA = await fetch('/article/index.json')
  const data = await responseA.json()
  post.value = data.article.find((item: any) => item.path === route.params.id)

  const responseB = await fetch('/content/basic.json')
  config.value = await responseB.json()
})

const md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: true,
  breaks: true
})
md.use(MarkdownItGitHubAlerts)
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
      contentHtml.value = '<h1>Failed to load!</h1>'
    }
  } catch (error) {
    contentHtml.value = '<h1>Failed to load!</h1>'
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
      <div class="head no-select">{{config.name}}</div>
    </div>
    <div class="card">
      <div class="title">{{post.title}}</div>
      <div class="line">
        <div class="clip">{{post.clip}}</div>
        <div class="date">{{post.date}}</div>
      </div>
      <div class="content">{{post.content}}</div>
    </div>

    <div class="md" v-html="contentHtml"/>

  </div>
</template>

<style scoped>
  .md {
    line-height: 1.6;
    text-align: left;
    font-size: 1.25rem;
  }
  :deep(.md) h1{
    display: block;
    width: fit-content;
    margin: 2rem 0;
    font-size: 2.3rem;
    padding: 0 1rem 0.2rem 0;
    border-bottom: 3px solid var(--color-primary);
    font-weight: normal;
    color: var(--color-on-primary-container);
  }
  :deep(.md) h2{
    display: block;
    width: fit-content;
    margin: 2rem 0;
    font-size: 1.8rem;
    padding: 0 1rem 0.2rem 0;
    border-bottom: 3px solid var(--color-secondary);
    font-weight: normal;
    color: var(--color-on-primary-container);
  }
  :deep(.md) p{
    margin: 0.35rem;
  }
  :deep(.md) table {
    border-collapse: separate;
    border-spacing: 0.5rem 0.5rem;
  }
  :deep(.md) thead th {
    background-color: var(--color-surface-5);
    padding: 1rem;
    font-size: 1.35rem;
    border-radius: 15px;
    text-align: center;
    font-weight: normal;
  }
  :deep(.md) tbody td {
    background-color: var(--color-surface-2);
    padding: 1rem;
    border-radius: 15px;
    vertical-align: top;
  }
  :deep(.md) blockquote{
    border-left: 0.5rem solid var(--color-primary);
    font-weight: normal;
    background-color: var(--color-tertiary-container);
    display: block;
    width: fit-content;
    margin: 1rem 0;
    padding: 0.5rem;
  }
  :deep(.md) .markdown-alert{
    border-left: 0.5rem solid;
    font-weight: normal;
    display: block;
    width: fit-content;
    margin: 1rem 0;
    padding: 0.5rem;
  }
  :deep(.md) .markdown-alert-note {
    border-left-color: #1e88e5;
    background-color: #e3f2fd;
  }
  :deep(.md) .markdown-alert-tip {
    border-left-color: #43a047;
    background-color: #e8f5e9;
  }
  :deep(.md) .markdown-alert-important {
    border-left-color: #8e24aa;
    background-color: #f3e5f5;
  }
  :deep(.md) .markdown-alert-warning {
    border-left-color: #ff9800;
    background-color: #fff3e0;
  }
  :deep(.md) .markdown-alert-caution {
    border-left-color: #e53935;
    background-color: #ffebee;
  }
  :deep(.md) .markdown-alert-title{
    display: flex;
    gap: 0.7rem;
    justify-content: center;
    align-items: center;
  }
  :deep(.md) .markdown-alert-note .markdown-alert-title {
    color: #0d47a1;
    gap: 1rem;
  }
  :deep(.md) .markdown-alert-tip .markdown-alert-title {
    color: #1b5e20;
  }
  :deep(.md) .markdown-alert-important .markdown-alert-title {
    color: #4a148c;
  }
  :deep(.md) .markdown-alert-warning .markdown-alert-title {
    color: #e65100;
  }
  :deep(.md) .markdown-alert-caution .markdown-alert-title {
    color: #b71c1c;
  }
  :deep(.md) a{
    color: var(--color-on-primary-container);
    font-style: italic;
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