<template>
  <div class="list">
    <s-header />
    <div class="w900 m-auto ptb15" style="width: 900px">
      <div class="flex-center-between mb20">
        <span class="b f16">应用列表</span>
        <el-button
          size="small"
          type="primary"
          icon="el-icon-plus"
          @click="handleAddApp"
        >添加应用</el-button>
      </div>

      <el-table
        :data="list"
        size="small"
        border
        stripe
      >
        <el-table-column label="AppId" prop="id" />
        <el-table-column label="应用名称" prop="name" />
        <el-table-column label="创建时间" />
        <el-table-column label="创建人" />
        <el-table-column label="操作">
          <template slot-scope="props">
            <el-button type="text" @click="handleEdit(props.row)">编辑</el-button>
            <el-button type="text" @click="handleShowDoc(props.row)">应用接入</el-button>
            <el-button type="text" @click="$router.push(`/detail/${props.row.id}`)">控制台</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      :visible.sync="showDocModal"
      title="应用接入"
      class="doc-modal"
    >
      <p>1. 安装 SDK</p>
      <pre>xnpm i @xm/monitor -S</pre>
      <p>2. 初始化</p>
      <pre><span class="comment">// 在 app.js 或 main.js 入口文件头部引入</span><br><span class="token">import</span> Monitor <span class="token">from</span> '@xm/monitor'<br><br><span class="token">const</span> monitor = <span class="token">new</span> Monitor({
  appId: {{ selectItem && selectItem.id }}
})
      </pre>
      <p>3. Vue 应用</p>
      <pre><span class="comment">// 利用第 2 步初始化得到的实例手动捕获</span><br>Vue.config.errorHandler = <span class="token">function</span> (err, vm, info) {
  monitor.captureError(err, vm, info)
}
      </pre>
    </el-dialog>

    <el-dialog
      title="添加应用"
      :visible.sync="showApplicationModal"
    >
      <el-form
        label-width="80px"
        :model="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="应用名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="成员" prop="users">
          <el-select v-model="form.users" multiple placeholder="请选择">
            <el-option
              v-for="item in users"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template slot="footer">
        <el-button>取消</el-button>
        <el-button type="primary" @click="handleModalConfirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import SHeader from '../components/header'

export default {
  components: {
    SHeader
  },

  data () {
    return {
      showDocModal: false,
      showApplicationModal: false,
      selectItem: null,
      list: [
        {
          id: 1,
          name: '审批h5'
        }
      ],
      form: {
        users: [],
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        users: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
      },
      users: [{ id: 1, name: 'ym' }]
    }
  },

  methods: {
    handleShowDoc (item) {
      this.selectItem = item
      this.showDocModal = true
    },

    handleModalConfirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.showApplicationModal = false
        }
      })
    },

    handleAddApp () {
      this.showApplicationModal = true
      this.$refs.form.resetFields()
    },

    handleEdit (item) {
      this.form = { ...item }
      this.$refs.form.resetFields()
      this.showApplicationModal = true
    }
  }
}
</script>

<style lang="less">
.doc-modal {
  pre {
    background: #f2f2f2;
    padding: 10px;
    font-size: 12px;
    .comment {
      color: #aaa;
    }
    .token {
      color: #3b8ff6;
    }
  }
}
</style>
