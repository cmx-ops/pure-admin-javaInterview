<template>
  <div>
    <div class="addButton">
      <el-button type="primary" @click="dialogVisible = true">新建菜单</el-button>
    </div>

    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="Id" width="180"/>
        <el-table-column prop="name" label="名称" width="180"/>
        <el-table-column prop="title" label="标题" width="180"/>
        <el-table-column prop="icon" label="图标" width="180"/>
        <el-table-column prop="questionListName" label="题目列表名称"/>
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
        title="新建题目菜单"
        v-model="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form :model="formData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="名称" prop="name">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-input v-model="formData.icon"></el-input>
          </el-form-item>
          <el-form-item label="题目列表名称" prop="questionListName">
            <el-input v-model="formData.questionListName"></el-input>
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
import {getMenuPagination} from "@/api/questionBank"

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
      tableData: [],

      dialogVisible: false,
      formData: {
        name: '',
        title: '',
        icon: '',
        questionListName: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入名称', trigger: 'blur'},
        ],
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'}
        ],
        icon: [
          {required: true, message: '请输入图标', trigger: 'blur'}
        ],
        questionListName: [
          {required: true, message: '请输入题目列表名称', trigger: 'blur'}
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
      getMenuPagination(this.pagination).then(res => {
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

