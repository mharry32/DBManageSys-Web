export function RenderHeaderWidth(h, { column, index }) {
    let labelLong = column.label.length; // 表头label长度
    let size = 14; // 根据需要定义标尺，直接使用字体大小确定就行，也可以根据需要定义
    column.minWidth = labelLong * size; // 根据label长度计算该表头最终宽度
    return h("span", { class: "cell-content", style: { width: "100%" } }, [
        column.label,
    ]);
}