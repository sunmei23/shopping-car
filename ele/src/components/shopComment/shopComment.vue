<template>
    <div class="shopComment">
      <ul class="comments-wrapper">
        <li class="comment-item border-1px" v-for="(comment,index) in shopRatings" :key="index">
          <div class="left">
            <img :src="comment.avatar" class="avatar"/>
          </div>
          <div class="right">
            <div class="userName">{{comment.username}}</div>
            <div class="score">
              <span class="star-wrapper">
                <star size="24" :score="comment.score"></star>
              </span>
              <span class="delivery-time" v-show="comment.deliveryTime">{{comment.deliveryTime}}分钟送达</span>
            </div>
            <div class="comment-text">{{comment.text}}</div>
            <div class="recommend">
              <div class="icon">
                <span class="icon-thumb_down" v-show="comment.rateType"></span>
                <span class="icon-thumb_up" v-show="!comment.rateType"></span>
              </div>
              <div class="content">
                <span v-for="recommend in comment.recommend" class="content-item">{{recommend}}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="hint">
        <span class="left border-1px"></span>
        <span class="text">没有更多评论了~</span>
        <span class="right border-1px"></span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "shopComment",
      props: {
        shopRatings: {
          type: Array,
          default: []
        }
      }
    }
</script>

<style scoped lang="less">
  @import "../.././common/less/mixin";
.shopComment{
  width: 100%;
  .comments-wrapper{
    width: 100%;
    padding: 0px 18px;
    .comment-item{
      padding: 18px 0px;
      .border-1px(rgba(7,17,27,0.1));
      &:last-child{
        .border-none();
      }
      display: flex;
      .left{
        width: 28px;
        height: 100%;
        margin-right: 12px;
        .avatar{
          width: 100%;
          height: 28px;
          border-radius: 50%;
        }
      }
      .right{
        flex: 1;
        .userName{
          font-size: 10px;
          line-height: 12px;
          color: rgb(7,17,27);
          margin-bottom: 4px;
        }
        .score{
          font-size: 0px;
          margin-bottom: 6px;
          .star-wrapper{
            display: inline-block;
            margin-right: 6px;
          }
          .delivery-time{
            font-size: 10px;
            line-height: 12px;
            color: rgb(147,153,159);
            font-weight: 200;
          }
        }
        .comment-text{
          font-size: 12px;
          line-height: 18px;
          color: rgb(7,17,27);
          margin-bottom: 8px;
        }
        .recommend{
          display: flex;
          .icon{
            align-self: center;
            margin-right: 8px;
            font-size:12px;
            line-height: 16px;
            .icon-thumb_down{
              color: rgb(147,153,159);
            }
            .icon-thumb_up{
              color: rgb(0,160,220);
            }
          }
          .content{
            flex: 1;
            .content-item{
              display: inline-block;
              font-size: 9px;
              line-height: 16px;
              color: rgb(147,153,159);
              padding: 0px 6px;
              border: 1px solid rgba(7,17,27,.1);
              border-radius: 2px;
              background-color: #fff;
              margin-right: 8px;
              margin-bottom: 2px;
            }
          }
        }

      }
    }

  }
  .hint{
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom:24px;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0px 18px;
    span{
      flex: 1;
      &.left{
        flex-basis: 100px;
        flex-grow: 1;
        align-self: center;
        height: 0px;
        display: inline-block;
        .border-1px(rgba(7,17,27,.1));
        margin-right: 12px;
      }
      &.text{
        font-size: 14px;
        line-height: 14px;
        flex-grow: 0;
      }
      &.right{
        flex-basis: 100px;
        flex-grow: 1;
        align-self: center;
        display: inline-block;
        .border-1px(rgba(7,17,27,.1));
        margin-left: 12px;
        height: 0px;
      }
    }
  }
}
</style>
