const topoData = {
	nodes: [
		{
			id: 'node0',
			x: 300,
			y: 600,
			label: 'node0',
			type: 'zoom-animate-node',
			icon: {
				show: true,
				img: require('../src/assets/leafOn.png'),
				width: 40,
				height: 40
			}
		},
		{
			id: 'node1',
			x: 500,
			y: 200,
			label: 'node1',
			type: 'warning-node',
			icon: {
				show: true,
				img: require('../src/assets/hostOn.png'),
				width: 40,
				height: 40
			}
		},
		{
			id: 'node2',
			x: 750,
			y: 150,
			label: 'node2',
			icon: {
				show: true,
				img: require('../src/assets/lbassOn.png'),
				width: 40,
				height: 40
			}
		},
		{
			id: 'node3',
			x: 250,
			y: 250,
			label: 'node3',
			icon: {
				show: true,
				img: require('../src/assets/gatewayOn.png'),
				width: 40,
				height: 40
			}
		},
		{
			id: 'node4',
			x: 850,
			y: 750,
			label: 'node4',
			icon: {
				show: true,
				img: require('../src/assets/firewallOn.png'),
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
				img: require('../src/assets/spineOn.png'),
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
				img: require('../src/assets/leafOn.png'),
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
				img: require('../src/assets/spineOn.png'),
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
				img: require('../src/assets/firewallOn.png'),
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
				img: require('../src/assets/leafOn.png'),
				width: 40,
				height: 40
			}
		}
	],
	edges: [
		{ id: 'edge0', source: 'node0', target: 'node1', style: {stroke: 'red', lineWidth: 1}},
		{ id: 'edge1', source: 'node1', target: 'node3'},
		{ id: 'edge2', source: 'node2', target: 'node4'},
		{ id: 'edge3', source: 'node1', target: 'node6'},
		{ id: 'edge4', source: 'node2', target: 'node3'}]
}

export {
	topoData
}