<template>
  <div>
    <div class="addButton">
      <el-button type="primary" @click="dialogVisible4Add = true">新建专栏</el-button>
    </div>

    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="Id" width="180"/>
        <el-table-column prop="columnName" label="专栏名称" width="180"/>
        <el-table-column prop="columnIcon" label="图标" width="180"/>
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
        :background="background"
        layout="sizes, prev, pager, next"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新建文章专栏表单 -->
    <div>
      <el-dialog
        title="新建专栏"
        v-model="dialogVisible4Add"
        width="30%"
        :before-close="handleClose">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
          <!--prop属性名称要和rlues中的一致-->
          <el-form-item label="标题" prop="columnName">
            <el-input v-model="formData.columnName"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="columnIcon">
            <el-input v-model="formData.columnIcon"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitAdd('formData')">立即创建</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>

    <!-- 修改文章专栏表单 -->
    <div>
      <el-dialog
        title="编辑专栏"
        v-model="dialogVisible4Edit"
        width="30%"
        :before-close="handleClose">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
          <el-form-item label="标题" prop="title">
            <el-input v-model="formData.columnName"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-input v-model="formData.columnIcon"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitEdit('formData')">确定</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>

  </div>
</template>

<script>
import {
  getColumnPagination,
  addColumn,
  updateColumn,
  deleteColumn
} from "@/api/column"

export default {
  name: "column",
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

      dialogVisible4Add: false,
      dialogVisible4Edit: false,
      formData: {},
      rules: {
        columnName: [
          {required: true, message: '请输入专栏名称', trigger: 'blur'},
        ],
        columnIcon: [
          {required: true, message: '请输入专栏图标', trigger: 'blur'}
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
      getColumnPagination(this.pagination).then(res => {
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
      this.dialogVisible4Edit = true
      this.formData = row
    },
    handleDelete(index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该专栏下的所有文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteColumn(row).then(res=>{
          if (res && res.code==200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.findPage()
          }else {
            this.$message.error('删除数据失败');
          }
        })
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '已取消删除'
        });
      });
    },
    handleClose() {
      this.dialogVisible4Edit = false
      this.dialogVisible4Add = false
      this.resetForm()
    },

    //新建专栏表单提交
    submitAdd(formName) {
      console.log("新建")
      console.log(this.formData)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addColumn(this.formData).then(res=>{
            if (res && res.code == 200){
              this.$message({
                message: '添加专栏成功',
                type: 'success'
              });
              this.findPage()
            }else {
              this.$message.error('添加专栏数据失败');
            }
          })
          this.dialogVisible4Add = false
          this.resetForm()
        } else {
          return false
        }
      });
    },

    //编辑专栏表单提交
    submitEdit(formName) {
      console.log("编辑")
      console.log(this.formData)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateColumn(this.formData).then(res=>{
            if (res && res.code == 200){
              this.$message({
                message: '更新专栏成功',
                type: 'success'
              });
              this.findPage()
            }else {
              this.$message.error('更新专栏数据失败');
            }
          })
          this.dialogVisible4Edit = false
          this.resetForm()
        } else {
          return false
        }
      });
    },

    //重置表单内容
    resetForm() {
      this.formData = {}
    },
  },

}
</script>

<style scoped>
.addButton {
  float: right;
}
</style>

