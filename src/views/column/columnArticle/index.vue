<template>
  <div>
    <div>
      <el-select v-model="pagination.columnId" @change="selectChange" clearable placeholder="请选择所属专题"
                 class="select">
        <template v-for="m in columnList">
          <el-option :label="m.columnName" :value="m.id"></el-option>
        </template>
      </el-select>
    </div>
    <div class="addButton">
      <el-button type="primary" @click="addArticle">新建文章</el-button>
    </div>

    <div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="Id" width="180"/>
        <el-table-column prop="columnId" label="所属专栏Id" width="180"/>
        <el-table-column prop="columnName" label="所属分类" width="180"/>
        <el-table-column prop="articleName" label="文章内容"/>
        <el-table-column prop="articleUrl" label="文章链接"/>
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
        layout="sizes, prev, pager, next"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新建文章表单 -->
    <div>
      <el-dialog
        title="新建文章"
        v-model="dialogVisible4Add"
        width="30%"
        :before-close="handleClose">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
          <el-form-item label="所属专栏" prop="columnId">
            <el-select v-model="formData.columnId" placeholder="请选择文章所属分类">
              <template v-for="m in columnList">
                <el-option :label="m.columnName" :value="m.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="文章标题" prop="articleName">
            <el-input type="textarea" v-model="formData.articleName"></el-input>
          </el-form-item>

          <el-form-item label="文章链接" prop="articleUrl">
            <el-input v-model="formData.articleUrl" @click="addArticleAnswer">添加答案</el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitAdd('formData')">立即创建</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>

    <!-- 编辑文章表单 -->
    <div>
      <el-dialog
        title="编辑文章"
        v-model="dialogVisible4Edit"
        width="30%"
        :before-close="handleClose">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
          <el-form-item label="所属专栏" prop="columnId">
            <el-select v-model="formData.columnId" placeholder="请选择文章所属分类">
              <template v-for="m in columnList">
                <el-option :label="m.title" :value="m.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="文章" prop="articleName">
            <el-input type="textarea" v-model="formData.articleName"></el-input>
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
  getArticlePagination,
  getAllColumn,
  addArticle,
  updateArticle,
  deleteArticle
} from "@/api/column"


export default {
  name: "columnArticle",
  components: {},
  data() {
    return {
      background: true,
      pagination: {//分页相关属性
        pageNum: 1,
        pageSize: 10,
        total: 100,
        columnId: null,
      },
      columnList: [],
      tableData: [],

      articleAnswerVisible: false,
      dialogVisible4Add: false,
      dialogVisible4Edit: false,
      formData: {},
      rules: {
        columnId: [
          {required: true, message: '请选择文章所属分类', trigger: 'blur'},
        ],
        articleName: [
          {required: true, message: '请输入文章标题', trigger: 'blur'}
        ],
        articleUrl: [
          {required: true, message: '请输入文章链接', trigger: 'blur'}
        ]
      },
    }
  },
  created() {
    console.log(this.$router.options)
    this.initcolumnList()
    this.findPage()
  },
  methods: {
    //分页查询
    findPage() {
      getArticlePagination(this.pagination).then(res => {
        if (res) {
          console.log(res)
          this.tableData = res.data
          this.pagination.total = res.total
        }
      })
    },
    //搜索框选项切换触发
    selectChange() {
      //清空搜索框时将columnId置空，否则后端无法绑定参数
      if (this.pagination.columnId === '') {
        this.pagination.columnId = null
      }
      console.log(this.pagination)
      this.findPage(this.pagination)
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
      console.log('编辑')
      console.log(index, row)
      this.dialogVisible4Edit = true
      this.initcolumnList();
      //根据文章id查询文章答案
      console.log(row.id)
      getarticleAnswerContentByarticleId(row.id).then(res => {
        if (res && res.code === 200) {
          row.articleAnswerContent = res.data
          this.formData = row
        } else {
          this.$message.error('根据文章id获取答案失败');
        }
      })
    },
    handleDelete(index, row) {
      console.log("删除")
      console.log(index, row)
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(row).then(res => {
          if (res && res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.findPage()
          } else {
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
    addArticleAnswer() {
      this.articleAnswerVisible = true
    },
    //重置表单内容
    resetForm() {
      this.formData = {}
    },
    addArticle() {
      this.dialogVisible4Add = true
      this.initcolumnList();
    },
    submitAdd(formName) {
      console.log("新建")
      console.log(this.formData)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addArticle(this.formData).then(res => {
            if (res && res.code === 200) {
              this.$message({
                message: '添加文章成功',
                type: 'success'
              });
              this.findPage()
            } else {
              this.$message.error('添加文章数据失败');
            }
          })
          this.dialogVisible4Add = false
          this.resetForm()
        } else {
          return false
        }
      });
    },

    //编辑文章表单提交
    submitEdit(formName) {
      console.log("编辑")
      console.log(this.formData)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateArticle(this.formData).then(res => {
            if (res && res.code === 200) {
              this.$message({
                message: '更新文章成功',
                type: 'success'
              });
              this.findPage()
            } else {
              this.$message.error('更新文章数据失败');
            }
          })
          this.dialogVisible4Edit = false
          this.resetForm()
        } else {
          return false
        }
      });
    },

    handleClose() {
      this.dialogVisible4Edit = false
      this.dialogVisible4Add = false
      this.resetForm()
    },

    //初始化专栏列表
    initcolumnList() {
      if (this.columnList.length === 0) {
        //查询所有文章分类
        getAllColumn().then(res => {
          if (res) {
            this.columnList = res.data
          }
        })
      }
    }
  },

}
</script>

<style scoped>
.addButton {
  float: right;
}

.select {
  float: left;
}
</style>

