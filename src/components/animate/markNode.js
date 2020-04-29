import G6 from '@antv/g6'
// 放大、变小动画
G6.registerNode('mark-node', {
  afterDraw(cfg, group) {
    // 获取该节点上的第一个图形
    const shape = group.get('children')[0];
    console.log(shape)
  }
}, 'circle'); // 该自定义节点继承了内置节点 'circle'，除了被复写的 afterDraw 方法外，其他按照 'circle' 里的函数执行。