<template>
  <transition name="move">
    <div class="foodDetail" v-show="showFlag" ref="foodDetail">
      <div class="headerImg">
        <img :src="selectedFood.image" alt="商品"/>
        <span class="go-back icon-arrow_lift" @click="hidden"></span>
      </div>
      <div class="foodInfo">
        <div class="title">{{selectedFood.name}}</div>
        <div class="sell">
          <span class="count">月售{{selectedFood.sellCount}}份</span><span class="rating">好评率{{selectedFood.sellCount}}%</span>
        </div>
        <div class="price">
          <span class="now"><i class="ni">&yen;</i>{{selectedFood.price}}</span>
          <span class="old" v-if="selectedFood.oldPrice > 0"><i class="oi">&yen;</i>{{selectedFood.oldPrice}}</span>
        </div>
        <div class="addCart" v-show="!calCartShow && !firstClick" @click.stop.prevent="addCart">加入购物车</div>
        <cal-food class="calfood-wrapper" :food="selectedFood" v-show="calCartShow || firstClick" ref="calfood" @listenFoodCount="_toFather"></cal-food>
      </div>
      <separator-line v-show="selectedFood.info"></separator-line>
      <div class="foodDes" v-show="selectedFood.info">
        <h1 class="title">商品介绍</h1>
        <p class="content">{{selectedFood.info}}</p>
      </div>
      <separator-line></separator-line>
      <div class="comment-wrapper">
        <div class="comment-header">
          <div class="title">商品评价</div>
          <comment-type :foodRatings="selectedFood.ratings || []" :commentType="commentType" :onlyContent="onlyContent" :selectType="selectType" @changeSelectType="_changeSelectType" @changeOnlyContent="_changeOnlyContent"
            :commentFor="commentFor"></comment-type>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll';
  import SeparatorLine from '../separatorLine/separatorLine';
  import CommentType from '../commentType/commentType';
  const FOOD = 'food'
  // import Vue from 'vue'
    export default {
      name: "foodDetail",
      components: {CommentType, SeparatorLine},
      data () {
          return {
            showFlag: false,
            FoodDetailScroll: {},
            firstClick: false,
            commentType: ["推荐", "吐槽", "全部"],
            onlyContent: false,
            selectType: 1,
            commentFor: FOOD
          }
      },
      props: {
        selectedFood: {
          type: Object,
          default: {}
        }
      },
      computed: {
        calCartShow() {
            if (!this.selectedFood.count || this.selectedFood.count === 0) {
              this._setFirstClick(false);
              return false;
            } else {
              this._setFirstClick(true);
              return true;
            }
        }
      },
      methods: {
        show() {
          this.showFlag = true;
        },
        hidden() {
          this.showFlag = false;
        },
        _initScroll() {
          this.FoodDetailScroll = new BScroll('.foodDetail', {
            scrollY: true,
            click: true
          });
        },
        addCart() {
          this.firstClick = true;
          this.$refs.calfood.addFood();
        },
        _setFirstClick(value) {
          this.firstClick = value;
        },
        _changeSelectType(type) {
          this.selectType = type;
        },
        _changeOnlyContent() {
          this.onlyContent = !this.onlyContent;
        },
        _toFather(food, count) {
          this.$emit('listenFoodCount', food, count);
        }
      }
    }
</script>

<style scoped lang="less">
.foodDetail{
    position: fixed;
    left: 0px;
    bottom: 48px;
    padding-top: 48px;
    width: 100%;
    height: 100%;
    font-size: 0px;
    background: rgb(255,255,255);
    overflow: auto;
    &.move-enter-active,&.move-leave-active{
      transition: all 0.5s linear;
    }
    &.move-enter,&.move-leave-to{
      transform: translate3d(-100%,0,0);
    }
    &.move-enter-to,&.move-leave{
      transform: translate3d(0,0,0);
    }
    .headerImg{
      position: relative;
      width: 100%;
      height: 375px;
      /*padding-top: 100%;*/
      box-sizing: border-box;
      img{
        width: 100%;
        height: 100%;
        /*margin-top: -100%;*/
      }
      .go-back{
        position: absolute;
        display: inline-block;
        height: 40px;
        width: 40px;
        left: 20px;
        top: 20px;
        font-size: 20px;
        text-align: center;
        line-height: 40px;
        background-color: rgba(7,17,27,.4);
        color: #fff;
        border-radius: 50%;
      }
    }
    .foodInfo{
      width: 100%;
      padding: 18px;
      font-size: 0px;
      position: relative;
      .title{
        font-size: 14px;
        line-height: 14px;
        color: rgb(7,17,27);
        font-weight: 700;
        margin-bottom: 8px;
      }
      .sell{
        font-size: 10px;
        line-height: 10px;
        color: rgb(147,153,159);
        margin-bottom: 18px;
        .count{
          margin-right: 12px;
        }
      }
      .price{
        .now{
          font-size: 14px;
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
      .addCart,.calfood-wrapper {
        position: absolute;
        right: 18px;
        bottom: 18px;
      }
      .calfood-wrapper{
        z-index: 100;
      }
      .addCart{
        width: 74px;
        height: 24px;
        border-radius:12px;
        font-size: 10px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        background-color: rgb(0,160,220);
      }
    }
    .foodDes{
      font-size: 0px;
      width: 100%;
      padding: 18px;
      .title{
        font-size: 14px;
        line-height: 24px;
        color: rgb(7,17,27);
        font-weight: 200;
        margin-bottom: 6px;
      }
      .content{
        margin: 0px 8px;
        font-size: 12px;
        line-height: 24px;
        color: rgb(77,85,93);
        font-weight: 200;
      }
    }
    .comment-wrapper{
      .comment-header{
        .title{
          padding: 18px 18px 0px;
          font-size: 14px;
          line-height: 24px;
          color: rgb(7,17,27);
          font-weight: 200;
        }
      }
    }
  }
</style>
