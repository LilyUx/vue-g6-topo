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
// import GTopo from 'g-topo';
import GTopo from '../../NTopo'
// import {topoData} from '../../../mock'

export default {
	name: 'App',
	data () {
		return {
			infoBadge: [
				{ name: '交换机', count: 5, image: require('../../assets/leafOn.png'), type: 'error' },
				{ name: '服务器', count: 3, image: require('../../assets/hostOn.png') },
				{ name: '负载均衡', count: 56, image: require('../../assets/gatewayOn.png') },
				{ name: '防火墙', count: 15, image: require('../../assets/leafOn.png') },
			],
			network: null,
			showOptions: false,
			data: {
				nodes: [
					{
						id: 'node0',
						x: 300,
						y: 600,
						label: 'node0',
						type: 'zoom-animate-node',
						icon: {
							show: true,
							img: require('../../assets/leafOn.png'),
							width: 40,
							height: 40
						},
						groupId: 'group1'
					},
					{
						id: 'node1',
						x: 500,
						y: 200,
						label: 'node1',
						type: 'warning-node',
						icon: {
							show: true,
							img: require('../../assets/hostOn.png'),
							width: 40,
							height: 40
						},
						groupId: 'group1',
					},
					{
						id: 'node2',
						x: 750,
						y: 150,
						label: 'node2',
						type: 'play-warn-node',
						icon: {
							show: true,
							img: require('../../assets/lbassOn.png'),
							width: 40,
							height: 40
						},
						groupId: 'group2',
					},
					{
						id: 'node3',
						x: 250,
						y: 250,
						label: 'node3',
						icon: {
							show: true,
							img: require('../../assets/gatewayOn.png'),
							width: 40,
							height: 40
						},
						groupId: 'group2',
					},
					{
						id: 'node4',
						x: 850,
						y: 750,
						label: 'node4',
						icon: {
							show: true,
							img: require('../../assets/firewallOn.png'),
							width: 40,
							height: 40
						}
					},
					{
						id: 'node5',
						x: 650,
						y: 950,
						label: 'node5',
						icon: {
							show: true,
							img: require('../../assets/spineOn.png'),
							width: 40,
							height: 40
						}
					},
					{
						id: 'node6',
						x: 250,
						y: 850,
						label: 'node6',
						icon: {
							show: true,
							img: require('../../assets/leafOn.png'),
							width: 40,
							height: 40
						}
					},
					{
						id: 'node7',
						x: 450,
						y: 350,
						label: 'node7',
						icon: {
							show: true,
							img: require('../../assets/spineOn.png'),
							width: 40,
							height: 40
						}
					},
					{
						id: 'node8',
						x: 567,
						y: 650,
						label: 'node8',
						icon: {
							show: true,
							img: require('../../assets/firewallOn.png'),
							width: 40,
							height: 40
						}
					},
					{
						id: 'node9',
						x: 580,
						y: 400,
						label: 'node9',
						icon: {
							show: true,
							img: require('../../assets/leafOn.png'),
							width: 40,
							height: 40
						}
					}
				],
				edges: [
					{ id: 'edge0', source: 'node0', target: 'node1', style: {stroke: 'red', lineWidth: 1}, type: 'flow-warn-edge'},
					// { id: 'edge1', source: 'node1', target: 'node3'},
					{ id: 'edge5', source: 'node3', target: 'node1', type: 'flow-info-edge', number: 5},
					{ id: 'edge6', source: 'node3', target: 'node1'},
					{ id: 'edge2', source: 'node2', target: 'node4'},
					{ id: 'edge3', source: 'node1', target: 'node6'},
					{ id: 'edge4', source: 'node2', target: 'node3'}
				],
				groups: [
					{
						id: 'group1',
						title: {
							text: 'group1'
						}
					},
					{
						id: 'group2',
						title: {
							text: 'group2'
						}
					},
					{
						id: 'group3',
						title: {
							text: 'group3'
						}
					},
				]
			}
		}
	},
	mounted () {
		const config = {
			defaultEdge: {
				type: 'flow-edge',
				style: {
					stroke: '#888',
					lineWidth: 2
				}
			},
			layout: {}
		}
		setTimeout(() => {
			// this.data = topoData
			this.network = new GTopo('#mountNode', config)
			this.network.renderData(this.data)
			this.network.getNodePosition()
			// this.network.handleEvent('node', 'click', item => {
			// 	console.log(item)
			// })
			// this.network.handleEvent('edge', 'contextmenu', item => {
			// 	console.log(item)
			// })
			// this.network.handleEvent('canvas', 'contextmenu', item => {
			// 	console.log(item)
			// })
			// this.network.handleEvent('node', 'dragend', evt => {
			// 	const { _cfg } = evt.item;
			// 	const { id, model } = _cfg;
			// 	this.network.refreshPositions();
			// 	const {x,y} = model;
			// 	this.data.nodes = this.data.nodes.map(item => {
			// 		if (id === item.id) {
			// 			return Object.assign({}, {...item}, {x, y})
			// 		}
			// 		return {...item}
			// 	})
			// })
		}, 1000);

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