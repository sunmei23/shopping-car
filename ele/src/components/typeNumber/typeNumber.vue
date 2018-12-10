<template>
    <div class="typeNumber">{{foodTypeNum}}</div>
</template>

<script>
    export default {
        name: "typeNumber",
      props: {
        foodTypeNum: {
          type: Number,
          default: 0
        },
        foods: {
          type: Array,
          default: []
        }
      },
      watch: {
        foods: {
          handler(newValue, oldValue) {
            this.$emit('listenTypeNum');
          },
          deep: true
        }
      }
    }
</script>

<style scoped>
.typeNumber{
  width: 100%;
  height: 100%;
  background-color: rgb(240,20,20);
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 16px;
  font-size: 10px;
  padding: 2px;
}
</style>
