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
      let labelLong = column.label.length; // 表头label长度
      let size = 14; // 根据需要定义标尺，直接使用字体大小确定就行，也可以根据需要定义
      column.minWidth = labelLong * size; // 根据label长度计算该表头最终宽度
      return h("span", { class: "cell-content", style: { width: "100%" } }, [
        column.label,
      ]);
    },
  },
};
</script>