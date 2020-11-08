<template>
  <div>
    <!-- 面包屑导航区 -->
    <!-- 样式可以应用于全局 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card> 11 </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //所有的权限数据列表
      rightsList: [],
    }
  },
  //生命周期函数中发起数据请求  获取所有权限数据
  created() {
    this.getRightsList()
  },
  methods: {
    //获取权限列表数据
    async getRightsList() {
      //第一个参数是请求地址
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败')
      }

      this.rightsList = res.data

      console.log(this.rightsList)
    },
  },
}
</script>


<style lang="less" scoped>
</style>