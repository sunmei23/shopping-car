<template>
  <div id="app">
    <v-header :seller="seller">我是头部</v-header>
    <div class="content">
      <div class="tab border-1px">
        <div class="tab_item"><router-link :to ="{name: 'goods'}">商品</router-link></div>
        <div class="tab_item"><router-link :to ="{name: 'comments'}">评价</router-link></div>
        <div class="tab_item"><router-link :to ="{name: 'shops'}">商家</router-link></div>
      </div>
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import VHeader from './components/vheader/vheader';
  export default {
    name: 'App',
    data() {
      return {
        seller: {}
      }
    },
    created () {
      this.axios.get('static/data.json')
        .then(res => {
          this.seller = res.data.seller;
        })
        .catch(err => {
          console.log(err);
        });
    },
    components: {
      VHeader
    }
  };
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import "./common/less/mixin";
  @import "./common/less/base";
  .content{
    position: fixed;
    left: 0;
    top: 134px;
    padding-bottom: 192px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
  .tab{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    display: flex;
    font-size: 16px;
    .border-1px(rgba(7,17,27,.1));
    .tab_item{
      flex: 1;
      a{
        display: block;
        width: 100%;
        height: 100%;
        color: rgb(77,85,93);
        &.tab-active{
          color: rgb(240,20,20);
        }
      }
    }
  }
</style>
