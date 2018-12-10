<template>
    <div class="goods">
      <div class="menu-wrapper" ref="menuScroll">
        <ul class="memus">
          <li v-for="(menu,mindex) in goods" :key="mindex" class="menu-item border-1px menu-item-hook" @click="menuClick(mindex,$event)" :class="{'active':currentIndex===mindex}">
              <div class="item_box">
                 <span class="text">
                <span class="icon" v-if="mapType[menu.type]" :class="mapType[menu.type]"></span>
                {{menu.name}}</span>
              </div>
            <div class="commentType-wrapper" ref="typeNumber">
              <type-number :foodTypeNum="selectFood | foodTypeFilter(menu.name)" :foods="selectFood" @listenTypeNum="_showTypeNum(menu.name, mindex)"></type-number>
            </div>
              </li>
        </ul>
      </div>
      <div class="food-wrapper" ref="foodScroll">
        <div class="index-list-fixed" ref="fixed" v-if="fixedTitle">
          {{fixedTitle}}
        </div>
        <ul class="foods-type">
          <li v-for="(food_type,tindex) in goods" :key="tindex" class="type-item food-item-hook">
            <div class="food-type">{{food_type.name}}</div>
            <ul class="foods">
              <li v-for="(food,findex) in food_type.foods" :key="findex" class="food-item border-1px"  @click.stop.prevent="selectedFood(food,food_type.name)">
                <div class="food-left">
                  <img :src="food.icon" />
                </div>
                <div class="food-right">
                  <div class="title">{{food.name}}</div>
                  <div class="des" v-if="food.description">{{food.description}}</div>
                  <div class="sell">
                    <span class="count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.sellCount}}%</span>
                  </div>
                  <div class="price">
                    <span class="now"><i class="ni">&yen;</i>{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice > 0"><i class="oi">&yen;</i>{{food.oldPrice}}</span>
                  </div>
                </div>
                <cal-food class="calfood-wrapper" :food="food" @listenFoodCount="_calFood(food_type.name,arguments)" ></cal-food>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <food-detail ref="foodDetail" :selectedFood="foodDet" @listenFoodCount="_calFood(foodTypeName,arguments)"></food-detail>
      <div class="shoppcart-wrapper">
        <shopping-cart :deliveryPrice="seller.deliveryPrice"
                       :minPrice="seller.minPrice" :selectFood="selectFood"  @listenFoodCount="_calFood(arguments)"></shopping-cart>

      </div>
      </div>
</template>

<script>
import BScroll from 'better-scroll';
import foodDetail from '../foodDetail/foodDetail'
import typeNumber from '../typeNumber/typeNumber'
import CommentType from "../commentType/commentType";
const TITLE_HEIGHT = 25;
const MENU_ITEM_HEIGHT = 54;
export default {
  name: 'goods',
  components: {CommentType, foodDetail, typeNumber},
  data () {
    return {
      goods: [],
      mapType: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      menuScroll: {},
      foodScroll: {},
      heightList: [],
      scrollY: 0,
      selectFood: [],
      foodDet: {},
      foodTypeName: '',
      showTypenum: false,
      menuScrollY: 0,
      menuClickFlag: true
    };
  },
  created () {
    this.axios.get('static/data.json')
      .then(res => {
        this.goods = res.data.goods;
        this.$nextTick(() => {
          this._initScroll();
          this._calListHeight();
          this._foodScrollListener();
          this._menuScrollListener();
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  watch: {
    selectFood: {
      handler(newValue, oldValue) {
        let lis = this.$refs.typeNumber;
        for (let i = 0; i < lis.length; i++) {
          if (lis[i].innerHTML > 0) {
            console.log(lis[i].innerHTML);
            lis[i].setAttribute('style', 'display:block');
          } else {
            lis[i].setAttribute('style', 'display:none');
          }
        }
      },
      deep: true
    }
  },
  computed: {
    currentIndex () {
      if (this.menuClickFlag) {
        for (let i = 0; i < this.heightList.length; i++) {
          let height1 = this.heightList[i];
          let height2 = this.heightList[i + 1];
          if ((!height2) || (Math.abs(this.scrollY) >= height1 && height2 > Math.abs(this.scrollY))) {
            return i;
          }
        }
      }
    },
    fixedTitle() {
      if (this.scrollY > -TITLE_HEIGHT) {
        return ''
      }
      return this.goods[this.currentIndex] ? this.goods[this.currentIndex].name : ''
    }
  },
  methods: {
    menuClick(index, event) {
      // 原生事件返回
      if (!event._constructed) {
        return;
      }
      let lis = this.$refs.menuScroll.getElementsByTagName('li');
      for (let i = 0; i < lis.length; i++) {
        lis[i].classList.remove('active');
      }
      let foods = this.$refs.foodScroll.getElementsByClassName('food-item-hook');
      let el = foods[index];
      lis[index].classList.add('active');
      this.menuClickFlag = false;
      this.foodScroll.scrollToElement(el, 300);
    },
    _initScroll() {
      this.menuScroll = new BScroll('.menu-wrapper', {
        scrollY: true,
        click: true,
        probeType: 3
      });
      this.foodScroll = new BScroll('.food-wrapper', {
        scrollY: true,
        click: true,
        probeType: 3
      });
    },
    _calListHeight() {
      let foods = this.$refs.foodScroll.getElementsByClassName('food-item-hook');
      let height = 0;
      this.heightList.push(height);
      for (let i = 0; i < foods.length; i++) {
        height += foods[i].clientHeight;
        this.heightList.push(height);
      }
    },
    _foodScrollListener() {
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.round(pos.y);
        this._fixedUpMove();
        let curMenuY = 0;
        for (let i = 0; i < this.currentIndex; i++) {
          curMenuY += MENU_ITEM_HEIGHT;
        }
        // 菜单滚动的高度
        let y = this.menuScrollY;
        // 菜单容器的高度
        let contanierH = this.$refs.menuScroll.offsetHeight;
        // 需要往上滚动
        let upLen = curMenuY - (contanierH - MENU_ITEM_HEIGHT);
        // 需要往下滚动
        let downLen = curMenuY + y;
        let menus = this.$refs.menuScroll.getElementsByClassName('menu-item-hook');
        let el = menus[this.currentIndex];
        if (upLen > 0) {
          this.menuScroll.scrollToElement(el, 100);
        } else if (downLen < 0) {
          this.menuScroll.scrollToElement(el, 100);
        }
      });
      this.foodScroll.on('scrollEnd', (pos) => {
        this.menuClickFlag = true;
      });
    },
    _menuScrollListener() {
      this.menuScroll.on('scroll', (pos) => {
        this.menuScrollY = Math.round(pos.y);
      });
    },
    _fixedUpMove() {
      if (this.$refs.fixed) {
        let height2 = this.heightList[this.currentIndex + 1];
        if ((!height2) || (Math.abs(this.scrollY) >= (height2 - TITLE_HEIGHT) && height2 > Math.abs(this.scrollY))) {
          this.$refs.fixed.style.top = "-" + (TITLE_HEIGHT + (Math.abs(this.scrollY) - height2)) + "px";
        } else {
          this.$refs.fixed.style.top = "0px";
        }
      }
    },
    _calFood () {
      let food;
      let count;
      let type;
      if (arguments.length === 1) {
        type = arguments[0][0];
        food = arguments[0][1];
        count = arguments[0][2];
      } else {
        type = arguments[0];
        food = arguments[1][0];
        count = arguments[1][1];
      }
      let flag = true;
      food['count'] = count;
      food['typeName'] = type;
      this.selectFood.forEach((item, index) => {
        if (typeof item === 'object') {
          if (item['name'] === food['name']) {
            item['count'] = count;
            if (item.count > 0) {
              flag = false;
              return 0;
            } else {
              flag = false;
              this.selectFood.splice(index, 1);
              return 0;
            }
          }
        }
      })
      if (flag) {
         this.selectFood.push(food);
      }
    },
    selectedFood (food, type) {
      this.foodDet = food;
      this.foodTypeName = type;
      this.$refs.foodDetail.show();
    },
    _showTypeNum (type, mindex) {
      let lis = this.$refs.typeNumber;
      let count = 0;
      this.selectFood.forEach((item) => {
        if (item.typeName === type) {
          count += item['count'];
        }
      });
      if (count) {
        lis[mindex].setAttribute('style', 'display:block')
      } else {
        lis[mindex].setAttribute('style', 'display:none');
      }
    }
  },
  filters: {
    foodTypeFilter: function(foods, type) {
      let count = 0;
      foods.forEach((item) => {
        if (item.typeName === type) {
          count += item['count'];
        }
      });
      return count;
    }
  }
};
</script>

<style scoped lang="less">
  @import "../.././common/less/mixin";
  .goods{
    width: 100%;
    height: 100%;
    display: flex;
    /*padding-bottom: 20px;*/
    overflow: hidden;
    padding-bottom: 48px;
    position: relative;
    .menu-wrapper{
      width: 80px;
      flex: 0 0 80px;
      .memus{
        width: 100%;
        background-color: #f3f5f7;
        .menu-item{
          width: 100%;
          height: 54px;
          font-size: 0px;
          padding: 0px 12px;
          position: relative;
          &.active{
            font-size: 12px;
            font-weight: 700;
            line-height: 14px;
            background-color: #fff;
            .item_box{
              .border-none();
            }
          }
          .item_box{
            display: flex;
            height: 100%;
            justify-content: start;
            .border-1px(rgba(7,17,27,.1));
            .text{
              display: inline-block;
              font-size: 12px;
              /*color: rgba(240,20,20);*/
              line-height: 16px;
              align-self: center;
              .icon{
                display: inline-block;
                width: 12px;
                height: 12px;
                &.decrease{
                  .bg-url("../../components/goods/img/decrease_3");
                  background-size: 12px 12px;
                  background-repeat: no-repeat;
                }
                &.discount{
                  .bg-url("../../components/goods/img/discount_3");
                  background-size: 12px 12px;
                  background-repeat: no-repeat;
                }
                &.guarantee{
                  .bg-url("../../components/goods/img/guarantee_3");
                  background-size: 12px 12px;
                  background-repeat: no-repeat;
                }
                &.invoice{
                  .bg-url("../../components/goods/img/invoice_3");
                  background-size: 12px 12px;
                  background-repeat: no-repeat;
                }
                &.special{
                  .bg-url("../../components/goods/img/special_3");
                  background-size: 12px 12px;
                  background-repeat: no-repeat;
                }
              }
            }
          }
          &:last-child{
            .item_box{
              .border-none();
            }
          }
          .commentType-wrapper{
            display: none;
            position: absolute;
            right: 0px;
            top: 0px;
            height: 20px;
            min-width: 20px;
            line-height: 20px;
          }
        }
      }
    }
    .food-wrapper{
      position: relative;
      width: 100%;
      flex: 1;
      font-size: 0px;
      z-index: 0;
      .foods-type{
        width: 100%;
        .type-item{
          width: 100%;
          .food-type{
            width: 100%;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            color: rgb(147,153,159);
            background-color: #f3f5f7;
            padding-left: 14px;
            border-left: 2px solid #d9dde1;
          }
          .foods{
            position: relative;
            .food-item{
              display: flex;
              margin: 18px;
              padding-bottom: 18px;
              .border-1px(rgba(7,17,27,.1));
              &:last-child{
                .border-none();
                margin-bottom: 0px;
              }
              .food-left{
                width: 57px;
                height: 57px;
                margin-right: 10px;
                img{
                  width: 100%;
                  height: 100%;
                }
              }
              .food-right{
                flex: 1;
                .title{
                  font-size: 14px;
                  line-height: 14px;
                  color: rgb(77,85,93);
                  font-weight: 700;
                  margin-bottom: 8px;
                }
                .des{
                  font-size: 10px;
                  line-height: 14px;
                  color: rgb(147,153,159);
                  margin-bottom: 8px;
                }
                .sell{
                  font-size: 10px;
                  line-height: 10px;
                  color: rgb(147,153,159);
                  margin-bottom: 8px;
                  .count{
                    margin-right: 12px;
                  }
                }
                .price{
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
              }
            }
            .calfood-wrapper{
              position: absolute;
              right: 0px;
              bottom: 18px;
            }
          }
        }
      }
      .index-list-fixed{
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        color: rgb(147,153,159);
        background-color: #f3f5f7;
        padding-left: 14px;
        border-left: 2px solid #d9dde1;
      }
      .delete-list-fixed{
        position: absolute;
        z-index: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        color: rgb(147,153,159);
        background-color: #f3f5f7;
        padding-left: 14px;
        border-left: 2px solid #d9dde1;
      }
    }
    .shoppcart-wrapper{
      position: absolute;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 48px;
    }
  }
</style>
