<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  const config = ref({
    git:{
      title:''as string,subTitle:''as string,loginLink:''as string,viewLink:''as string
    }
  })
  onMounted(async () => {
    const response = await fetch('/content/basic.json')
    config.value = await response.json()
  })

  const linkTo = (url: string) => {
    window.location.href = url
  }
</script>

<template>
  <div class="overlay">
    <div class="row">
      <div class="head">
        <div class="title">{{config.git.title}}</div>
        <div class="subtitle">{{config.git.subTitle}}</div>
      </div>
      <div class="column">
        <div class="card login no-select" @click="linkTo(config.git.loginLink)">
          <i class="bi bi-key"/>
          登录
        </div>
        <div class="card visit no-select" @click="linkTo(config.git.viewLink)">
          <i class="bi bi-inboxes"/>
          浏览
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.row{
  display: flex;
  gap: 1rem;
}
.column{
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
.head{
  padding: 3rem;
  background-color: var(--color-primary-container);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center ;
}
.head .title{
  font-size: 3rem;
}
.head .subtitle{
  font-size: 1.3rem;
}
.card{
  border-radius: 15px;
  padding: 3rem;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center ;
  text-align: center;
}
.card.login{
  background-color: var(--color-tertiary-container);
}
.card.visit{
  background-color: var(--color-secondary-container);
}
.card i{
  font-size: 2.5rem;
}

@media screen and (max-width: 768px) {
  .overlay{
    height: 85vh;
  }
  .row{
    flex-direction: column;
    gap: 0.5rem;
  }
  .column{
    flex-direction: row;
    gap: 0.5rem;
  }

  .head{
    padding: 1.5rem;
  }
  .head .title{
    font-size: 1.5rem;
  }
  .head .subtitle{
    font-size: 0.9em;
  }
  .card {
    padding: 1rem;
    font-size: 1.2rem;
    flex: 1;
  }
}

</style>