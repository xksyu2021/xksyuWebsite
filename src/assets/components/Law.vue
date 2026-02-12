<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  const config = ref({
    footer:{
      content:''as string,icpLink:''as string,icp:''as string,police:''as string,policeLink:''as string,
    }
  })
  onMounted(async () => {
    const response = await fetch('/content/basic.json')
    config.value = await response.json()
  })
</script>

<template>
  <div class="footer">
    {{config.footer.content}}
    <br>
    <a :href="config.footer.icpLink" target="_blank" rel="noreferrer noopener">{{config.footer.icp}}</a>
    |
    <a :href="config.footer.policeLink" target="_blank" rel="noreferrer noopener">{{config.footer.police}}</a>
  </div>
</template>

<style scoped>
  .footer{
    padding: 3rem;
    margin: 1rem;
    background-color: var(--color-surface-2);
    border-radius: 15px;
    text-align: center;
    font-size: 1.2rem;
    color: var(--color-on-primary-container);
  }

  @media screen and (max-width: 768px) {
    .footer{
      padding: 1rem;
      font-size: 0.6rem;
      margin: 0.3rem 0 4rem 0;
    }
  }
</style>