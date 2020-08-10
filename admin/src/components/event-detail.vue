<template>
  <div class="event-detail p20 f14">
    <div class="flex">
      <div class="mr10 bd br bd-eee" style="width: 60%">
        <div class="mr10">
          <p class="event-detail__title">基本信息</p>
          <div class="event-detail__info">
            <span class="event-detail__info-title">时间</span>
            <span class="event-detail__info-value">2020/12/21 12:53:23</span>
          </div>
          <div class="event-detail__info">
            <span class="event-detail__info-title">所属页面</span>
            <span class="event-detail__info-value">确认订单</span>
          </div>
          <div class="event-detail__info">
            <span class="event-detail__info-title">URL</span>
            <span class="event-detail__info-value"><a href="">https://studio.e.huawei.com/studio/index.html#/studio/000f000000YeCgvfYHFw</a></span>
          </div>
          <div class="event-detail__info">
            <span class="event-detail__info-title">userAgent</span>
            <span class="event-detail__info-value">Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36</span>
          </div>
        </div>
      </div>
      <div style="width: 40%">
        <p class="event-detail__title">环境</p>
        <div class="event-detail__info">
          <span class="event-detail__info-title">浏览器</span>
          <span class="event-detail__info-value">chrome / 84.0.234</span>
        </div>
        <div class="event-detail__info">
          <span class="event-detail__info-title">设备</span>
          <span class="event-detail__info-value">iPhone / os 15</span>
        </div>
        <div class="event-detail__info">
          <span class="event-detail__info-title">网络</span>
          <span class="event-detail__info-value">4g</span>
        </div>
        <div class="event-detail__info">
          <span class="event-detail__info-title">IP</span>
          <span class="event-detail__info-value">10.0.10.59 / 杭州</span>
        </div>
      </div>
    </div>
    <div class="mt20">
      <p class="event-detail__title">详细</p>
      <div class="event-detail__info">
        <span class="event-detail__info-title">错误</span>
        <span class="event-detail__info-value">TypeError: window.cach is not a function</span>
      </div>
      <div class="event-detail__info">
        <span class="event-detail__info-title">堆栈</span>
        <span class="event-detail__info-value">
          <pre v-html="'TypeError: window.cach is not a function\\n    at VueComponent.handleError (webpack-internal:///./node_modules/cache-loader/dist/cjs.js?!./node_modules/babel-loader/lib/index.js!./node_modules/cache-loader/dist/cjs.js?!./node_modules/vue-loader/lib/index.js?!./example/App.vue?vue&type=script&lang=js&:16:14)\\n    at invokeWithErrorHandling (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:1853:26)\\n    at HTMLButtonElement.invoker (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:2178:14)\\n    at HTMLButtonElement.original._wrapper (webpack-internal:///./node_modules/vue/dist/vue.runtime.esm.js:6907:25)'.replace(/\\n/g, '<br>')" />
        </span>
      </div>
    </div>
    <div class="mt20 flex">
      <div class="mr10 bd br bd-eee" style="width: 50%">
        <div class="mr10">
          <p class="event-detail__title">其他信息</p>
          <div class="event-detail__info">
            <span class="event-detail__info-title">插件版本</span>
            <span class="event-detail__info-value">0.0.1</span>
          </div>
          <div class="event-detail__info">
            <span class="event-detail__info-title">事件ID</span>
            <span class="event-detail__info-value">aXVRS3ZMdlZyWXlDSXIxNTk2NDE4NTEzNjE5</span>
          </div>
          <div class="event-detail__info">
            <span class="event-detail__info-title">用户ID</span>
            <span class="event-detail__info-value">aXVRS3ZMdlZyWXlDSXIxNTk2NDE4NTEzNjE5</span>
          </div>
        </div>
      </div>
      <div class="" style="width: 50%">
        <p class="event-detail__title">线索</p>
        <div class="event-detail__info">
          <span class="event-detail__info-title">错误类型</span>
          <span class="event-detail__info-value">vue 组件报错</span>
        </div>
        <div class="event-detail__info">
          <span class="event-detail__info-title">组件名称</span>
          <span class="event-detail__info-value">vue-component-1-file-name</span>
        </div>
        <div class="event-detail__info">
          <span class="event-detail__info-title">关键节点</span>
          <span class="event-detail__info-value">v-on handler</span>
        </div>
      </div>
    </div>
    <div class="mt20">
      <p class="event-detail__title">复现轨迹</p>
      <div class="p30">
        <el-steps
          direction="vertical"
          :active="4"
          process-status="error"
          finish-status="wait"
          align-center
        >
          <el-step title="log" description="打印信息" />
          <el-step title="log" description="打印信息" />
          <el-step title="click" description="button.class button.id" />
          <el-step title="xhr request" description="打印信息" />
          <el-step title="xhr response" description="这是一段很长很长很长的描述性文字" />
        </el-steps>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.event-detail {
  height: e('calc(100% - 30px)');
  overflow: auto;
  &__title {
    position: relative;
    padding-left: 10px;
    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 3px;
      width: 5px;
      height: 70%;
      left: 0;
      background: #3b8ff6;
    }
  }
  &__info {
    display: flex;
    // align-items: center;
    border-bottom: 1px #eee solid;
    padding: 13px 0;
    &-title {
      color: #999;
      width: 100px;
      flex-shrink: 0;
    }
    &-value {
      word-break: break-all;
      overflow: auto;
      a {
        color: #3b8ff6;
        &:hover {
          text-decoration: underline;
        }
      }
      pre {
        width: 100%;
        overflow: auto;
        background: #f2f2f2;
        margin: 0;
        padding: 10px;
        font-size: 12px;
        border-radius: 4px;
      }
    }
  }
}
</style>
