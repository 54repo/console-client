/** 登陆框组件 **/
<template>
  <div class="BasicInput">
    <div class="icon-wrap">
      <div  v-bind:class="iconType" class="icon"></div>
    </div>
    <input
      class="basic-input"
      v-bind:placeholder="placeValue"
      v-bind:type="type"
      v-bind:value="value"
      v-on:change="$emit('change', $event.target.value)"
      />
      <div
        v-if="imageCodeSrc" 
        class="imageCodeSrc"
        :style="{ background: 'url(' + imageCodeSrc + ')', backgroundSize: 'contain'}"></div>
  </div>
</template>

<script>
export default {
  name: 'BasicInput',
  props: {
    iconType: '', // icon图地址
    defaultValue: '',
    placeValue: '', // input placehoder
    type: '', // input类型,
    value: '',
    imageCodeSrc: '', //图片验证码地址
    needKeyEnter: '' //监听回车事件
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  data() {
    return {
      inputValue: this.value,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.BasicInput
  height: 30px
  display: flex
  position: relative
.icon-wrap
  box-sizing: border-box;
  height: 30px
  width: 30px
  background: #F1F2F2;
  border: 1px solid #D2D5D6;
  border-right: 0px;
  background-size: 30px 30px
  display: flex;
  justify-content: center;
  align-items: center;
.icon
  width: 10px
  height: 10px
  background-size: contain;
input.basic-input
    height: 30px;
    -webkit-appearance: none
    background-color: #fff
    background-image: none
    border: 1px solid #dcdfe6
    box-sizing: border-box;
    color: #000
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: none;
    padding: 0 10px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    font-size: 10px;
.email
  background-image: url('../assets/account/email.png')
.password
  background-image: url('../assets/account/password.png')
.imageCode
  background-image: url('../assets/account/imageCode.png')
.emailCode
  background-image: url('../assets/account/emailCode.png')
.imageCodeSrc
	width: 50px;
	height: 24px;
	position: absolute;
	right: 3px;
	top: 3px;
	background-size: contain;
</style>

