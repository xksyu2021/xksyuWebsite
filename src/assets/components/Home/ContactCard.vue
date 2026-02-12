<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import confetti from "canvas-confetti";
  const config = ref({
    contactCard: {
      contactLink: [] as { name: string, link: string, icon: string }[],
      bio:{text: "", quote: ""}
    },
    project:[] as {name: string,content: string,link: string,logo: string}[]
  })
  onMounted(async () => {
    const response = await fetch('/content/home.json')
    config.value = await response.json()
  })

  const showPopup = ref(false)
  const openPopup = () => {
    showPopup.value = true
  }
  const closePopup = () => {
    showPopup.value = false
  }

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
  <div  class="column">
    <div  class="card cardA no-select">
      <div class="subCardA">
        <div  class="contactLine" v-for="contact in config.contactCard.contactLink" v-if="config.contactCard.contactLink">
          <div :class="contact.icon"/>
          <a :href="contact.link">{{contact.name}}</a>
        </div>
      </div>
    </div>
    <div  class="card cardB">
      <img @click.self="openPopup"  src="/img/bioPic.png" alt=""/>
      <div class="quote">{{config.contactCard.bio.quote}}</div>
    </div>
  </div>

  <Teleport to="main">
    <div v-if="showPopup" class="popup-overlay" @click.self="closePopup" >
      <div  class="popup" @click="spark">{{config.contactCard.bio.text}}</div>
    </div>
  </Teleport>

</template>

<style scoped>
  .column{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 35rem;
  }
  .card{
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    color: var(--color-on-surface);
    font-size: 1.2rem;
    border-radius: 10px;
  }
  .cardA{
    background-color: var(--color-secondary-container);
    align-items: center;
    font-family: "ENFA", sans-serif;
  }
  .subCardA{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .cardB{
    background-color: var(--color-tertiary-container);
    white-space: pre-wrap;
    flex-grow: 1;
    align-items: center;
  }
  .cardA  .contactLine{
    display: flex;
    gap: 1rem;
  }
  .cardB img{
    width: 90%;
    height: 90%;
    border-radius: 20px;
  }
  .cardB .quote{
    font-size: 1.35rem;
    font-family: "ZHFA", sans-serif;
  }

  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }
  .popup {
    background: var(--color-secondary-container);
    border-radius:  10px;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    color: var(--color-on-primary-container);
    width: 32rem;
    height: 20rem;
    padding: 2rem;
    white-space: pre-wrap;
  }

  @media screen and (max-width: 768px) {
    .column{
      width: 95vw;
      gap: 0.5rem;
    }
    .cardB img{
      max-width: 10rem;
    }
    .cardB .quote{
      font-size: 1.1rem;
    }
    .popup{
      margin: 1rem;
      height: auto;
    }
    .subCardA{
      flex-direction: row;
      gap: 1.5rem
    }
  }
  @media screen and (min-width: 769px) and (max-width: 1280px) {
    .cardB{
      justify-content: center;
    }
    .cardB .quote{
      font-size: 1.1rem;
    }
    .cardB img{
      width: 20vw;
      height: 20vw;
    }
  }
</style>