<template>
    <div class="comments">
      <div class="commets-content">
        <div class="scores-wrapper">
          <div class="left">
            <div class="composite-score">{{seller.score}}</div>
            <div class="des">综合评分</div>
            <div class="compare">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="right">
            <div class="taste">
              <span class="name">食物味道</span>
              <div class="star-wrapper">
                <star :score="seller.foodScore" size="36"></star>
              </div>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="package">
              <span class="name">服务态度</span>
              <div class="star-wrapper">
                <star :score="seller.serviceScore" size="36"></star>
              </div>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="delivery">
              <span class="name">送达时间</span>
              <span class="time">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <separator-line></separator-line>
        <comment-type :foodRatings="comments || []" :commentType="commentType"
                      :onlyContent="onlyContent" :selectType="selectType" @changeSelectType="_changeSelectType"
                      @changeOnlyContent="_changeOnlyContent"
                      :commentFor="commentFor"></comment-type>
      </div>
    </div>
</template>

<script>
import SeparatorLine from "../separatorLine/separatorLine";
import CommentType from "../commentType/commentType";
import BScroll from 'better-scroll';
export default {
  name: 'comments',
  components: {CommentType, SeparatorLine},
  data() {
    return {
      comments: [],
      commentType: ["满意", "不满意", "全部"],
      onlyContent: false,
      selectType: 2,
      commentFor: 'shop',
      commentScroll: {}
    }
  },
  created() {
    this.$nextTick(() => {
      this.commentScroll = new BScroll('.comments', {
        scrollY: true,
        click: true
      })
    });
    this.axios.get('static/data.json')
      .then((res) => {
        this.comments = res.data.ratings;
      })
      .catch((err) => {
        console.log(err);
      })
  },
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  methods: {
    _changeOnlyContent() {
      this.onlyContent = !this.onlyContent;
    },
    _changeSelectType(type) {
      this.selectType = type;
    }
  }
};
</script>

<style scoped lang="less">
.comments{
  width:100%;
  height: 100%;
  overflow: hidden;
  .commets-content{
    width: 100%;
    .scores-wrapper{
      display: flex;
      padding: 18px 0px;
      .left{
        text-align: center;
        flex: 1;
        .composite-score{
          font-size: 24px;
          line-height: 28px;
          color: rgb(255,153,0);
          margin-bottom: 6px;
        }
        .des{
          font-size: 12px;
          line-height: 12px;
          color: rgb(7,17,27);
          margin-bottom: 8px;
        }
        .compare{
          font-size: 10px;
          line-height: 10px;
          color: rgba(7,17,27,.6);
          margin-bottom: 6px;
        }
      }
      .right{
        width: 247px;
        padding: 0px 24px;
        border-left: 1px solid rgba(7,17,27,.1);
        font-size: 0px;
        .taste,.package,.delivery{
          display: flex;
          &.taste,&.package{
            margin-bottom: 8px;
            .star-wrapper{
              display: inline-block;
              margin-right: 12px;
              align-self: center;
            }
            .score{
              font-size: 12px;
              line-height: 18px;
              color: rgb(255,153,0);
            }
          }
          &.delivery{
            .time{
              font-size: 12px;
              line-height: 18px;
              color: rgb(147,153,159);
            }
          }
          .name{
            display: inline-block;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7,17,17);
            margin-right: 12px;
          }
        }
      }
    }
  }
}
</style>
