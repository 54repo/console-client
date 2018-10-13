<template>
  <div class="account-layout">
      <div class="left-bg">
        <img class="left-bg-img" alt="header-logo" src="../assets/background.png" />
      </div>
      <div class="right-dialog">
        <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
  name: 'AccountLayout',
  props: {
    // msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.account-layout
  height: 100%
  width: 100%
  display: flex
  justify-content: space-between;
.left-bg
  width: 52%
  height: 100%;
  position: relative;
.left-bg-img
  margin-top: 54px
  position: absolute
  right: 0
.right-dialog
  width: 48%
  position: relative;


@media screen and (max-width: 1200px)
  .left-bg-img
    width: 470px;
    margin-top: 80px;
    position: absolute;
    right: 0;

@media screen and (min-width: 1200px) and (max-width: 1600px)
  .left-bg-img
    width: 500px;
    margin-top: 80px;
    position: absolute;
    right: 80px;

@media screen and (min-width: 1601px) and (max-width: 2048px)
  .left-bg-img
    width: 620px;
    position: absolute;
    right: 0;


</style>
