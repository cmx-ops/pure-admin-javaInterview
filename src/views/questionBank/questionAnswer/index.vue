<template>
  <div>
    <!--服务器会在请求头找到referrer信息，查看请求是否来自本站，如果不是就返回403。从而实现资源防盗-->
    <meta name="referrer" content="no-referrer">
    <div>
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="Id" width="100"/>
          <el-table-column prop="questionId" label="题目id" width="100"/>
          <el-table-column prop="questionName" label="题目" width="180"/>
          <!--show-overflow-tooltip="true" 内容过长时展示省略号-->
          <el-table-column prop="questionAnswerContent" label="答案" width="600" show-overflow-tooltip="true"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">答案编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div>
        <el-pagination
          v-model:current-page="pagination.pageNum"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 30, 50]"
          :background="background"
          layout="sizes, prev, pager, next"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>

    </div>

    <div>
      <div>
        <!--previewOnly 只预览不编辑-->
        <!--        <MdEditor v-model="article" previewOnly/>-->
        <!--具有编辑功能-->
        <el-dialog v-model="editorVisible">
          <MdEditor v-model="formData.questionAnswerContent"/>

          <div class="editDialog_but">
            <el-button type="primary" @click="submitEdit('ruleForm')">确定修改</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </div>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import {getQuestionAnswerPagination} from "@/api/questionBank"

export default {

  components: {
    MdEditor
  },
  data() {
    return {
      background: true,
      pagination: {//分页相关属性
        pageNum: 1,
        pageSize: 10,
        total: 100,
        queryString: null,
      },
      tableData: [],
      editorVisible: false,
      formData: {},
      article: "# 111"
    }
  },
  created() {
    this.findPage()
  },
  methods: {
    findPage() {
      getQuestionAnswerPagination(this.pagination).then(res => {
        if (res) {
          this.tableData = res.data
          this.pagination.total = res.total
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.findPage()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.findPage()
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.formData = row
      this.editorVisible = true
    },
    handleClose() {
      this.editorVisible = false
      this.resetForm()
    },
    //重置表单内容
    resetForm() {
      this.formData = {}
    },
    submitEdit() {
      console.log(this.formData)
      this.resetForm()
      this.editorVisible = false
    }
  },

}
</script>

<style scoped>
.editDialog_but{
 margin:10px auto !important;
}
</style>
