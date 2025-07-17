<template>
  <div class="columns-table">
    <div v-if="searchFormData.length" class="columns-table-search">
      <el-form :model="formData" label-suffix=":">
        <div class="columns-table-form">
          <div
            v-for="(item, index) in searchFormData"
            :key="index"
            class="columns-table-item"
          >
            <el-form-item
              v-if="item.type === 'input'"
              :label="item.label"
              :prop="item.prop"
            >
              <el-input
                v-model="formData[item.prop]"
                placeholder="请输入"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              v-if="item.type === 'select'"
              :label="item.label"
              :prop="item.prop"
            >
              <el-select
                v-model="formData[item.prop]"
                placeholder="请选择"
                clearable
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.id"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="columns-table-item btns">
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button type="default" @click="handleReset">重置</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <div class="columns-table-main">
      <div class="operator">
        <slot name="btn"></slot>
      </div>
      <!-- 表格 -->
      <el-table
        ref="tableRef"
        v-loading="loading"
        row-key="id"
        show-overflow-tooltip
        tooltip-effect="dark"
        :data="tableData"
        :element-loading-text="loadingText"
        :border="tableBorder"
        :height="tableHeight"
        :max-height="tableMaxHeight"
        :empty-text="emptyText"
        :empty-image="emptyImage"
        :default-expand-all="defaultExpandAll"
        :header-cell-style="{
          'fond-size': '14px',
          height: '40px',
          'font-weight': 'bold',
          color: 'rgba(0,0,0,0.85)',
          'background-color': '#F5F5F5',
          'text-align': 'center',
        }"
        :cell-style="{
          'text-align': 'center',
          height: '40px',
          color: 'rgba(0,0,0,0.85)',
        }"
        @selection-change="selectionChange"
        @sort-change="sortChange"
      >
        <!-- 复选框 -->
        <el-table-column
          v-if="selection"
          :reserve-selection="reserveSelection"
          type="selection"
          width="45"
          fixed
          align="center"
        >
        </el-table-column>
        <!-- 序号 -->
        <el-table-column
          v-if="showIndex"
          type="index"
          label="序号"
          width="60"
          align="center"
        >
          <template #default="scope">
            <span>{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <!-- 其他列 -->
        <template v-for="(item, index) in columns">
          <template v-if="item.type === 'slot'">
            <el-table-column
              :key="index"
              :width="item.width"
              :min-width="item.minWidth"
              :prop="item.prop"
              :label="item.label"
              :align="item.align ? item.align : 'left'"
              :fixed="item.fixed ? item.fixed : false"
            >
              <!-- 操作列 -->
              <template v-if="item.slotType == 'options'" #default="scope">
                <el-button
                  v-for="(btn, ind) in item.buttons"
                  :key="ind"
                  :type="btn.type ? btn.type : 'primary'"
                  size="small"
                  :disabled="scope.row[btn.key]"
                  @click="btn.fn(scope.row)"
                  >{{ btn.text }}</el-button
                >
              </template>
              <!-- 普通自定义列 -->
              <template v-else #default="scope">
                <slot
                  :name="item.slotType"
                  :row="scope.row"
                  :label="item.label"
                  :index="scope.$index"
                  :column="scope.column"
                />
              </template>
            </el-table-column>
          </template>
          <!--普通表格-->
          <template v-else>
            <el-table-column
              :key="index"
              :sortable="item.sortable"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :min-width="item.minWidth || '80'"
              :align="item.align ? item.align : 'left'"
              :fixed="item.fixed ? item.fixed : false"
            ></el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="columns-table-page">
      <!-- 分页 -->
      <el-pagination
        v-if="showPagination"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="pageSizes"
        background
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted } from 'vue'
  let loading = defineModel('loading')
  const emits = defineEmits([
    'selection-change',
    'sort-change',
    'search',
    'reset',
  ])
  const props = defineProps({
    // 查询条件
    searchFormData: {
      type: Array,
      default: () => [],
    },
    // 分页
    total: {
      type: Number,
      default: 0,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100],
    },
    // 表格
    tableData: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    loadingText: {
      type: String,
      default: () => '正在加载中...',
    },
    tableBorder: {
      type: Boolean,
      default: () => true,
    },
    tableHeight: {
      type: String || Number,
      default: '100%',
    },
    tableMaxHeight: {
      type: String,
      default: () => '1000px',
    },
    emptyText: {
      type: String,
      default: () => '暂无数据',
    },
    emptyImage: {
      type: String,
      default: () => 'https://img.yzcdn.cn/vant/empty-block.png',
    },
    showSummary: {
      type: Boolean,
      default: () => true,
    }, // 是否显示合计行
    defaultExpandAll: {
      type: Boolean,
      default: () => false,
    },
    // 是否显示复选框
    selection: {
      type: Boolean,
      default: () => true,
    },
    // 分页的时候是否记录选择复选框状态
    reserveSelection: {
      type: Boolean,
      default: () => true,
    },
    // 是否展示翻页组件
    showPagination: {
      type: Boolean,
      default: () => true,
    },
    // 是否展示序号
    showIndex: {
      type: Boolean,
      default: () => false,
    },
    // 默认选中的数据
    checkData: {
      type: Array,
      default: () => [],
    },
  })
  const tableRef = ref(null)
  const selectionChange = (info) => {
    emits('selection-change', info)
  }
  const sortChange = (info) => {
    emits('sort-change', info)
  }
  // 外面监听pageSize和currentPage变化，调用查询数据接口。
  const pageSize = defineModel('pageSize')
  const currentPage = defineModel('currentPage')
  const formData = ref({})
  onMounted(() => {
    // 复选框默认选中行
    if (props.checkData.length > 0) {
      props.tableData.forEach((item) => {
        if (props.checkData.includes(item.id)) {
          tableRef.value.toggleRowSelection(item, true)
        } else {
          tableRef.value.toggleRowSelection(item, false)
        }
      })
    } else {
      tableRef.value.clearSelection()
    }
    // 组合查询条件
    if (props.searchFormData.length > 0) {
      props.searchFormData.forEach((item) => {
        formData.value[item.prop] = ''
      })
    }
  })
  // 清除选中状态
  const clearSelectionFun = () => {
    tableRef.value.clearSelection()
  }

  // 查询条件，先修改获取表格数据的接口参数，直接将分页修改为1，就可以了。
  const handleSearch = () => {
    emits('search', formData.value)
  }
  const handleReset = () => {
    for (let key in formData.value) {
      formData.value[key] = ''
    }
    emits('search', {})
  }
  defineExpose({
    clearSelectionFun,
  })
</script>
<style lang="scss" scoped>
  .columns-table {
    display: flex;
    flex-direction: column;
    height: 100%;
    .columns-table-main {
      margin-bottom: 12px;
      height: 100%;
      .operator {
        margin-bottom: 12px;
      }
    }
    .columns-table-page {
      display: flex;
      justify-content: flex-end;
      margin-top: 50px;
    }
    .columns-table-form {
      display: flex;
      align-items: center;
      gap: 3%;
      flex-wrap: wrap;
      .columns-table-item {
        width: 22%;
      }
      .btns {
        align-self: flex-start;
        justify-self: flex-end;
      }
    }
  }
</style>
