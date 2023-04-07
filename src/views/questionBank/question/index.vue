<template>
  <div>
    <div class="addButton">
      <el-button type="primary" @click="addQuestion">新建题目</el-button>
    </div>

    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="Id" width="180"/>
        <el-table-column prop="menuId" label="所属菜单Id" width="180"/>
        <el-table-column prop="menuName" label="所属分类" width="180"/>
        <el-table-column prop="questionName" label="题目内容"/>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑
            </el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>
      <el-pagination
        v-model:current-page="pagination.pageNum"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[10, 20, 30, 50]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="sizes, prev, pager, next"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新建题目菜单表单 -->
    <div>
      <el-dialog
        title="新建题目"
        v-model="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="所属菜单" prop="menuId">
            <el-select v-model="formData.menuId" placeholder="请选择题目所属分类">
              <template v-for="m in menuList">
                <el-option  :label="m.title" :value="m.id" ></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="题目" prop="questionName">
            <el-input type="textarea" v-model="formData.questionName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getQuestionPagination} from "@/api/questionBank"
import {getAllMenu} from "@/api/questionBank"

export default {
  name: "teacherStat",
  data() {
    return {
      background: true,
      pagination: {//分页相关属性
        pageNum: 1,
        pageSize: 10,
        total: 100,
        queryString: null,
      },
      menuList:[],
      tableData: [],

      dialogVisible: false,
      formData: {},
      rules: {
        menuId: [
          {required: true, message: '请选择题目所属分类', trigger: 'blur'},
        ],
        questionName: [
          {required: true, message: '请输入题目内容', trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    console.log(this.$router.options)
    this.findPage()
  },
  methods: {
    findPage() {
      getQuestionPagination(this.pagination).then(res => {
        if (res) {
          console.log(res)
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
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleClose() {
      this.dialogVisible = false
      this.resetForm()
    },
    //重置表单内容
    resetForm() {
      this.formData = {}
    },
    addQuestion() {
      this.dialogVisible = true
      //查询所有题目分类
      getAllMenu().then(res=>{
        if (res) {
          this.menuList = res.data
        }
      })
    },
    submitForm() {
      console.log(this.formData)
      this.resetForm()
      this.dialogVisible = false
    }
  },

}
</script>

<style scoped>
.addButton {
  float: right;
}
</style>

