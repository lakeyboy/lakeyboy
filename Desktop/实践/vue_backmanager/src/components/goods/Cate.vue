<template>
  <div>
    <!-- 面包屑导航区 -->
    <!-- 样式可以应用于全局 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog"
            >添加分类</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <tree-table
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
        class="treeTable"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <!-- 排序 -->
        <!-- 最后一项为v-else -->
        <template slot="order" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag
            size="mini"
            type="success"
            v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt">
          <el-button size="mini" type="primary" icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" icon="el-icon-delete"
            >删除</el-button
          >
        </template>
      </tree-table>
      <!-- 分页 -->

      <!-- script外调用为什么不使用this  比如total -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <!-- 对话框不在卡片视图中 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
    >
      <!-- 添加分类的标签 -->
      <el-form
        :model="addCateForm"
        :rules="addCateFormRules"
        ref="addCateFormRef"
        label-width="100px"
      >
        <el-form-item label="分类名称:" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
          <!-- 级联选择器   -->
          <!-- options指定数据源 -->
          <!-- props用来指定配置对象 -->
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateList"
            :props="cascaderProps"
            @change="parentCateChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      //查询条件
      queryInfo: {
        type: 3,
        // 当前页码
        pagenum: 1,
        // 页码显示条数
        pagesize: 5,
      },
      //商品分类的数据列表
      catelist: [],
      //总数据条数
      total: 0,
      //为treetable指定列的定义
      columns: [
        {
          label: '分类名称',
          //数据中的属性
          prop: 'cat_name',
        },
        {
          label: '是否有效',
          //使用作用域插槽来自定义
          // 将当前列定义为模板列
          type: 'template',
          // 表示当前列使用的模板名称
          template: 'isok',
          // align: 'center',
        },
        {
          label: '排序',
          // 将当前列定义为模板列
          type: 'template',
          // 表示当前列使用的模板名称
          template: 'order',
        },
        {
          label: '操作',
          // 将当前列定义为模板列
          type: 'template',
          // 表示当前列使用的模板名称
          template: 'opt',
        },
      ],
      //控制添加分类对话框的显隐
      addCateDialogVisible: false,
      //添加分类的数据对象  相应的数据
      addCateForm: {
        //将要添加的分类的名称
        cat_name: '',
        // 父级分类id
        cat_pid: 0,
        //分类等级  默认为0
        cat_level: 0,
      },
      //添加的分类表单 的校验规则对象
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      },
      //父级分类数据
      parentCateList: [],
      //指定级联选择器的配置对象
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
      },
      //选中的父级分类的id数组
      selectedKeys: [],
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    //获取商品分类数据
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryInfo,
      })

      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败！')
      }

      //console.log(res)
      //需要把获取的数据赋值给catelist
      this.catelist = res.data.result
      //为总的数据条数赋值
      this.total = res.data.total
    },
    //监听pagesize改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    //监听pagenum改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    //显示 添加分类  对话框
    showAddCateDialog() {
      //先获取父级分类的数据列表
      this.getParentCateList()

      this.addCateDialogVisible = true
    },
    //获取父级分类的数据列表
    async getParentCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 },
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取父级分类数据失败！')
      }
      this.parentCateList = res.data
    },
    //选择项发生变化触发这个函数
    parentCateChange() {},
  },
}
</script>

<style lang="less" scoped>
.treeTable {
  margin-top: 15px;
}
.el-cascader {
  width: 100%;
}
</style>