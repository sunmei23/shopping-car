<template>
    <div class="foodComment">
      <ul class="comment-wrappper">
        <li v-for="(comment,index) in foodRatings" :key="index" class="comment-item">
          <div class="userinfo">
            <div class="time">{{comment.rateTime | timeFilter}}</div>
            <div class="name">
              <span class="username">{{comment.username}}</span>
              <div class="avatar"><img :src="comment.avatar" /></div>
            </div>
          </div>
          <div class="commentinfo">
            <div class="icon">
              <span class="icon-thumb_down" v-show="comment.rateType"></span>
              <span class="icon-thumb_up" v-show="!comment.rateType"></span>
            </div>
            <div class="content">{{comment.text}}</div>
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
    name: "foodComment",
  props: {
    foodRatings: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped lang="less">
  @import "../.././common/less/mixin";
  .foodComment{
    width: 100%;
    padding: 0px 18px;
    font-size: 14px;
    .comment-wrappper{
      width: 100%;
      .comment-item{
        padding: 16px 0px;
        border-bottom: 1px solid rgba(7,17,27,0.1);
        &:last-child{
          border-bottom: none;
        }
        .userinfo{
          width: 100%;
          font-size: 12px;
          line-height: 12px;
          height: 12px;
          margin-bottom: 6px;
          color: rgb(147,153,159);
          .time{
            float: left;
          }
          .name{
            float: right;
            display: flex;
            .username{
              align-self: center;
            }
            .avatar{
              width: 24px;
              height: 24px;
              display: inline-block;
              margin-left: 6px;
              img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }
        }
        .commentinfo{
          width: 100%;
          .icon{
            display: inline-block;
            font-size:12px;
            line-height: 24px;
            .icon-thumb_down{
              color: rgb(147,153,159);
            }
            .icon-thumb_up{
              color: rgb(0,160,220);
            }
          }
          .content{
            display: inline-block;
            font-size: 12px;
            line-height: 16px;
            color: rgb(7,17,27);
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
