<template>
  <div class="application-detail bg-f7">
    <s-header />
    <div class="application__bar">
      <div class="mlr30 height-100 flex-center-between">
        <p class="f16 b">审批H5</p>
        <el-button
          type="text"
          icon="el-icon-back"
          @click="$router.back()"
        >
          返回
        </el-button>
      </div>
    </div>
    <div class="application__events flex">
      <div class="application-events__list height-100">
        <div class="application-events__title flex-center-between">
          <div>
            <span>事件列表</span>
            <el-button
              icon="el-icon-refresh"
              type="text"
              :loading="false"
              class="f16"
            />
          </div>
          <div>
            <el-button type="text" icon="el-icon-success">标记为已解决</el-button>
          </div>
        </div>
        <list-item />
      </div>
      <div class="application-events__detail height-100">
        <div class="application-events__title flex-center-align">
          <span>详情</span>
        </div>
        <event-detail />
      </div>
    </div>
  </div>
</template>

<script>
import SHeader from '../components/header'
import ListItem from '../components/event-list-item'
import EventDetail from '../components/event-detail'

export default {
  components: {
    SHeader,
    ListItem,
    EventDetail
  }
}
</script>

<style lang="less">
.application {
  &-detail {
    height: 100vh;
  }
  &__bar {
    height: 35px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    background: #fff;
  }
  &__events {
    height: e('calc(100vh - 50px - 65px)');
    background: #fff;
    margin: 15px 30px;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  }
  &-events {
    &__list {
      width: 40%;
      border-right: 1px solid #eee;
    }
    &__title {
      height: 30px;
      font-size: 14px;
      border-bottom: 1px solid #eee;
      padding: 0 10px;
      // font-weight: bolder;
    }
    &__detail {
      width: 60%;
    }
  }
}
</style>
