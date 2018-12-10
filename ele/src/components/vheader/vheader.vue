<template>
    <div class="header" ref="header">
      <div class="main-content">
        <div class="shop-icon">
          <img :src="seller.avatar" width="64" height="64"/>
        </div>
        <div class="shop-text">
          <div class="title">
            <span></span>
            <h1>{{seller.name}}</h1>
          </div>
          <div class="transport">
            <span>{{seller.description}}</span>/<span>{{seller.deliveryTime}}</span>分钟送达
          </div>
          <div class="sales_promotion" v-if="seller.supports">
            <div :class="mapType[seller.supports[0].type]">
              <span></span>
            </div>
            <div class="text">{{seller.supports[0].description}}</div>
            <div class="promotion-counts" v-if="seller.supports" @click="displayDetail">
              <span>{{seller.supports.length}}</span>个<span class="icon-keyboard_arrow_right" ></span>
            </div>
          </div>
        </div>
        <div class="bulletin" @click="displayDetail">
            <div class="icon"><span class="bg-url"></span></div>
            <span class="icon-keyboard_arrow_right"></span>
            <div class="text">{{seller.bulletin}}</div>
          </div>
        <div class="bg">
          <img :src="seller.avatar"/>
        </div>
      </div>
      <transition  name="fade">
        <div class="shop-detail" v-show="showDetail">
            <div class="detail-wrapper clearfix">
              <div class="detail-content">
                <div class="title">{{seller.name}}</div>
                <star :size="star_size" :score="seller.score"></star>
                <div class="info">
                  <div class="tit">
                    <span class="left"></span>
                    <span class="text">优惠信息</span>
                    <span class="right"></span>
                  </div>
                  <ul v-if="seller.supports" class="support">
                    <li v-for='(item , index) in seller.supports' :key="index">
                      <span :class="mapType[item.type]"></span>
                      <span>{{item.description}}</span>
                    </li>
                  </ul>
                  <div class="tit">
                    <span class="left"></span>
                    <span class="text">公告信息</span>
                    <span class="right"></span>
                  </div>
                  <div class="bulltin">{{seller.bulletin}}
                  </div>
                </div>
              </div>
            </div>
            <div class="close">
              <span class="icon-close" @click="handleClose"></span>
            </div>
        </div>
      </transition>
    </div>
</template>
<script>
export default {
  name: 'vheader',
  data () {
    return {
      // seller: {},
      showDetail: false,
      mapType: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      star_size: 48
    };
  },
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  methods: {
    handleClose () {
      this.showDetail = false;
      // 过渡执行完毕
      setTimeout(() => {
        this.$refs.header.style.zIndex = '-1';
      }, 500);
    },
    displayDetail () {
      this.showDetail = true;
      this.$refs.header.style.zIndex = '1';
    }
  }
};
</script>

