<template>
    <div class="userComment">
      <slot name="food"></slot>
      <slot name="shop"></slot>
    </div>
</template>

<script>
export default {
    name: "userComment"
}
</script>

<style scoped lang="less">
  .userComment{
    width: 100%;
  }
</style>
