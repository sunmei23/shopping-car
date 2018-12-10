<template>
  <div class="shoppingcart">
    <div class="cart-left" @click.stop.prevent="toggleCart">
      <div class="cart-box">
        <div class="cart" :class="{'highLight': totalCounts > 0}">
          <span class="icon-shopping_cart"></span>
        </div>
      </div>
      <div class="price" :class="{'highLight': totalCounts > 0}">&yen; {{totalPrice}}</div>
      <div class="others">另需配送费 &yen; {{deliveryPrice}}元</div>
      <div class="foodCounts" v-show="totalCounts > 0">{{totalCounts}}</div>
    </div>
    <div class="cart-right" :class="{'highLight': this.totalPrice >= this.minPrice && this.totalPrice}" ref="resultHtml">&yen;{{minPrice}}起送</div>
    <transition name="cart-slide">
      <div class="cart-content" v-show="show" @click.stop.prevent="toggleCart">
        <div class="cart-content-wrapper">
          <div class="title border-1px">
            <span class="name">购物车</span>
            <div class="clearAll" @click.stop.prevent="clearAll">清空</div>
          </div>
          <div class="content-warpper">
            <ul class="content">
              <li v-for="(fooditem, index) in selectFood" :key="index" class="content-item border-1px" v-show="fooditem.count">
                <div class="food-name">{{fooditem.name}}</div>
                <cal-food class="calfood-wrapper" :food="fooditem" ref="calFood" @listenFoodCount="_toFather"></cal-food>
                <div class="price">
                  <span class="now"><i class="ni">&yen;</i>{{fooditem.price * fooditem.count}}</span>
                  <span class="old" v-if="fooditem.oldPrice > 0"><i class="oi">&yen;</i>{{fooditem.oldPrice * fooditem.count}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'shoppingcart',
  data() {
    return {
      show: false
    }
  },
  methods: {
    toggleCart() {
        if (this.totalCounts === 0) {
          this.setShow(false);
        } else {
          this.show = !this.show;
        }
    },
    clearAll() {
      this.$refs.calFood.forEach((item) => {
        item.clearFood();
      })
    },
    setShow(show) {
      this.show = show;
    },
    _toFather(food, count) {
      this.$emit('listenFoodCount', food.typeName, food, count);
    }
  },
  computed: {
    resultHtml () {
      let html = '';
      if (this.totalPrice === 0) {
        html = `&yen;${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        let priceSpread = this.minPrice - this.totalPrice;
        html = `还差&yen;${priceSpread}起送`;
      } else {
        html = '去结算';
      }
      return html;
    },
    totalCounts () {
      let totalCount = 0;
      this.selectFood.forEach((food) => {
        totalCount += food.count
      });
      if (totalCount === 0) {
        this.setShow(false);
      }
      return totalCount;
    },
    totalPrice () {
      let totalp = 0;
      this.selectFood.forEach((food) => {
        totalp += food.count * food.price;
      });
      return totalp;
    }
  },
  watch: {
    resultHtml(curVal, oldVal) {
      this.$refs.resultHtml.innerHTML = curVal;
    }
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    selectFood: {
      type: Array,
      default: []
    }
  },
  mounted () {
    this.$refs.resultHtml.innerHTML = this.resultHtml;
  }
};
</script>

<style scoped lang="less">
  @import "../.././common/less/mixin";
  .shoppingcart{
    position: fixed;
    width: 100%;
    height: 48px;
    bottom: 0px;
    left: 0px;
    background-color: #141d27;
    color: rgba(255,255,255,0.4);
    display: flex;
    .cart-left{
      color: #fff;
      padding: 0px 12px;
      flex: 1;
      .cart-box{
        background-color: #141d27;
        position: relative;
        display: inline-block;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        top: -10px;
        padding: 6px;
        z-index: 2;
        .cart{
          display: flex;
          height: 100%;
          background-color:rgba(255,255,255,0.2);
          border-radius: 50%;
          text-align: center;
          justify-content: center;
          &.highLight{
            background-color: rgb(0,160,220);
            .icon-shopping_cart{
              color: #fff;
            }
          }
          .icon-shopping_cart{
            align-self: center;
            font-size: 24px;
            line-height: 24px;
            color: rgba(255,255,255,0.4);
          }
        }
      }
      .price{
        display: inline-block;
        height: 24px;
        margin: 12px;
        padding-right: 12px;
        text-align: center;
        line-height: 24px;
        vertical-align: top;
        color: rgba(255,255,255,0.4);
        font-size: 16px;
        font-weight:700;
        border-right: 1px solid rgba(255,255,255,0.1);
        &.highLight{
          color: #fff;
        }
        }
      }
      .others{
        display: inline-block;
        margin: 12px 0px;
        font-size: 12px;
        font-weight: 700;
        line-height: 24px;
        vertical-align: top;
        color: rgba(255,255,255,0.4);
      }
    .foodCounts{
      position: absolute;
      left: 44px;
      top: -10px;
      min-width: 24px;
      height: 16px;
      font-size: 9px;
      line-height: 16px;
      color: #fff;
      text-align: center;
      padding: 0px 6px;
      border-radius: 6px;
      background-color: rgb(240,20,20);
      box-shadow: 0px 4px 8px 0px rgba(0,0,0,.4);
      z-index: 3;
    }
    .cart-right{
      height: 100%;
      text-align: center;
      flex: 0 0 105px;
      background-color: #3d3d3d;
      font-size: 12px;
      line-height: 50px;
      align-self: center;
      color: rgb(255,255,255,0.1);
      &.highLight{
        background-color: rgb(0,160,220);
        color: #fff;
      }
    }
    .cart-content{
      color: black;
      background-color: rgba(7,17,27,.6);
      backdrop-filter: blur(10px);
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0px;
      bottom: 48px;
      z-index: 1;
      overflow: hidden;
      &.cart-slide-enter-active,&.cart-slide-leave-active{
        transition: all 0.5s linear;
      }
      &.cart-slide-enter, &.cart-slide-leave-to {
        .cart-content-wrapper{
          bottom: -262px;
        }
      }
      &.cart-slide-enter-to, &.cart-slide-leave {
        .cart-content-wrapper{
          bottom: 0px;
        }
      }
      .cart-content-wrapper{
        width: 100%;
        position: absolute;
        left: 0px;
        bottom: 0px;
        background-color: #fff;
        transition: all 0.5s linear;
        .title{
          height: 40px;
          line-height: 40px;
          background-color: #f3f5f7;
          padding:0px 18px;
          .border-1px(rgba(7,17,27,0.1));
          .name{
            float: left;
            font-size: 14px;
            color: rgb(7,17,27);
          }
          .clearAll{
            float: right;
            font-size: 12px;
            color: rgb(0,160,220);
          }
        }
        .content-warpper{
          overflow: auto;
          max-height: 262px;
          .content{
            width: 100%;
            padding: 0px 18px 10px 18px;
            .content-item{
              width: 100%;
              height: 48px;
              padding: 12px 0px;
              line-height: 24px;
              font-size: 14px;
              color: rgb(7,17,27);
              font-weight: 700;
              .border-1px(rgba(7,17,27,0.1));
              &:last-child{
                .border-none();
              }
              .food-name{
                float: left;
              }
              .price{
                display: inline-block;
                float: right;
                margin-right: 12px;
                margin-left: 18px;
                .now{
                  font-size: 16px;
                  color: rgb(240,20,20);
                  line-height: 24px;
                  margin-right: 8px;
                  font-weight: 700;
                  .ni{
                    font-size: 10px;
                    font-weight: 200;
                  }
                }
                .old{
                  font-size: 10px;
                  color: rgb(147,153,159);
                  line-height: 24px;
                  text-decoration: line-through;
                  font-weight: 700;
                  .oi{
                    font-weight: 200;
                  }
                }
              }
              .calfood-wrapper{
                float: right;
              }
            }
          }
        }
      }
    }
  }

</style>
