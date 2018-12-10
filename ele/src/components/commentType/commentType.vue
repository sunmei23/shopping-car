<template>
  <div>
    <div class="commentType">
      <div class="selectType">
        <span class="all" :class="{active:all===selectType}" @click="selecthandle(all)">{{commentType[all]}} <i class="count">{{foodRatings.length}}</i></span>
        <span class="good" :class="{active:good===selectType}" @click="selecthandle(good)">{{commentType[good]}} <i class="count">{{foodRatings | ratingsFilter(good).length}}</i></span>
        <span class="bad" :class="{active:bad===selectType}" @click="selecthandle(bad)">{{commentType[bad]}} <i class="count">{{foodRatings | ratingsFilter(bad).length}}</i></span>
      </div>
      <div class="onlyContent">
        <span class="icon-check_circle"  :class="{active: onlyContent}" @click="toggleOnlyContent"></span>
        <span class="content">只看有内容的评价</span>
      </div>
    </div>
    <div class="commentContent">
      <user-comment>
        <food-comment :slot="commentFor" :foodRatings="foodRatings |ratingsFilter(selectType) | contentFilter(onlyContent)" v-if="commentFor==='food'"></food-comment>
        <shop-comment :slot="commentFor" :shopRatings="foodRatings |ratingsFilter(selectType) | contentFilter(onlyContent)" v-if="commentFor==='shop'"></shop-comment>
      </user-comment>
    </div>
  </div>
</template>

<script>
  import UserComment from '../userComment/userComment';
  import FoodComment from '../foodComment/foodComment';
  import ShopComment from '../shopComment/shopComment';
  const ALL = 2;
  const GOOD = 0;
  const BAD = 1;
  export default {
    name: "commentType",
    data() {
        return {
          all: ALL,
          good: GOOD,
          bad: BAD
        }
    },
    components: {
      UserComment,
      FoodComment,
      ShopComment
    },
    props: {
      foodRatings: {
        type: Array,
        default: []
      },
      commentType: {
        type: Array,
        default: ["推荐", "吐槽", "全部"]
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      selectType: {
        type: Number,
        default: 2
      },
      commentFor: {
        type: String,
        default: 'food'
      }
    },
    methods: {
      selecthandle(type) {
        if (this.selectType !== type) {
          this.$emit('changeSelectType', type);
        }
      },
      toggleOnlyContent() {
        this.$emit('changeOnlyContent');
      }
    },
    filters: {
      ratingsFilter: function (ratings, type) {
        if (type === ALL) {
          return ratings;
        }
        let resArr = [];
         ratings.forEach((item) => {
           if (Number(item.rateType) === type) {
             resArr.push(item);
           }
         });
         return resArr;
      },
      contentFilter: function (ratings, flag) {
        if (!flag) {
          return ratings;
        }
        let resArr = [];
        ratings.forEach((item) => {
          if (item.text !== '') {
            resArr.push(item);
          }
        });
        return resArr;
      }
    }
  }
</script>

<style scoped lang="less">
  .commentType{
    width: 100%;
    border-bottom: 1px solid rgba(7,17,27,0.1);
    padding: 0px 18px;
    font-size: 0px;
    .selectType{
      padding: 18px 0px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      .all,.good,.bad{
        display: inline-block;
        padding: 8px 12px;
        margin-right: 8px;
        font-size: 14px;
        line-height: 16px;
        color: rgb(77,85,93);
        .count{
          font-size: 12px;
        }
        &.active{
          color: #fff;
        }
        &.all,&.good{
          background-color: rgba(0,160,220,.2);
          &.active{
            background-color: rgb(0,160,220);
          }
        }
        &.bad{
          background-color: rgba(77,85,93,.2);
          &.active{
            background-color: rgb(77,85,93);
          }
        }
      }
    }
    .onlyContent{
      padding:12px 0px;
      font-size: 0px;
      line-height: 24px;
      color: rgb(147,153,159);
      .icon-check_circle{
        font-size: 24px;
        line-height: 24px;
        margin-right: 4px;
        vertical-align: middle;
        &.active{
          color: rgb(0,160,220);
        }
      }
      .content{
        font-size: 12px;
        line-height: 24px;
        vertical-align: top;
      }
    }
  }
  .commentContent{
    width: 100%;
  }

</style>
