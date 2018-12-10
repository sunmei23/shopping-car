<template>
  <div class="star" :class="starType">
    <span v-for="(staritem,index) in starClasss" :class="staritem" :key="index" class="staritem">
    </span>
  </div>
</template>

<script type="text/ecmascript-6">
const LEN = 5;
const ON = 'on';
const OFF = 'off';
const HALF = 'half';
export default {
  name: 'star',
  props: ['size', 'score'],
  computed: {
    starType () {
      return 'star-' + this.size;
    },
    starClasss () {
      let starArr = [];
      let iscore = Math.floor(this.score * 2) / 2;
      let hasDecimal = ((iscore % 1) !== 0);
      let interLen = parseInt(iscore);
      for (let i = 0; i < interLen; i++) {
        starArr.push(ON);
      }
      if (hasDecimal) {
        starArr.push(HALF);
      }
      while (starArr.length < LEN) {
        starArr.push(OFF);
      }
      return starArr;
    }
  }
};
</script>

<style scoped lang="less">
  @import "../.././common/less/mixin";
  .star{
    &.star-48{
      .staritem{
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 22px;
        &:last-child{
          margin-right: 0px;
        }
        &.on{
          .bg-url('../../components/star/img/star48_on');
          background-size: 20px 20px;
          background-repeat: no-repeat;
        }
        &.half{
          .bg-url('../../components/star/img/star48_half');
          background-size: 20px 20px;
          background-repeat: no-repeat;
        }
        &.off{
          .bg-url('../../components/star/img/star48_off');
          background-size: 20px 20px;
          background-repeat: no-repeat;
        }
      }
    }
    &.star-36{
      .staritem{
        display: inline-block;
        width: 15px;
        height: 15px;
        margin-right: 8px;
        &:last-child{
          margin-right: 0px;
        }
        &.on{
          .bg-url('../../components/star/img/star36_on');
          background-repeat: no-repeat;
          background-size: 15px 15px;
        }
        &.half{
          .bg-url('../../components/star/img/star36_half');
          background-repeat: no-repeat;
          background-size: 15px 15px;
        }
        &.off{
          .bg-url('../../components/star/img/star36_off');
          background-repeat: no-repeat;
          background-size: 15px 15px;
        }
      }
    }
    &.star-24{
      .staritem{
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 3px;
        &:last-child{
          margin-right: 0px;
        }
        &.on{
          .bg-url('../../components/star/img/star24_on');
          background-size: 10px 10px;
          background-repeat: no-repeat;
        }
        &.half{
          .bg-url('../../components/star/img/star24_half');
          background-size: 10px 10px;
          background-repeat: no-repeat;
        }
        &.off{
          .bg-url('../../components/star/img/star24_off');
          background-size: 10px 10px;
          background-repeat: no-repeat;
        }
      }
    }
  }

</style>
