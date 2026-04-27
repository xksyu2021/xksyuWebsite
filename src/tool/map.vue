<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref, watch} from "vue";

const showFloat = ref(false)

//saved data
interface dataIf{
  x_r:Boolean,z_r:Boolean,xz_r:Boolean,imgSize:number,posSizeX:number,posSizeZ:number
}
const rawData = localStorage.getItem("saved")
const data = ref<dataIf>(rawData?JSON.parse(rawData):
    {x_r: false, z_r: false, xz_r: false, imgSize: 100, posSizeX: 100, posSizeZ: 100}
)
watch(data,(cur)=>{
  localStorage.setItem("saved",JSON.stringify(cur))
},{deep:true})
//------

const x = ref(0) // currentPos
const z = ref(0) // currentPos

// following used for auto-get-posSize
const x_fix = ref(0) // zeroPoint
const z_fix = ref(0) // zeroPoint
const x_fix_adv = ref(1) // refPoint
const z_fix_adv = ref(1) // refPoint
const x_fix_adv_std = ref(1024) // refPointStd
const z_fix_adv_std = ref(1024) // refPointStd

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
  data.value.posSizeX = x_fix_adv_std.value/(x_fix_adv.value-x_fix.value) *100;
  data.value.posSizeZ = z_fix_adv_std.value/(z_fix_adv.value-z_fix.value) *100;
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
  <div>
    <div class="overlay no-select">
      <div class="card imgCard"
           @mouseenter="showFloat = true" @mouseleave="showFloat = false">
        <img class="map" v-if="imageUrl" :src="imageUrl" alt="地图文件"
          :style="{width: data.imgSize + '%'}"/>
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
        <div>图片放缩 <input type="number" class="field" v-model="data.imgSize"
                             min="0.001" max="100000" step="10"/> %</div>
        <div>标度放缩 <input type="number" class="field"
                             :value="data.posSizeX"
                             @input="e => { data.posSizeX = data.posSizeZ = Number((e.target as HTMLInputElement).value) }"
                             min="0.001" max="100000" step="10"/> %</div>
        <div class="row">
          <div class="row"><input type="checkbox" id="check_x_r" v-model="data.x_r" />x轴反转</div>
          <div class="row"><input type="checkbox" id="check_y_r" v-model="data.z_r" />z轴反转</div>
          <div class="row"><input type="checkbox" id="check_y_r" v-model="data.xz_r" />xz轴交换</div>
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
      {{data.xz_r?"z":"x"}} = {{ Math.trunc((x - x_fix) * data.posSizeX / 100) * (data.x_r?-1:1) }} ,
      {{data.xz_r?"x":"z"}} = {{ Math.trunc((z - z_fix) * data.posSizeZ / 100) * (data.z_r?-1:1) }}
    </div>
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