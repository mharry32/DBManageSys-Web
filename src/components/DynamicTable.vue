<template>
  <!-- 动态展示表格 -->
  <el-table
    :data="tableData"
    border
    stripe
    :height="height"
    @row-click="handleRowClick"
  >
    <!-- v-for 循环取表头数据 -->
    <template v-for="item in tableHeader">
      <el-table-column
        :render-header="headSpanFit"
        :key="item"
        :label="item"
        :prop="item"
        align="center"
      />
    </template>
  </el-table>
</template>

<script>
import { RenderHeaderWidth } from "../components/Methods/TableRender.js";
export default {
  name: "DynamicTable",
  components: {},
  props: {
    // 表格的数据
    tableData: {
      type: Array,
      required: true,
    },
    // 多级表头的数据
    tableHeader: {
      type: Array,
      required: true,
    },
    // 表格的高度
    height: {
      type: String,
      default: "300",
    },
  },
  methods: {
    // 行点击事件
    handleRowClick(row, column, event) {
      // console.log(row)
      // console.log(column)
      // console.log(event)
      // 通知调用父组件的row-click事件
      // row作为参数传递过去
      this.$emit("row-click", row);
    },
    headSpanFit(h, { column, index }) {
      return RenderHeaderWidth(h, { column, index });
    },
  },
};
</script>