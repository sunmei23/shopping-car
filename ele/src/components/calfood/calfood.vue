<template>
    <div class="calfood">
      <transition name="move">
        <span class="icon-remove_circle_outline" @click.stop.prevent="decreaseFood" v-show="numberShow"></span>
      </transition>
      <span class="number"><i v-show="food.count > 0">{{food.count}}</i></span>
      <span class="icon-add_circle" @click.stop.prevent="addFood">
      </span>
      <transition name="drop"  v-on:after-enter="afterDropEnter" v-on:enter="dropEnter" v-on:before-enter="beforeDropEnter">
        <div class="drop-wrapper" v-show="show">
          <div class="inner"></div>
        </div>
      </transition>
    </div>
</template>

<script>
  import Vue from 'vue'
    export default {
      name: "calfood",
      data() {
          return {
            show: false,
            numberShow: this.food.count > 0
          }
      },
      props: {
        food: {
          type: Object,
          default: {}
        }
      },
      watch: {
        food: {
          handler(newValue, oldValue) {
            this.numberShow = newValue.count > 0;
          },
          deep: true
        }
      },
      created() {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 0);
        }
      },
      methods: {
        addFood() {
          this.show = true;
          let tempCount = this.food.count;
          if (++tempCount > 0) {
            this.numberShow = true;
          }
          setTimeout(() => {
            this.$emit("listenFoodCount", this.food, tempCount);
          }, 500);
        },
        decreaseFood() {
          let tempCount = this.food.count;
          this.$emit("listenFoodCount", this.food, --tempCount);
          if (tempCount === 0) {
            this.numberShow = false;
          }
        },
        beforeDropEnter(el, done) {
          el.style.webkitTransform = 'translate3d(0, 0, 0)';
          el.style.transform = 'translate3d(0, 0, 0)';
          let inner = el.getElementsByClassName('inner')[0];
          inner.style.webkitTransform = 'translate3d(0, 0, 0)';
          inner.style.transform = 'translate3d(0, 0, 0)';
        },
        afterDropEnter() {
          this.show = false;
        },
        dropEnter(el, done) {
          let x = el.getBoundingClientRect().left - 12 - 25;
          let y = window.innerHeight - el.getBoundingClientRect().top - 60;
          this.$nextTick(() => {
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            let inner = el.getElementsByClassName('inner')[0];
            inner.style.webkitTransform = `translate3d(-${x}px, 0, 0)`;
            inner.style.transform = `translate3d(-${x}px, 0, 0)`;
            el.addEventListener('transitionend', done);
            // done();
          });
        },
        clearFood() {
          this.$emit("listenFoodCount", this.food, 0);
        }
      }
    }
</script>

<style scoped lang="less">
  .calfood{
    font-size: 0px;
    width: 72px;
    height: 24px;
    position: relative;
    .icon-remove_circle_outline{
      display: inline-block;
      font-size: 24px;
      line-height: 24px;
      color:rgb(0,160,220);
    }
    .icon-add_circle{
      float: right;
      display: inline-block;//transform只有在block 和 inlineblock 有效
      font-size: 24px;
      line-height: 24px;
      color:rgb(0,160,220);
    }
    .number{
      display: inline-block;
      width: 24px;
      font-size: 10px;
      line-height: 24px;
      text-align: center;
      color: rgb(147,153,159);
      vertical-align: top;
    }
    .move-enter-active,.move-leave-active {
      transition: all .4s linear;
    }
    .move-enter, .move-leave-to {
      transform: translate3d(48px,0,0) rotate(180deg);
      opacity: 0;
    }
    .move-enter-to, .move-leave {
      transform: translate3d(0,0,0) rotate(0deg);
      opacity: 1;
    }
    .drop-wrapper{
      display: inline-block;
      position: absolute;
      right: 0px;
      top: 0px;
      .inner{
        height: 22px;
        width: 22px;
        border-radius: 50%;
        background-color: rgb(0,160,220);
        transition: all 0.5s linear;
      }
      &.drop-enter-active{
        transition: all 0.5s cubic-bezier(.46,-0.29,.68,-0.34);
      }
    }
  }
</style>
