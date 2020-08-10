<template>
  <div class="bg-333 flex-center" style="height: 100vh">
    <div style="margin-top:-100px">
      <p class="c-fff" style="font-size: 50px">Sparrow</p>
      <p class="tc c-999 f16 mt10">讯盟前端监控平台</p>
      <div class="tc mt50 pt50 flex-center">
        <div
          data-text="立即体验"
          class="cp c-button button--tamaya button--border-medium"
          @click="$router.push('/list')"
        >
          <span>立即体验</span>
        </div>
      </div>
    </div>

    <div class="fixed width-100 tc b10"><p class="c-666 f12 mt10">Designed by 讯盟FE - 前端运营商组</p></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  }
}
</script>

<style lang="less" scoped>
.c-button {
  // min-width: 150px;
  // max-width: 250px;
  display: block;
  // margin: 1em;
  padding: 1em 2em;
  border: none;
  background: none;
  color: inherit;
  vertical-align: middle;
  position: relative;
  z-index: 1;
  -webkit-backface-visibility: hidden;
  -moz-osx-font-smoothing: grayscale;
}
.c-button:focus {
  outline: none;
}
.c-button > span {
  vertical-align: middle;
}
.button--tamaya {
  overflow: hidden;
  border-color: #7986cb;
  color: #7986cb;
  // min-width: 180px;
}
.button--tamaya.button--inverted {
  color: #37474f;
  border-color: #37474f;
}
.button--tamaya::before,
.button--tamaya::after {
  content: attr(data-text);
  position: absolute;
  width: 100%;
  height: 50%;
  left: 0;
  background: #7986cb;
  // background: transparent;
  color: #fff;
  overflow: hidden;
  -webkit-transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}
.button--tamaya.button--inverted::before,
.button--tamaya.button--inverted::after {
  background: #fff;
  color: #37474f;
}
.button--tamaya::before {
  top: 0;
  padding-top: 1em;
}
.button--tamaya::after {
  bottom: 0;
  line-height: 0;
}
.button--tamaya > span {
  display: block;
  -webkit-transform: scale3d(0.2, 0.2, 1);
  transform: scale3d(0.2, 0.2, 1);
  opacity: 0;
  -webkit-transition: -webkit-transform 0.3s, opacity 0.3s;
  transition: transform 0.3s, opacity 0.3s;
  -webkit-transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
  transition-timing-function: cubic-bezier(0.2, 1, 0.3, 1);
}
.button--tamaya:hover::before {
  -webkit-transform: translate3d(0, -100%, 0);
  transform: translate3d(0, -100%, 0);
}
.button--tamaya:hover::after {
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
}
.button--tamaya:hover > span {
  opacity: 1;
  -webkit-transform: scale3d(1, 1, 1);
  transform: scale3d(1, 1, 1);
}
.button--border-medium {
  border: 2px solid;
}
</style>
