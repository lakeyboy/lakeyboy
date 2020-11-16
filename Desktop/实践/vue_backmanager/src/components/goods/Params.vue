<template>
  <div>
    <!-- 面包屑导航区 -->
    <!-- 样式可以应用于全局 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 警告区域 -->
      <el-alert
        show-icon
        title="注意：只允许添加第三级分类设置的相关参数！"
        type="warning"
        :closable="false"
      >
      </el-alert>
      <!-- 选择商品分类的级联选择框 -->
      <el-row>
        <el-col class="cat_opt">
          <span>选择商品分类：</span>
          <!-- 商品分类级联 -->
          <el-cascader
            v-model="selectedCateKeys"
            :options="catelist"
            :props="cateProps"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>



<script>
export default {
  data() {
    return {
      //商品分类数据
      catelist: [],
      //级联选择框配置对象
      cateProps: {
        expandTrigger: 'hover',
        // 选中时的值
        value: 'cat_id',
        // 看到的值
        label: 'cat_name',
        children: 'children',
        //级联旋转框双向绑定的数组
        selectedCateKeys: [],
      },
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    //获取所有商品分类列表
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败！')
      }

      this.catelist = res.data
    },
    //级联选择框变化时触发
    handleChange() {},
  },
}
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>