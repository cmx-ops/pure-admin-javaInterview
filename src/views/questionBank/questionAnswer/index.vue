<template>
  <div>
    <!--服务器会在请求头找到referrer信息，查看请求是否来自本站，如果不是就返回403。从而实现资源防盗-->
    <meta name="referrer" content="no-referrer">
    <h1>
      答案管理
    </h1>

    <div>
      <div>
        <!--previewOnly 只预览不编辑-->
        <MdEditor v-if="previewOnly" v-model="article" previewOnly/>
        <!--具有编辑功能-->
        <MdEditor v-if="!previewOnly" v-model="article"/>
      </div>
    </div>
  </div>
</template>

<script>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default {

  components: {
    MdEditor
  },
  data() {
    return {
      previewOnly:false,
      article: "# 111"
    }
  },
  created() {

  },
  methods: {},

}
</script>

<style scoped>

</style>
