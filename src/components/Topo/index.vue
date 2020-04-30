<template>
	<div class="topo-l">
		<div id="mountNode"></div>
		<div class="topo-graph-info">
			<template v-if="showOptions">
				<div class="topo-graph-info-content" v-for="(item, index) in infoBadge" :key="index">
					<Badge :count="item.count" :type="item.type">
						<div class="topo-graph-info-badge">
							<img class="topo-graph-info-img" :src="item.image" />
							<span>{{ item.name }}</span>
						</div>
					</Badge>
				</div>
				<Button
					type="primary"
					shape="circle"
					@click="showOptions = false"
					icon="ios-arrow-up">
				</Button>
			</template>
			<template v-else>
				<Button
					type="primary"
					shape="circle"
					@click="showOptions = true"
					icon="ios-arrow-down">
				</Button>
			</template>
		</div>

	</div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { Button } from 'view-design';
// import G6 from '@antv/g6'
import './index.less'
import NTopo from '../../NetworkTopo'

export default {
	name: 'App',
	data () {
		return {
			infoBadge: [
				{ name: '交换机', count: 5, image: require('../../assets/leafOn.png'), type: 'error' },
				{ name: '服务器', count: 3, image: require('../../assets/leafOn.png') },
				{ name: '负载均衡', count: 56, image: require('../../assets/leafOn.png') },
				{ name: '防火墙', count: 15, image: require('../../assets/leafOn.png') },
			],
			network: null,
			showOptions: false,
			data: {
				// 点集
				// nodes: [
				// 	{id: 'node1',x: 100,y: 200, shape: 'zoom-animate-node'},
				// 	{id: 'node2',x: 300,y: 200}
				// ],
				// // 边集
				// edges: [
				// // 表示一条从 node1 节点连接到 node2 节点的边
				// 	{source: 'node1',target: 'node2'}
				// ]
				nodes: [
					{ id: 'node0', x: 100, y: 100, label: 'node0', type: 'zoom-animate-node' },
					{ id: 'node1', x: 200, y: 200, label: 'node1', type: 'warning-node' },
					{ id: 'node2', x: 150, y: 150, label: 'node2' },
					{ id: 'node3', x: 150, y: 250, label: 'node3' },
					{ id: 'node4', x: 150, y: 200, label: 'node4' }],
				edges: [
					{ id: 'edge0', source: 'node0', target: 'node1', style: {
						stroke: 'red',
						lineWidth: 1
					}},
					{ id: 'edge1', source: 'node1', target: 'node0'},
					{ id: 'edge2', source: 'node2', target: 'node3'}]
			}
		}
	},
	mounted () {
		this.network = new NTopo('#mountNode')
		this.network.renderData(this.data)
		this.network.handleNode('click', item => {
			console.log(item)
			console.log('你click了node')
		})
		this.network.getNodePosition()
		// this.network.downloadImage()
		// const mountNode = document.querySelector('#mountNode')
		// const width = mountNode.offsetWidth
		// const height = mountNode.offsetHeight
		// // 实例化 Minimap 插件
		// const minimap = new G6.Minimap({
		// 	size: [ 100, 100 ],
		// 	className: "minimap",
		// 	type: 'delegate'
		// });

		// // 实例化 Grid 插件
		// const grid = new G6.Grid();
		// const graph = new G6.Graph({
		// 	container: mountNode, // 指定图画布的容器 id，与第 9 行的容器对应
		// 	// 画布宽高
		// 	width,
		// 	height,
		// 	renderer: 'svg',
		// 	// fitView: true,
		// 	// fitViewPadding: [ 20, 40, 50, 20 ],
		// 	animate: true,
		// 	defaultNode: {
		// 		type: 'circle',
		// 		size: 60,
		// 		icon: {
		// 			show: true,
		// 			img: require('../../assets/leafOn.png'),
		// 			width: 40,
		// 			height: 40
		// 		},
		// 		labelCfg: {
		// 			position: 'bottom',
		// 			offset: 5
		// 		}
		// 	},
		// 	defaultEdge: {
		// 		type: 'flow-edge',
		// 		style: {
		// 			stroke: '#888',
		// 			lineWidth: 1
		// 		}
		// 	},
		// 	nodeStateStyles: {
		// 		// hover 状态为 true 时的样式
		// 		hover: {                // hover 状态为 true 时的样式
		// 			fill: '#d3adf7'
		// 		},
		// 		running: {              // running 状态为 true 时的样式
		// 			stroke: 'steelblue'
		// 		}
		// 	},
		// 	// 边在各状态下的样式
		// 	edgeStateStyles: {
		// 		// click 状态为 true 时的样式
		// 		hover: {
		// 			fill: 'lightsteelblue',
		// 			lineWidth: 3
		// 		}
		// 	},
		// 	layout: {                // Object，可选，布局的方法及其配置项，默认为 random 布局。
		// 		type: 'force',         // 指定为力导向布局
		// 		preventOverlap: true,  // 防止节点重叠
		// 		linkDistance: 300,
		// 		nodeStrength: -30,
		// 		edgeStrength: 0.1
		// 		// nodeSize: 30        // 节点大小，用于算法中防止节点重叠时的碰撞检测。由于已经在上一节的元素配置中设置了每个节点的 size 属性，则不需要在此设置 nodeSize。
		// 	},
		// 	modes: {
		// 		default: [{
		// 			type: 'drag-node',
		// 			// enableDelegate: true
		// 		},{
		// 			type: 'tooltip',
		// 			formatText(model) {
		// 				return `这是${model.label}`;
		// 			}
		// 		}, {
		// 			type: 'edge-tooltip',
		// 			formatText(model) {
		// 				return `这是${model.id}`;
		// 			}
		// 		}, {
		// 			type: 'brush-select',
		// 			trigger: 'drag'
		// 		}, {
		// 			type: 'self-contextmenu',
		// 			// contextMenu: {
		// 			// 	canvas: ['添加', '发现'],
		// 			// 	node: ['修改', '删除'],
		// 			// 	edge: ['修改', '删除']
		// 			// }
		// 		}, 'zoom-canvas' ]
		// 	},
		// 	plugins: [ minimap, grid ]
		// });
		// // 读取数据
		// graph.data(this.data);
		// // 渲染图
		// graph.render();

		// graph.on('node:mouseenter', evt => {
		// 	const { item } = evt
		// 	graph.setItemState(item, 'hover', true)
		// })
		// graph.on('node:mouseleave', evt => {
		// 	const { item } = evt
		// 	graph.setItemState(item, 'hover', false)
		// })

		// graph.on('edge:mouseenter', evt => {
		// 	const { item } = evt
		// 	graph.setItemState(item, 'hover', true)
		// })
		// graph.on('edge:mouseleave', evt => {
		// 	const { item } = evt
		// 	graph.setItemState(item, 'hover', false)
		// })



		window.handleContextMenu = function (type) {
			console.log(`你点击了${type}`);
		} 
	}
}
</script>

<style lang="css">
.g6-tooltip {
	padding: 10px 6px;
	color: #444;
	background-color: rgba(255,255,255,0.9);
	border: 1px solid #e2e2e2;
	border-radius: 4px;
}
.g6-contextmenu {
	color: #444;
	padding: 10px 0;
	background-color: rgb(45, 140, 240);
	border-radius: 4px;
	width: 100px;
	font-size: 14px;
	color: #fff;
}
.g6-contextmenu-item {
	padding: 0 6px;
	line-height: 30px;
}
.g6-contextmenu-item:hover {
	color: rgb(45, 140, 240);
	background-color: rgb(198, 229, 255);
}
/* .g6-contextmenu-item:first-child:hover {
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
}
.g6-contextmenu-item:last-child:hover {
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
} */
</style>