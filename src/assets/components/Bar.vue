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
      <template v-if="singleNav.show">
        <router-link :to="singleNav.path">
          <div class="list">
            <div :class="singleNav.icon" class="icon" />
            <div class="name no-select">{{singleNav.name}}</div>
          </div>
        </router-link>
      </template>
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

  @media screen and (max-width: 768px) {
    nav{
      left: 0;
      top: auto;
      bottom: 0;
      width: 100vw;
      height: 4rem;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      z-index: 1000;
      font-size: 0.9rem;
    }
    nav img{
      display: none;
    }
    .list{
      margin-top: 0;
      width: 20vw;
      height: auto;
      flex: 1;
    }
  }


</style>
