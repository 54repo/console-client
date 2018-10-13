  <template>
	<div class="FAQ">
		<BasiceLayout :title="$t('faq_text')" class="bonus-code-layout" :more="$t('faq_link')"> 
      <div class="qa-item" v-for="item in FAQ">
        <div class="question">
          <span class="faq-icon">Q</span>
          <div class="faq-tip-background">
            <div class="tipIcon"></div>
            <div class="tipContent">{{item.question}}</div>
          </div>
        </div>
        <div class="anwser">
          <span class="faq-icon anwser-icon">A</span>
          <div class="faq-tip-background">
            <!-- <div class="tipIcon anwserIcon"></div> -->
            <div class="tipContent anwserContent">{{item.anwser}}</div>
          </div>
        </div>
      </div>
    </BasiceLayout>
  </div>
  <!-- </div> -->
</template>

<script>
import BasiceLayout from "@/components/Common/BasicLayout.vue";

export default {
  name: "FAQ",
  components: {
    BasiceLayout
  },
  props: {
    FAQ: ""
  },
  data() {
    return {
      //	输入错误信息时提示
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scopes lang="stylus">
.faq-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  // background-image: linear-gradient(-180deg, #15BCAD 2%, #10B2CB 100%)
  background: #0DB4C5;
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #FFFFFF;
  text-align: center;
  line-height: 20px;
  margin: 10px 20px 0 0;
  vertical-align: bottom;
  position: absolute;
  left: 0;
}

.faq-tip-background {
  height: 30px;
  margin-left: 40px;
}

.tipIcon {
  display: inline-block;
  width: 0;
  height: 0;
  border: 3px solid transparent;
  border-bottom-color: #0DB4C5;
  border-right-color: #0DB4C5;
  vertical-align: bottom;
}

.tipContent {
  background: #0DB4C5;
  display: inline-block;
  font-size: 12px;
  color: #FFFFFF;
  line-height: 30px;
  padding-left: 20px;
  min-width: 250px;
  border-radius: 4px 4px 4px 0;
}

.faq-tip-background {
  display: inline-block;
}

.qa-item {
  margin-bottom: 22px;
}

.anwser, .question {
  position: relative;
}

.anwser-icon {
  font-size: 12px;
  color: #999B98;
  text-align: center;
  line-height: 18px;
  background: #F5F5F6;
}

.anwserContent {
  color: #65686A;
  background: #F5F5F6;
}

.anwser {
    margin: 18px 0 28px
}

.anwserIcon {
  border-bottom-color: #F5F5F6;
  border-right-color: #F5F5F6;
}
</style>