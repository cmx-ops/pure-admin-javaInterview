<template>
  <el-table :data="tabledata1" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180"/>
    <el-table-column prop="name" label="Name" width="180"/>
    <el-table-column prop="address" label="Address"/>
  </el-table>
</template>


<script setup lang="ts">
import {getData} from "@/api/test"
import {ref} from "vue";

defineOptions({
  name: "MenuPage"
});

const tableData = [
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
const tabledata1 = ref()
getData().then(res => {
  if (res) {
    console.log(res)
    tabledata1.value = res
  }
})

</script>

<style scoped>

</style>
