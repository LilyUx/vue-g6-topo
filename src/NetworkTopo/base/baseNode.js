const baseNode = {
	type: 'circle',
	size: 60,
	icon: {
		show: true,
		img: require('../../assets/leafOn.png'),
		width: 40,
		height: 40
	},
	labelCfg: {
		position: 'bottom',
		offset: 5
	}
}

const baseNodeStateStyles = {
	hover: {                // hover 状态为 true 时的样式
		fill: '#d3adf7'
	},
	running: {              // running 状态为 true 时的样式
		stroke: 'steelblue'
	}
}

export {
	baseNode,
	baseNodeStateStyles
};