/**
 * @module DevicePicMap
 * @description topo图中节点的类型，设备角色对应的topo图片资源和大小的map关系模块
 * @author Alan Chen
 * @since 2018/11/19
 */
export default {
    /**
     * @description 第一层key是topo图组件中根据设备返回数据自定义的type
     * @description 第二层key是设备返回数据中的deviceRole字段，odl定义
     * @param {Obejct} imgSrc 图片的名称，默认图片的前缀为assets文件夹下的image目录，不可修改。onStatus是在线状态，offStatus是离线状态
     * @param {Array} size 图片的大小，建议提供一个size，否则topo图插件会显示图片原本大小
     */
    device: {
        BorderLeaf: {
            imgSrc: {
                onStatus: 'leafOn.png',
                offStatus: 'leafOff.png'
            },
            size: [70, 50]
        },
        ServerLeaf: {
            imgSrc: {
                onStatus: 'leafOn.png',
                offStatus: 'leafOff.png'
            },
            size: [70, 50]
        },
        Spine: {
            imgSrc: {
                onStatus: 'spineOn.png',
                offStatus: 'spineOff.png'
            },
            size: [70, 70]
        },
        Gateway: {
            imgSrc: {
                onStatus: 'gatewayOn.png',
                offStatus: 'gatewayOff.png'
            },
            size: [70, 50]
        }
    },
    host: {
        imgSrc: {
            onStatus: 'hostOn.png',
            offStatus: 'hostOff.png'
        },
        size: [76, 55]
    },
    fireWall: {
        imgSrc: {
            onStatus: 'firewallOn.png',
            offStatus: 'firewallOff.png'
        },
        size: [60, 70]
    },
    loadBalance: {
        imgSrc: {
            onStatus: 'lbassOn.png',
            offStatus: 'lbassOff.png'
        },
        size: [70, 50]
    }
};