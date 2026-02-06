<script setup lang="ts">
  import logo from '@/assets/logo.png'
  import { navList } from '@/router'
  import confetti from 'canvas-confetti';

  const spark = (event: MouseEvent) => {
    confetti({
      particleCount: 400,
      spread: 360,
      origin: {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight
      },
      colors: ['#FF85A1', '#48CAE4', '#B794F4']
    });
  };
</script>

<template>
  <nav>
    <img class="logo" :src="logo" alt="logo" @click="spark"/>
    <div v-for="singleNav in navList" :key="singleNav.path">
      <router-link :to="singleNav.path">
        <div class="list">
          <div :class="singleNav.icon" class="icon" />
          <div class="name">{{singleNav.name}}</div>
        </div>
      </router-link>
    </div>
    <div class="spacer"/>
  </nav>
</template>

<style scoped>
  nav{
    background-color: var(--color-surface-1);
    position: fixed;
    left: 0;  top: 0;
    height: 100vh;
    width: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .logo{
    width: 80px;
    border-radius: 15px;
    margin-top: 5rem;
    margin-bottom: 4rem;
  }
  .list{
    margin-top: 1rem;
    color: var(--color-on-primary-container);
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //background-color: var(--color-tertiary-container);
    border-radius: 15px;
  }
  .list .icon{
    background-color: var(--color-primary-container);
    border-radius: 15px;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1.5rem;
  }
  .list .icon:hover{
    background-color: var(--color-secondary-container);
    transition: background-color 0.7s ease;
  }
  .router-link-active .list .icon{
    background-color: var(--color-secondary-container);
  }
  .list .name{
    font-size: 1.1rem;
  }
  .spacer {
    flex-grow: 1;
  }


</style>
