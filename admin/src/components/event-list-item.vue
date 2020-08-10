<template>
  <div
    class="event-list-item flex-center-align"
    :class="{
      resolved
    }"
  >
    <div class="pr10">
      <el-checkbox :value="true" :disabled="resolved" />
    </div>
    <div class="flex-grow-1 f14 c-666">
      <div class="flex-center-between">
        <p class="f16 c-333">TypeError</p>
        <span class="f12 c-999">今天 12:34</span>
      </div>
      <div class="flex-center-between">
        <p class="">接口请求报错</p>
        <span class="f12 c-999">所属页面: 确认订单</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        // eslint-disable-next-line
        return {"appId":123,"id":"337b4c2c66ea0a485194ad9a27db8354","detail":{"level":"error","name":"Error","message":"接口请求报错","track":[{"type":"xhr","data":{"type":"request","url":"https://youl.uban360.com/gift-front/user/me1?siteId=1","method":"GET"}}],"userInfo":{"platform":"MacIntel","network":"4g","platformVersion":"10.15.6","browser":"Chrome","browserVersion":"84.0.4147.105","uuid":"aXVRS3ZMdlZyWXlDSXIxNTk2NDE4NTEzNjE5"},"status":0,"responseURL":"","responseText":""}}
      }
    }
  },

  computed: {
    resolved () {
      return false
    }
  }
}
</script>

<style lang="less">
.event-list-item {
  position: relative;
  padding: 10px;
  border-bottom: 1px #eee solid;
  &:before {
    content: '';
    display: block;
    height: 100%;
    width: 2px;
    background: #3b8ff6;
    left: 0;
    top: 0;
    position: absolute;
  }
  &.resolved {
    .c-333 {
      color: #999;
    }
    .c-666 {
      color: #999;
    }
  }
}
</style>
