<script setup lang="ts">
import {ref, onMounted, onUnmounted, watch} from 'vue'
import { io,Socket } from 'socket.io-client'

interface get{
  role:number,cur:number,op:boolean,content:{text:string,info:number}[],run:boolean
}
interface list{
  name:string,role:number
}
//1red,2blue,10redplayer,etc.30mutiplayer
//1red,2blue,3white,4keli,0unknown

const data = ref<get>({
  role:-1,cur:-1,op:false,run:false,
  content:[]})
const list = ref<list[]>(
    []
)
let socket: Socket
onMounted(()=>{
  socket = io('https://api.xksyu.cn/')
  socket.on('server-return-info',(raw:get) => {
    data.value = raw;
  })
  socket.on('server-return-list',(raw:list[]) => {
    list.value = raw;
  })
  socket.on('win',(code)=>{
    if(code==1) alert("红队胜利")
    else if(code==2) alert("蓝队胜利")
  })
})
onUnmounted(() => {
  if (socket) socket.disconnect();
});
const postData = (poster:number) => {
  socket.emit('server-receive-action',poster)
}
//>0info,-1op,-2next
const name = ref("mouse")
const postName = (poster:string) => {
  socket.emit('server-receive-name',poster)
}

const opButton = ref<{text:string,class:string,cur:string}>({text:"loading...",class:"",cur:""})
watch(data.value,()=>{
  opButton.value.text = data.value.op ?
      (data.value.run? "中止游戏" : "开始游戏") : (data.value.run? "正在进行" : "等待游戏开始" )
  opButton.value.class = data.value.op ?
      (data.value.run? "button buttonB" : "button buttonA") : (data.value.run? "" : "button buttonA" )
  switch (data.value.cur){
    case 1: opButton.value.cur = "红队长组织语言"; break;
    case 2: opButton.value.cur = "蓝队长组织语言"; break;
    case 10: opButton.value.cur = "红队员做出选择"; break;
    case 20: opButton.value.cur = "蓝队员做出选择"; break;
  }
},{deep:true, immediate: true })

const getPlayerColor = (role: number) => {
  if (role === 1 || role === 10) return "var(--color-secondary-container)";
  if (role === 2 || role === 20) return "var(--color-primary-container)";
  if (role === 30) return "#DCFADC";
};
const getPlayerTitle = (role: number) => {
  const titles: Record<number, string> = {
    1: "红队队长", 2: "蓝队队长", 10: "红队队员", 20: "蓝队队员", 30: "自由人"
  };
  return titles[role];
};
const getTextStyle = (info:number) => {
  switch (info){
    case 0:
      return { borderWidth: "2px", borderStyle: "solid" };
    case 1:
      return { backgroundColor: "var(--color-primary-container)" };
    case 2:
      return { backgroundColor: "var(--color-secondary-container)" };
    case 3:
      return { backgroundColor: "#DCFADC" };
    case 4:
      return { backgroundColor: "#44403C", color: "white" };
  }
}

</script>

<template>
<div class="layout no-select">
  <div class="lineA">

    <div class="op">
      <div class="title">行动代号</div>
      <div v-if="data.run" class="cur">当前进程
        <div class="subCur">{{opButton.cur}}</div>
      </div>
      队长引导队员选中本队词语。<br>
      绿色为无关词语，黑色代表炸弹。
      <div class="buttonGroup no-select">
        <div :class="opButton.class" @click="postData(-1)" v-if="data.op||!data.run"> {{opButton.text}} </div>
        <div class="button"  style="background-color: #DCFADC"
        @click="postData(-2)">下一步骤</div>
      </div>
    </div>

    <div class="layoutB">
      <div class="name">
        <div style="font-size: 18px">修改名称</div>
        <input type="text" class="nameInput" v-model="name"/>
        <div class="button buttonC" @click="postName(name)">提交</div>
      </div>

      <div class="player">
        <div
            v-for="player in list"
            class="singleP"
            :class="{ selected: data.cur === player.role }"
            :style="{ backgroundColor: getPlayerColor(player.role) }">
          <div class="ptitle">{{ getPlayerTitle(player.role) }}</div>
          <div class="nameLine">
            <div class="name">{{ player.name }}</div>
            <div class="subCur" v-if="data.role === player.role">我</div>
            <div class="subCur" v-if="data.cur === player.role">当前</div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <div class="lineB">
    <div
        v-for="(elem,index) in data.content" :style="getTextStyle(elem.info)"
        class="elem no-select" @click="postData(index+1)">
      {{ elem.text }}
    </div>
  </div>
</div>
</template>

<style scoped>
.layout{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.lineA{
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  gap:10px
}
.button{
  border-radius: 10px;
  padding: 0.5rem;
  color: var(--color-on-primary-container);
}
.op{
  background-color:var(--color-surface-2);
  margin: 20px;
  padding: 25px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:10px
}
.title{
  font-size: 35px;
}
.cur{
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
}
.subCur{
  background-color: var(--color-accent-soft-yellow);
  padding: 5px;
  border-radius: 5px;
}
.buttonGroup{
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.layoutB{
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.name{
  margin-left: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.nameInput{
  padding: 5px;
}
input[type=text] {
  border: none;
  outline: none;
}

.buttonC{
  background-color: var(--color-primary);
  color: white;
}
.singleP{
  margin: 15px;
  padding: 25px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:10px
}
.ptitle{
  font-size: 25px;
}
.selected{
  border-width: 2px;
  border-style: solid
}
.nameLine{
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
}

.buttonB{
  background-color: var(--color-secondary-container);
}
.buttonA{
  background-color: var(--color-inverse-primary);
}

.player{
  display: flex;
  flex-direction: row;
  justify-items: center;
  border-radius: 10px;
}

.lineB{
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(5, auto);
}
.elem{
  padding: 20px;
  border-radius: 15px;
  font-size: 20px;
}
</style>