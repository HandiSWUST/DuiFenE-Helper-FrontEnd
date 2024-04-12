<script setup>

import View from "./View.vue";
import {nextTick, ref, watch} from "vue";
import {attendance, homework} from "../svg/index.js";
import axios from "axios";

const index = ref(0)
const ts = ['对分易作业查询', '对分易签到查询', '签到']
const status = ref([false, false, false])
const loadings = ref([false, false, false])
const contents = ref(['', '', ''])
const urls = ['/homework', '/attend', '/signup']
const func = [homework, attendance, function () {
}]
const user = JSON.parse(localStorage.getItem('user') ?? "{}")
const ap = ref({
  "acc": user.acc,
  "pwd": user.pwd,
  "code": ""
})
const msg = ref('')
const handler = () => {
  const i = index.value;
  loadings.value[i] = true
  axios.post(urls[index.value], {
    "acc": ap.value.acc,
    "pwd": ap.value.pwd,
  }).then((v) => {
    contents.value[i] = func[i](v.data)
    status.value[i] = true;
    updateView()
  }).catch((e) => {
    console.log('err', e)
    msg.value = '登录过期或其他错误，请尝试重新登录'
    show.value = true;
  }).finally(() => {
    loadings.value[i] = false
  })
  // status.value[index.value] = true
}
const updateView = () => {
  nextTick(() => {
    if (index.value !== 3) {
      const element = document.querySelector(`#render-x${index.value}`);
      if (element) {
        element.innerHTML = contents.value[index.value]
      }
    }


  })
}

const sg = () => {
  loadings.value[2] = true
  axios.post('/signup', {
    "acc": ap.value.acc,
    "pwd": ap.value.pwd,
    "code": ap.value.code
  }).then((value) => {
    console.log(value.data.msg)
    msg.value = value.data.msg
    show.value = true
  }).finally(() => {
    loadings.value[2] = false
  })
}
watch(index, (value) => {
  if (value === 3) {
    index.value = 0;
    emit('login', 0)
  } else {
    updateView(index.value)
  }
})
const emit = defineEmits(['login'])

const show = ref(false)
</script>

<template>

  <View :title="ts[index]">
    <template #list>
      <template v-if="!status[index]">
        <div v-if="index!==2" style="display: flex;justify-content:center;margin-top: 10em">
          <var-button :loading="loadings[index]" :size="'large'"
                      round style="height: 3em;width: 3em;font-family: 'DingTalk-JinBuTi'" text @click="handler">
            查询
          </var-button>
        </div>
        <div v-else>
          <var-input v-model="ap.code" :loading="loadings[index]" placeholder="请输入签到码"></var-input>
          <div style="display: flex;justify-content:center;margin-top: 4em">
            <var-button type="primary" @click="sg">
              签到
            </var-button>
          </div>
        </div>
      </template>
      <template v-else>
        <div v-if="index!==2" :id="`render-x${index}`"></div>
        <div v-else>
          11
        </div>
      </template>
    </template>
  </View>
  <var-tabs
      v-model:active="index"
      :fixed-bottom="true"
      style="margin-bottom: 10px;font-family: 'DingTalk-JinBuTi';"
  >
    <var-tab>作业查询</var-tab>
    <var-tab>签到查询</var-tab>
    <var-tab>签到</var-tab>
    <var-tab>返回</var-tab>
  </var-tabs>
  <var-snackbar v-model:show="show">{{ msg }}</var-snackbar>
</template>

<style scoped>

</style>
