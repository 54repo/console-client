/** 图片验证码 **/
<template>
  <div class="BasicInput">
    <div class="icon-wrap" v-if="iconType">
      <div v-bind:class="iconType" class="icon"></div>
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
      v-bind:class="imageStyle"
      class="imageCodeSrc bonus-cursor"
      v-on:click="refreshImageCode"
      :style="{ backgroundSize: 'cover', background: 'url(' + imageCodeSrc + ')', }">
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { baseUrl } from '../utils/env';
const imageSrc = (process.env.NODE_ENV === 'development') ? 'http://203.76.212.73:7001/api/web/captcha/get/' : '/api/web/captcha/get/';


export default {
  name: "ImageCode",
  props: {
    iconType: "", // icon图地址
    defaultValue: "",
    placeValue: "", // input placehoder
    type: "", // input类型,
    value: "",
    imageStyle: '' //绑定页面特定样式
  },
  model: {
    prop: "value",
    event: "change"
  },
  data() {
    return {
      inputValue: this.value,
      imageCodeSrc: imageSrc //图片验证码地址
    };
  },
  methods: {
    ...mapActions(["getImageCode"]),
    refreshImageCode() {
      this.imageCodeSrc = imageSrc + "?" + new Date().getTime();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.BasicInput {
  height: 30px;
  display: flex;
  position: relative;
}

.icon-wrap {
  box-sizing: border-box;
  height: 30px;
  width: 30px;
  background: #F1F2F2;
  border: 1px solid #D2D5D6;
  border-right: 0px;
  background-size: 30px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  width: 10px;
  height: 10px;
  background-size: contain;
}

input.basic-input {
  height: 30px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #000;
  display: inline-block;
  font-size: inherit;
  height: 30px;
  line-height: 30px;
  outline: none;
  padding: 0 10px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 100%;
  font-size: 10px;
}

.imageCode {
  background-image: url('../assets/account/imageCode.png');
}

.imageCodeSrc {
  background-size: cover !important;
  width: 60px;
  height: 15px;
  position: absolute;
  right: 3px;
  top: 7.5px;
}
.unbind-style
  height: 27px;
  width: 120px
</style>

