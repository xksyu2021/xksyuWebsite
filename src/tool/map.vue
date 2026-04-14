<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";
const x_r = ref(false)
const z_r = ref(false)
const xz_r = ref(false)
const imgSize = ref(100)
const posSizeX = ref(100)
const posSizeZ = ref(100)
const showFloat = ref(false);

const imageUrl = ref<string>("");
const imgInput = ref<HTMLInputElement | null>(null);
const triggerUpload = () => {
  imgInput.value?.click();
};
const fileH = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    if(file) {
      if (imageUrl.value) {
        URL.revokeObjectURL(imageUrl.value);
      }
      imageUrl.value = URL.createObjectURL(file);
    }
  }
}

const x = ref(0);
const z = ref(0);
const x_fix = ref(0);
const z_fix = ref(0);
const x_fix_adv = ref(0);
const z_fix_adv = ref(0);
const x_fix_adv_std = ref(1024);
const z_fix_adv_std = ref(1024);

const fixMouse = (e :Event) => {
  e.stopPropagation();
  document.body.style.cursor = 'crosshair';
  const getClick = (ee: { pageX: number; pageY: number; }) => {
    x_fix.value = ee.pageX;
    z_fix.value = ee.pageY;
    document.body.style.cursor = 'default';
  }
  window.addEventListener('click', getClick, { once: true });
}

const fixMouseAdv = (e :Event) => {
  e.stopPropagation();
  document.body.style.cursor = 'crosshair';
  const getClick = (ee: { pageX: number; pageY: number; }) => {
    x_fix_adv.value = ee.pageX;
    z_fix_adv.value = ee.pageY;
    document.body.style.cursor = 'default';
  }
  window.addEventListener('click', getClick, { once: true });
}
const fixMouseAdvStd = () => {
  posSizeX.value = x_fix_adv_std.value/(x_fix_adv.value-x_fix.value) *100;
  posSizeZ.value = z_fix_adv_std.value/(z_fix_adv.value-z_fix.value) *100;
}

const updateMouse = (e: { pageX: number; pageY: number; }) => {
  x.value = e.pageX;
  z.value = e.pageY;
};
onMounted(() => {
  window.addEventListener('mousemove', updateMouse);
});
onUnmounted(() => {
  window.removeEventListener('mousemove', updateMouse);
  if (imageUrl.value) {
    URL.revokeObjectURL(imageUrl.value);
  }
});

const float = computed(() => {
  return {
    transform: `translate(${x.value - 50}px, ${z.value - 50}px)`
  };
});
</script>

<template>
  <div class="overlay no-select">
    <div class="card imgCard"
         @mouseenter="showFloat = true" @mouseleave="showFloat = false">
      <img class="map" v-if="imageUrl" :src="imageUrl" alt="地图文件"
        :style="{width: imgSize + '%'}"/>
    </div>
    <div class="card opCard">
      <div class="row advRow">
        <div class="button buttonA"
             @click="triggerUpload">导入图片
          <input type="file" ref="imgInput" accept="image/*"
                 style="display: none"
                 @change="fileH" >
        </div>
        <div class="button buttonB" @click="fixMouse">标记原点</div>
      </div>
      <div>图片放缩 <input type="number" class="field" v-model="imgSize"
                           min="0.001" max="100000" step="10"/> %</div>
      <div>标度放缩 <input type="number" class="field"
                           :value="posSizeX"
                           @input="e => { posSizeX = posSizeZ = Number((e.target as HTMLInputElement).value) }"
                           min="0.001" max="100000" step="10"/> %</div>
      <div class="row">
        <div class="row"><input type="checkbox" id="check_x_r" v-model="x_r" />x轴反转</div>
        <div class="row"><input type="checkbox" id="check_y_r" v-model="z_r" />z轴反转</div>
        <div class="row"><input type="checkbox" id="check_y_r" v-model="xz_r" />xz轴交换</div>
      </div>
    </div>
    <div class="card opCard">
      <div class="row advRow">
        选择坐标修正标度 <div class="button buttonB" @click="fixMouseAdv">标记参考点</div>
      </div>
      此项会自动更新左侧工具中的“标度放缩”。<br>
      修正点坐标：
      <div class="row">
        <div> x&nbsp;=&nbsp; <input type="number" class="field" v-model="x_fix_adv_std"/> &nbsp;</div>
        <div> z&nbsp;=&nbsp; <input type="number" class="field" v-model="z_fix_adv_std"/> </div>
        <div class="button buttonA" style="margin-left: 20px"
             @click="fixMouseAdvStd">确定</div>
      </div>
    </div>
  </div>

  <div class="float no-select" :style="float" v-show="showFloat" >
    {{xz_r?"z":"x"}} = {{ Math.trunc((x - x_fix) * posSizeX / 100) * (x_r?-1:1) }} ,
    {{xz_r?"x":"z"}} = {{ Math.trunc((z - z_fix) * posSizeZ / 100) * (z_r?-1:1) }}
  </div>
</template>

<style scoped>
.overlay{
  display: flex;
  flex-wrap: wrap;
  margin: 1rem;
  gap: 1rem;
}
.card{
  border-radius: 15px;
  padding: 1rem;
}
.imgCard{
  background-color: var(--color-secondary-container);
}
.opCard{
  background-color: var(--color-surface-2);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
}
.button{
  border-radius: 10px;
  padding: 0.5rem;
  color: var(--color-on-primary-container);
}
.buttonB{
  background-color: var(--color-secondary-container);
}
.buttonA{
  background-color: var(--color-inverse-primary);
}
.field{
  width: 3rem;
}
.row{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.advRow{
  gap: 10px;
  font-size: 1.3rem;
}

.map{
  object-fit: contain;
  max-height: 200vh;
  max-width: 200vw;
}

.float{
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  transition: transform 0.1s ease-out;
  padding: 5px;
  border-radius: 10px;
  background-color: var(--color-primary-container);
}
</style>