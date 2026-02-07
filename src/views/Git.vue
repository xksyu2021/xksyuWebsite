<script setup lang="ts">

</script>

<template>
  <div class="overlay">
    <div class="row">
      <div class="head">
        <div class="title">Xksyu 源代码版本管理仓库</div>
        <div class="subtitle">2025-2026 | Powered By Gogs</div>
      </div>
      <div class="column">
        <div class="card login" onclick="window.location.href = 'https://git.xksyu.online/user/login?'">
          <i class="bi bi-key"/>
          登录
        </div>
        <div class="card visit" onclick="window.location.href = 'https://git.xksyu.online/explore/repos'">
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

</style>