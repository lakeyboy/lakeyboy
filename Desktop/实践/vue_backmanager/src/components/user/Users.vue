<!-- 最外层必须要   一个  根容器 -->
<template>
  <div>
    <!-- 面包屑导航区 -->
    <!-- 样式可以应用于全局 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <!-- 搜索与添加区域   分栏间隔 -->
      <!-- gutter 栅格间隔    span栅格占据的列数   -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- 不同的type不同的颜色 -->
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <!-- 每个column  表示一列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"> </el-table-column>

        <el-table-column label="邮箱" prop="email"> </el-table-column>

        <el-table-column label="电话" prop="mobile"> </el-table-column>

        <el-table-column label="角色" prop="role_name"> </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <!-- cope.row 表示这一列的数据 -->
            <!-- 向数据绑定 -->
            <!-- {{scope.row}} -->
            <el-switch v-model="scope.row.mg_state"> </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180px">
          <template>
            <!-- 修改 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <!-- 分配角色 -->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    //获取用户列表的参数对象
    return {
      queryInfo: {
        query: '',
        // 当前页数
        pagenum: 1,
        // 显示个数
        pagesize: 2,
      },
      userlist: [],
      total: 0,
    }
  },
  // 生命周期函数
  created() {
    // 获取用户列表数据
    this.getUserList()
  },
  methods: {
    //由于返回时promise对象，所以需要使用  await  async 优化异步操作
    async getUserList() {
      // 解构数据对象
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo,
      })
      if (res.meta.status !== 200)
        return this.$message.error('获取用户列表失败!')
      this.userlist = res.data.users
      this.total = res.data.total
    },
    //监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    //监听  页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
  },
}
</script>

<style lang="less" scoped>
</style>