<style scoped lang="less">
  @import "../.././common/less/mixin";
  //@IMGPATH : "../../components/header/img/";
  @IMGPATH : "./img/";
  .header{
    width: 100%;
    height: 134px;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: -1;
    .main-content{
      position: relative;
      color: #fff;
      padding: 24px 0px 0px 0px;
      overflow: hidden;
      background-color: rgba(7,17,27,.5);
      .shop-icon{
        display: inline-block;
        width: 64px;
        height: 64px;
        border-radius: 4px;
        margin: 0px 16px 18px 24px;
      }
      .shop-text{
        display: inline-block;
        vertical-align: top;
        .title{
          margin: 2px 6px 8px 0px;
          span{
            display: inline-block;
            width: 30px;
            height: 18px;
            .bg-url("../../components/vheader/img/brand");
            background-size:30px 18px;
            background-repeat:no-repeat;
          }
          h1{
            display: inline-block;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
            vertical-align: top;
          }
        }
        .transport{
          //margin-bottom: 10px;
          font-size: 12px;
          font-weight: 200;
          line-height: 12px;
        }
        .sales_promotion{
          vertical-align: top;
          font-size: 10px;
          line-height: 12px;
          margin-top: 10px;
          font-weight: 200;
          div:first-child{
            display: inline-block;
            width: 12px;
            height: 12px;
            &.decrease{
              .bg-url("../../components/vheader/img/decrease_1");
              background-size: 12px 12px;
              background-repeat: no-repeat;
            }
            &.discount{
              .bg-url("../../components/vheader/img/discount_1");
              background-size: 12px 12px;
              background-repeat: no-repeat;
            }
            &.guarantee{
              .bg-url("../../components/vheader/img/guarantee_1");
              background-size: 12px 12px;
              background-repeat: no-repeat;
            }
            &.invoice{
              .bg-url("../../components/vheader/img/invoice_1");
              background-size: 12px 12px;
              background-repeat: no-repeat;
            }
            &.special{
              .bg-url("../../components/vheader/img/special_1");
              background-size: 12px 12px;
              background-repeat: no-repeat;
            }
          }
          .text{
            vertical-align: top;
            display: inline-block;
          }
          .promotion-counts{
            position: absolute;
            right: 12px;
            bottom: 46px;
            line-height: 12px;
            font-size: 10px;
            text-align: center;
            font-weight: 200;
            padding: 4px 8px;
            border-radius: 7px 8px;
            background-color: rgba(0,0,0,.2);
            .icon-keyboard_arrow_right{
              padding-left: 2px;
            }
          }
        }
      }
      .bulletin{
        padding: 0px 12px;
        width: 100%;
        height: 28px;
        font-size: 10px;
        line-height: 28px;
        overflow: hidden;
        background-color: rgba(7,17,27,.2);
        .text{
          height: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow:ellipsis;
        }
        .icon-keyboard_arrow_right{
          display: inline-block;
          height: 28px;
          line-height: 28px;
          float: right;
          margin-left: 8px;
        }
        .icon{
          display: inline-block;
          float: left;
          width: 22px;
          margin-right: 8px;
          span:first-child{
            display: inline-block;
            width: 22px;
            height: 12px;
            vertical-align: middle;
            .bg-url("../../components/vheader/img/bulletin");
            background-repeat: no-repeat;
            background-size: 22px 12px;
          }
        }
      }
      .bg{
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
    .shop-detail{
      position: fixed;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      overflow: auto;
      color: #fff;
      backdrop-filter: blur(10px);
      background: rgba(7,17,27,0.8);
      &.fade-enter-active, &.fade-leave-active {
        transition: opacity .5s;
      }
      &.fade-enter, &.fade-leave-to{
        opacity: 0;
      }
      &.fade-enter-to, &.fade-leave{
        opacity: 1;
      }
      .detail-wrapper{
        min-height: 100%;
        .detail-content{
          margin-top: 64px;
          padding-bottom: 64px;
          position: relative;
          .title{
            text-align: center;
            font-size: 16px;
            fonnt-weight:700;
            line-height: 16px;
          }
          .star{
            text-align: center;
            margin: 16px 0px 28px 0px;
          }
          .info{
            margin: 28px 36px;
            .tit{
              display: flex;
              overflow: hidden;
              white-space: nowrap;
              margin-bottom:24px;
              flex-direction: row;
              flex-wrap: nowrap;
              span{
                flex: 1;
                &.left{
                  flex-basis: 100px;
                  flex-grow: 1;
                  align-self: center;
                  height: 0px;
                  display: inline-block;
                  border: 0.5px solid rgba(255,255,255,.2);
                  margin-right: 12px;
                }
                &.text{
                  font-size: 14px;
                  font-weight: 700;
                  line-height: 14px;
                  flex-grow: 0;
                }
                &.right{
                  flex-basis: 100px;
                  flex-grow: 1;
                  align-self: center;
                  display: inline-block;
                  border: 0.5px solid rgba(255,255,255,.2);
                  margin-left: 12px;
                  height: 0px;
                }
              }
            }
            .support{
              text-align: left;
              margin-bottom: 28px;
              li{
                margin-bottom: 6px;
                span:first-child{
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  vertical-align: middle;
                  &.decrease{
                    .bg-url("../../components/vheader/img/decrease_2");
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                  }
                  &.discount{
                    .bg-url("../../components/vheader/img/discount_2");
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                  }
                  &.guarantee{
                    .bg-url("../../components/vheader/img/guarantee_2");
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                  }
                  &.invoice{
                    .bg-url("../../components/vheader/img/invoice_2");
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                  }
                  &.special{
                    .bg-url("../../components/vheader/img/special_2");
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                  }
                }
                span:last-child{
                  margin-left: 6px;
                  font-size: 12px;
                  line-height: 12px;
                  vertical-align: middle;
                }
                &:last-child{
                  margin-bottom: 0px;
                }
              }
            }
            .bulltin{
              font-size: 12px;
              line-height: 24px;
            }
          }
        }
      }
      .close{
        position: relative;
        height: 32px;
        font-size: 32px;
        line-height: 32px;
        text-align: center;
        margin-top:-64px;
        color: rgba(255,255,255,.5);
        clear: both;
      }
    }
  }
</style>
