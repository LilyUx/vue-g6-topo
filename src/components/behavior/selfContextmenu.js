import G6 from '@antv/g6'

G6.registerBehavior('self-contextmenu', {
	getDefaultCfg() {
		return {
			contextMenu: {
				canvas: ['add-node', 'add-edge'],
				node: ['update', 'delete'],
				edge: ['update', 'delete']
			}
		};
	},
	getEvents() {
		return {
			'canvas:contextmenu': 'onCanvasContextmenu',
			'node:contextmenu': 'onNodeContextmenu',
			'edge:contextmenu': 'onEdgeContextmenu'
		}
	},
	onCanvasContextmenu(evt) {
		// TODO
		console.log(this.contextMenu)
		console.log(evt)
	},
	onEdgeContextmenu() {
		// TODO
	},
	onNodeContextmenu() {
		// TODO
	},
	showContextMenu() {

	},
	createContext() {

	},
	hideContextMenu() {

	},
})