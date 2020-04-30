import G6 from '@antv/g6'
import './animate/zoomNode.js'
import './animate/flowEdge.js'
import './animate/warningNode.js'
import './behavior/selfContextmenu.js'

import {baseNode, baseNodeStateStyles} from './base/baseNode'
import {baseEdge, baseEdgeStateStyles} from './base/baseEdge'
import {baseLayout} from './base/baseLayout'
import {baseModes} from './base/baseModes'


/**
 * 实例化 Minimap 插件
 */
const minimap = new G6.Minimap({
	size: [ 100, 100 ],
	className: "minimap",
	type: 'delegate'
});

/**
 * 实例化 Grid 插件
 */
const grid = new G6.Grid();

class NTopo {
	//  初始化dom对象
	constructor(dom, config = {}) {
		this.container = document.querySelector(dom);
		this.width = Number.parseFloat(getComputedStyle(this.container)['width']);
		this.height = Number.parseFloat(getComputedStyle(this.container)['height']);
		this.init(config);
	}

	// init
	init(config) {
		this.graph = new G6.Graph({
			container: this.container,
			width: this.width,
			height: this.height,
			renderer: config.renderer || 'svg', // 渲染方式，支持canvas和svg，默认svg
			fitView: config.fitView || false,
			fitViewPadding: config.fitViewPadding || 20,
			groupByTypes: config.config || true,
			autoPaint: config.autoPaint || true,
			minZoom: config.minZoom || 0.2,
			maxZoom: config.maxZoom || 10,
			pixelRatio: config.pixelRatio || 1.0,
			animate: config.animate || false,
			defaultNode: config.defaultNode || baseNode, // {} 默认
			defaultEdge: config.defaultEdge || baseEdge, // {} 默认
			nodeStateStyles: config.nodeStateStyles || baseNodeStateStyles, // {} 默认
			edgeStateStyles: config.edgeStateStyles || baseEdgeStateStyles, // {} 默认
			layout: config.edgeStateStyles || baseLayout, // {} 默认布局
			modes: config.modes || baseModes,
			plugins: config.plugins || [ minimap, grid ] // 数组, []表示没有默认，默认有minimap, grid
		});
	}

	// 读取数据并渲染图
	renderData(data) {
		// 读取数据
		this.graph.data(data);
		// 渲染图
		this.graph.render();
	}

	// 更新数据
	updateData(data) {
		this.graph.changeData(data);
	}

	// 刷新数据
	refreshData() {
		this.graph.refresh();
	}

	// 更新layout布局
	updateLayout(cfg) {
		this.graph.updateLayout(cfg)
	}

	// 清除画布元素
	clear() {
		this.graph.clear()
	}

	// 销毁画布
	destory() {
		this.graph.destroy()
	}

	addBehaviors(behaviors, modes) {
		this.graph.addBehaviors(behaviors, modes)
	}

	removeBehaviors(behaviors, modes) {
		this.graph.removeBehaviors(behaviors, modes)
	}

	changeSize(width, height) {
		this.graph.changeSize(width, height)
	}

	addPlugin(plugin) {
		this.graph.addPlugin(plugin)
	}
	
	removePlugin(plugin) {
		this.graph.removePlugin(plugin)
	}

	downloadImage(name = 'image') {
		this.graph.downloadImage(name)
	}

	setItemState(item, state, enabled) {
		this.graph.setItemState(item, state, enabled)
	}

	clearItemStates(item, states) {
		this.graph.clearItemStates(item, states)
	}

	// 节点的操作
	handleCanvas(name, cb) {
		if (!name) return
		const eventHandle = {
			click: 'canvas:click',
			dbclick: 'canvas:dblclick',
			contextmenu: 'canvas:contextmenu',
		}
		const targetEvent = eventHandle[name]
		if (targetEvent) {
			this.graph.on(targetEvent, evt => {
				const { item } = evt
				cb(item)
				// this.graph.setItemState(item, 'hover', false)
			})
		} else {
			console.warn('没有这个事件')
		}
	}

	// 节点的操作
	handleNode(name, cb) {
		if (!name) return
		const eventHandle = {
			click: 'node:click',
			dbclick: 'node:dblclick',
			mouseenter: 'node:mouseenter',
			mouseout: 'node:mouseout',
			contextmenu: 'node:contextmenu',
			drag: 'node:drag',
			dragend: 'node:dragend'
		}
		const targetEvent = eventHandle[name]
		if (targetEvent) {
			this.graph.on(targetEvent, evt => {
				const { item } = evt
				cb(item)
				// this.graph.setItemState(item, 'hover', false)
			})
		} else {
			console.warn('没有这个事件')
		}
	}

	// 连线的操作
	handleEdge(name, cb) {
		if (!name) return
		const eventHandle = {
			click: 'edge:click',
			dbclick: 'edge:dblclick',
			mouseenter: 'edge:mouseenter',
			mouseout: 'edge:mouseout',
			contextmenu: 'edge:contextmenu',
			drag: 'edge:drag',
			dragend: 'edge:dragend'
		}
		const targetEvent = eventHandle[name]
		if (targetEvent) {
			this.graph.on(targetEvent, evt => {
				const { item } = evt
				cb(item)
				// this.graph.setItemState(item, 'hover', false)
			})
		} else {
			console.warn('没有这个事件')
		}
	}

	getNodePosition() {
		const nodes = this.graph.getNodes();
		console.log(nodes)
		const allNodesPosition = nodes.map(item => {
            const id = item._cfg.model.id;
            const x = item._cfg.model.x;
            const y = item._cfg.model.y;
            return {id, x, y};
		});
		console.log(allNodesPosition)
        return allNodesPosition;
	}
}

export default NTopo;