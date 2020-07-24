<template>
  <div>
    <button class="tab1">按钮1<span><a href="javascript:;">123</a></span></button>
    <button class="tab2">按钮2</button>
    <button class="tab3">按钮3</button>
    <button class="tab4" @click="handleError">按钮4</button>
  </div>
</template>

<script>
export default {
  name: 'file-name',
  methods: {
    handleError () {
      // throw new Error('unknow methods')
      window.cach()
    }
  }
}
</script>
