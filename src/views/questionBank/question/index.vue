<template>
  <div>
    <div>
      <el-select v-model="pagination.menuId" @change="selectChange" clearable placeholder="请选择所属分类"
                 class="select">
        <template v-for="m in menuList">
          <el-option :label="m.title" :value="m.id"></el-option>
        </template>
      </el-select>
    </div>
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
        layout="sizes, prev, pager, next"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新建题目表单 -->
    <div>
      <el-dialog
        title="新建题目"
        v-model="dialogVisible4Add"
        width="30%"
        :before-close="handleClose">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
          <el-form-item label="所属菜单" prop="menuId">
            <el-select v-model="formData.menuId" placeholder="请选择题目所属分类">
              <template v-for="m in menuList">
                <el-option :label="m.title" :value="m.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="题目" prop="questionName">
            <el-input type="textarea" v-model="formData.questionName"></el-input>
          </el-form-item>

          <el-form-item label="答案" prop="questionAnswerContent">
            <el-input v-model="formData.questionAnswerContent" @click="addQuestionAnswer">添加答案</el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitAdd('formData')">立即创建</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>

    <!-- 编辑题目表单 -->
    <div>
      <el-dialog
        title="编辑题目"
        v-model="dialogVisible4Edit"
        width="30%"
        :before-close="handleClose">
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">
          <el-form-item label="所属菜单" prop="menuId">
            <el-select v-model="formData.menuId" placeholder="请选择题目所属分类">
              <template v-for="m in menuList">
                <el-option :label="m.title" :value="m.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="题目" prop="questionName">
            <el-input type="textarea" v-model="formData.questionName"></el-input>
          </el-form-item>

          <el-form-item label="答案" prop="questionAnswerContent">
            <el-input v-model="formData.questionAnswerContent" @click="addQuestionAnswer">添加答案</el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitEdit('formData')">确定</el-button>
            <el-button @click="handleClose">取 消</el-button>
          </el-form-item>
        </el-form>

      </el-dialog>
    </div>

    <div>
      <el-dialog v-model="questionAnswerVisible">
        <MdEditor v-model="formData.questionAnswerContent"/>
      </el-dialog>

    </div>

  </div>
</template>

<script>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

import {
  getQuestionPagination,
  getAllMenu,
  addQuestion,
  getQuestionAnswerContentByQuestionId,
  updateQuestion,
  deleteQuestion
} from "@/api/questionBank"


export default {
  name: "question",
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
        menuId: null,
      },
      menuList: [],
      tableData: [],

      questionAnswerVisible: false,
      dialogVisible4Add: false,
      dialogVisible4Edit: false,
      formData: {},
      rules: {
        menuId: [
          {required: true, message: '请选择题目所属分类', trigger: 'blur'},
        ],
        questionName: [
          {required: true, message: '请输入题目内容', trigger: 'blur'}
        ],
        questionAnswerContent: [
          {required: true, message: '请输入题目答案', trigger: 'blur'}
        ]
      },
    }
  },
  created() {
    console.log(this.$router.options)
    this.initMenuList()
    this.findPage()
  },
  methods: {
    //分页查询
    findPage() {
      getQuestionPagination(this.pagination).then(res => {
        if (res) {
          console.log(res)
          this.tableData = res.data
          this.pagination.total = res.total
        }
      })
    },
    //搜索框选项切换触发
    selectChange() {
      //清空搜索框时将menuId置空，否则后端无法绑定参数
      if (this.pagination.menuId===''){
        this.pagination.menuId = null
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
      this.initMenuList();
      //根据题目id查询题目答案
      console.log(row.id)
      getQuestionAnswerContentByQuestionId(row.id).then(res => {
        if (res && res.code === 200) {
          row.questionAnswerContent = res.data
          this.formData = row
        } else {
          this.$message.error('根据题目id获取答案失败');
        }
      })
    },
    handleDelete(index, row) {
      console.log("删除")
      console.log(index, row)
      this.$confirm('此操作将永久删除该题目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteQuestion(row).then(res => {
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
    addQuestionAnswer() {
      this.questionAnswerVisible = true
    },
    //重置表单内容
    resetForm() {
      this.formData = {}
    },
    addQuestion() {
      this.dialogVisible4Add = true
      this.initMenuList();
    },
    submitAdd(formName) {
      console.log("新建")
      console.log(this.formData)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          addQuestion(this.formData).then(res => {
            if (res && res.code === 200) {
              this.$message({
                message: '添加题目成功',
                type: 'success'
              });
              this.findPage()
            } else {
              this.$message.error('添加题目数据失败');
            }
          })
          this.dialogVisible4Add = false
          this.resetForm()
        } else {
          return false
        }
      });
    },

    //编辑题目表单提交
    submitEdit(formName) {
      console.log("编辑")
      console.log(this.formData)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateQuestion(this.formData).then(res => {
            if (res && res.code === 200) {
              this.$message({
                message: '更新题目成功',
                type: 'success'
              });
              this.findPage()
            } else {
              this.$message.error('更新题目数据失败');
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

    //初始化菜单列表
    initMenuList() {
      if (this.menuList.length === 0) {
        //查询所有题目分类
        getAllMenu().then(res => {
          if (res) {
            this.menuList = res.data
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

