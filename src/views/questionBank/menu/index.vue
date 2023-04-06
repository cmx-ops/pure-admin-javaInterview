<!--<template>-->
<!--  <el-table :data="tabledata1" style="width: 100%">-->
<!--    <el-table-column prop="date" label="Date" width="180"/>-->
<!--    <el-table-column prop="name" label="Name" width="180"/>-->
<!--    <el-table-column prop="address" label="Address"/>-->
<!--  </el-table>-->
<!--</template>-->


<!--<script setup lang="ts">-->
<!--import {getData} from "@/api/test"-->
<!--import {ref} from "vue";-->

<!--defineOptions({-->
<!--  name: "MenuPage"-->
<!--});-->

<!--const tableData = [-->
<!--  {-->
<!--    date: '2016-05-03',-->
<!--    name: 'Tom',-->
<!--    address: 'No. 189, Grove St, Los Angeles',-->
<!--  },-->
<!--  {-->
<!--    date: '2016-05-02',-->
<!--    name: 'Tom',-->
<!--    address: 'No. 189, Grove St, Los Angeles',-->
<!--  },-->
<!--  {-->
<!--    date: '2016-05-04',-->
<!--    name: 'Tom',-->
<!--    address: 'No. 189, Grove St, Los Angeles',-->
<!--  },-->
<!--  {-->
<!--    date: '2016-05-01',-->
<!--    name: 'Tom',-->
<!--    address: 'No. 189, Grove St, Los Angeles',-->
<!--  },-->
<!--]-->
<!--const tabledata1 = ref()-->
<!--getData().then(res => {-->
<!--  if (res) {-->
<!--    console.log(res)-->
<!--    tabledata1.value = res-->
<!--  }-->
<!--})-->

<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
  <div>
    <div>
      <el-table :data="tableData1" border style="width: 100%">
        <el-table-column prop="date" label="Date" width="180"/>
        <el-table-column prop="name" label="Name" width="180"/>
        <el-table-column prop="address" label="Address"/>
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        v-model:current-page="currentPage2"
        v-model:page-size="pageSize2"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="sizes, prev, pager, next"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import {getData} from "@/api/test"
import {ref} from "vue";

export default {
  name: "teacherStat",
  data() {
    return {
      tableData1: [],
      currentPage2:5,
      pageSize2:100,
      background:true,
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ]
    }
  },
  methods:{
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleEdit(index,row){
      console.log(index, row)
    },
    handleDelete(index,row){
      console.log(index, row)
    }
  },
  created() {
    console.log(this.$router.options)
    getData().then(res => {
      if (res) {
        console.log(res)
        this.tableData1 = res
      }
    })
  }
}
</script>

<style scoped>

</style>

