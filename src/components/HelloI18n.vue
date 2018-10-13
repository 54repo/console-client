<template>
  <p @click="test">{{ $t('login.loginKey') }}</p>
</template>

<script>
export default {
  name: "HelloI18n",
  methods: {
    test() {
      console.log(123);
      console.log(this.$i18n.locale)
      this.$i18n.locale = 'zn'
    }
  }
};
</script>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  },
  "zn": {
    "hello": "中文"
  }
}
</i18n>
