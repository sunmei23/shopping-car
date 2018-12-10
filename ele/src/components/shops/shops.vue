<template>
  <div class="shops">
    <div class="shops-content">
      <div class="basic-info">
        <div class="up-wrapper border-1px">
          <div class="left">
            <div class="shop-name">{{seller.name}}</div>
            <div class="star-wrapper">
              <star size="36" :score="seller.score"></star>
            </div>
            <span class="ratingCount">({{seller.ratingCount}})</span>
            <span class="sellCount">月售{{seller.sellCount}}单</span>
          </div>
          <div class="right" @click.stop.prevent="isAddFavorite">
            <span class="icon-favorite" :class="{'favorite' :isFavorite}"></span>
            <div class="text" v-if="isFavorite">已收藏</div>
            <div class="text" v-else>添加收藏</div>
          </div>
        </div>
        <div class="down-wrapper">
          <div class="minPrice">
            <div class="des">起送价</div>
            <div class="data"><i class="value">{{seller.minPrice}}</i>元</div>
          </div>
          <div class="deliveryPrice">
            <div class="des">商家配送</div>
            <div class="data"><i class="value">{{seller.deliveryPrice}}</i>元</div>
          </div>
          <div class="deliveryTime">
            <div class="des">平均配送时间</div>
            <div class="data"><i class="value">{{seller.deliveryTime}}</i>分钟</div>
          </div>
        </div>
      </div>
      <separator-line></separator-line>
      <div class="bulletin-support">
        <div class="bulletin">
          <div class="title">公共与活动</div>
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <div class="support">
          <ul class="support-wrapper">
            <li v-for='(item , index) in seller.supports' :key="index" class="support-item">
              <span :class="mapType[item.type]" class="icon"></span>
              <span class="des">{{item.description}}</span>
            </li>
          </ul>
        </div>
      </div>
      <separator-line></separator-line>
      <div class="shop-view">
        <div class="title">商家实景</div>
        <div class="images">
          <ul class="images-wrapper" ref="imagesWrapper">
            <li class="image-item" v-for="(image) in seller.pics" @click="_showBigImage(image)">
              <img :src="image" class="img"/>
            </li>
          </ul>
        </div>
      </div>
      <separator-line></separator-line>
      <div class="shop-info">
        <div class="title">商家信息</div>
        <div class="infos">
          <ul class="info-wrapper">
            <li class="info-item" v-for="info in seller.infos">
              {{info}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bigImage" v-if="showBigImage" @click.stop.prevent="_hiddenBigImage">
      <img :src="bigImgSrc"/>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import SeparatorLine from "../separatorLine/separatorLine";
  export default {
    name: "shops",
    components: {SeparatorLine},
    data() {
      return {
        mapType: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        isFavorite: false,
        shopScroll: {},
        imageScroll: null,
        showBigImage: false,
        bigImgSrc: ''
      }
    },
    created() {
      this.$nextTick(() => {
        this.shopScroll = new BScroll('.shops', {
          scrollY: true,
          click: true
        });
        this._initImgScroll();
        this._addImagesWidth(this.seller.pics.length);
      })
    },
    props: {
      seller: {
        type: Object,
        default: {}
      }
    },
    watch: {
      seller: {
        handler(newValue, oldValue) {
          this._initImgScroll();
          this._addImagesWidth(newValue.pics.length);
        },
        deep: true
      }
    },
    methods: {
      isAddFavorite(event) {
        if (!event._constructed) {
          return;
        };
        this.isFavorite = !this.isFavorite;
      },
      _addImagesWidth(len) {
        let $ul = this.$refs.imagesWrapper;
        let width = 0;
        for (let i = 0; i < len; i++) {
          width += 120;
          // 加上margin-right长度
          if (i !== len) {
            width += 6;
          }
        }
        $ul.setAttribute('style', `width: ${width}px`);
        this.imageScroll.refresh();
      },
      _initImgScroll() {
        if (this.imageScroll) {
          return;
        }
        this.imageScroll = new BScroll('.images', {
          scrollX: true,
          click: true
        });
      },
      _showBigImage(img) {
        this.showBigImage = true;
        this.bigImgSrc = img;
      },
      _hiddenBigImage() {
        this.showBigImage = false;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../.././common/less/mixin";
  .shops{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .shops-content{
      width: 100%;
      .basic-info{
        padding: 18px;
        .up-wrapper{
          width: 100%;
          overflow: hidden;
          .border-1px(rgba(7,17,227,.1));
          padding-bottom: 18px;
          .left{
            float: left;
            font-size: 0px;
            .shop-name{
              font-size: 14px;
              line-height: 24px;
              color: rgb(7,17,27);
              margin-bottom: 8px;
            }
            .star-wrapper{
              height: 18px;
              display: inline-block;
              margin-right: 8px;
            }
            .ratingCount,.sellCount{
              display: inline-block;
              font-size: 10px;
              line-height: 18px;
              color: rgb(77,85,93);
              vertical-align: top;
              &.ratingCount{
                margin-right: 12px;
              }
            }
          }
          .right{
            font-size: 0px;
            float: right;
            text-align: center;
            .icon-favorite{
              display: inline-block;
              font-size: 24px;
              line-height: 24px;
              color: rgba(7,17,27,.4);
              margin-bottom: 4px;
              &.favorite{
                color: rgb(240,20,20);
              }
            }
            .text{
              font-size: 10px;
              line-height: 10px;
              color: rgb(77,85,93);
            }
          }
        }
        .down-wrapper{
          display: flex;
          padding-top: 18px;
          .minPrice,.deliveryPrice,.deliveryTime{
            flex: 1;
            border-right: 1px solid rgba(7,17,27,0.1);
            text-align: center;
            align-self: center;
            &.deliveryTime{
              border-right: none;
            }
            .des{
              font-size: 10px;
              line-height: 10px;
              color: rgb(147,153,159);
              margin-bottom: 4px;
            }
            .data{
              color: rgb(7,17,27);
              font-weight: 200;
              line-height: 24px;
              font-size: 10px;
              .value{
                font-size: 24px;
              }
            }
          }
        }
      }
      .bulletin-support{
        padding: 18px 18px 0px;
        .bulletin{
          .title{
            font-size: 14px;
            line-height: 24px;
            color: rgb(7,17,27);
            margin-bottom: 8px;
          }
          .content{
            padding: 0px 12px;
            font-size: 12px;
            font-weight: 200;
            line-height: 24px;
            color: rgb(240,20,20);
            margin-bottom: 16px;
          }
        }
        .support{
          .support-wrapper{
            .support-item{
              padding: 16px 12px;
              font-size: 0px;
              border-top: 1px solid rgba(7,17,27,.1);
              .icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                margin-right: 6px;
                &.decrease{
                  .bg-url("../../components/shops/img/decrease_4");
                  background-size: 16px 16px;
                  background-repeat: no-repeat;
                }
                &.discount{
                  .bg-url("../../components/shops/img/discount_4");
                  background-size: 16px 16px;
                  background-repeat: no-repeat;
                }
                &.guarantee{
                  .bg-url("../../components/shops/img/guarantee_4");
                  background-size: 16px 16px;
                  background-repeat: no-repeat;
                }
                &.invoice{
                  .bg-url("../../components/shops/img/invoice_4");
                  background-size: 16px 16px;
                  background-repeat: no-repeat;
                }
                &.special{
                  .bg-url("../../components/shops/img/special_4");
                  background-size: 16px 16px;
                  background-repeat: no-repeat;
                }
              }
              .des{
                vertical-align: top;
                font-size: 12px;
                line-height: 16px;
                color: rgb(7,17,27);
                font-weight: 200;
              }
            }
          }
        }
      }
      .shop-view{
        padding: 18px 0px 18px 18px;
        .title{
          font-size: 14px;
          line-height: 24px;
          color: rgb(7,17,27);
          margin-bottom: 12px;
        }
        .images{
          width: 100%;
          height: 90px;
          overflow: hidden;
          .images-wrapper{
            height: 100%;
            white-space: nowrap;
            min-width: 100%;
            .image-item{
              float: left;
              width: 120px;
              height: 100%;
              margin-right: 6px;
              &:last-child{
                margin-right: 0px;
              }
              .img{
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
      .shop-info{
        padding: 18px 18px 0px;
        .title{
          font-size: 14px;
          line-height: 24px;
          color: rgb(7,17,27);
          margin-bottom: 12px;
        }
        .infos{
          .info-wrapper{
            .info-item{
              padding: 16px 12px;
              border-top: 1px solid rgba(7,17,27,.1);
              font-size: 12px;
              line-height: 16px;
              color: rgb(7,17,27);
              font-weight: 200;
            }
          }
        }
      }
    }
    .bigImage{
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0px;
      top: 0px;
      backdrop-filter: blur(10px);
      background: rgba(7,17,27,0.8);
      display: flex;
      img{
        align-self: center;
        width: 100%;
        align-self: center;
      }
    }
  }
</style>
