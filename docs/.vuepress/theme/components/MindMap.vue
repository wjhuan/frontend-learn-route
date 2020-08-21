<template>
  <div id="decisionTree" ref="wrapperElement" class="wrapper">
    <div class="topContaner">
      <div class="title" @click="scrollToCanvas">
        思维导图
      </div>
    </div>
    <div class="contentWrapper" :style="{ height: heightStates.height }">
      <div class="rightbottom" />
      <div class="content">
        <div key="block" class="lefttop">
          <div ref="element" class="mountNode"></div>
          <a
            href="https://github.com/antvis/G6"
            target="_blank"
            class="canvasDescription"
          >
            Powered by G6
          </a>
          <div
            :style="{ display: screenStates.fullscreenDisplay }"
            @click="handleFullScreen"
            class="fullscreenExitIcon screenButton"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import G6 from '@antv/g6/es'
import { CKBJson } from '@antv/knowledge'
import uniqueId from '@antv/util/lib/unique-id'
import clone from '@antv/util/lib/clone'
import { transform } from '@antv/matrix-util';

let ckbData = CKBJson('zh-CN')
const animateShapes = []
const lightColors = [
  '#FFC9E3',
  '#7CDBF2',
  '#5FE1E7',
  '#A1E71D',
  '#FFE269',
  '#FFA8A8',
  '#FFA1E3',
  '#A7C2FF',
]
const darkColors = [
  '#FF68A7',
  '#5B63FF',
  '#44E6C1',
  '#1BE6B9',
  '#FF5A34',
  '#F76C6C',
  '#AE6CFF',
  '#7F86FF',
]

const shadowColors = [
  '#f89fc9',
  '#9ba9ff',
  '#56d4d1',
  '#87e240',
  '#ffbe81',
  '#ffb0b0',
  '#d19fff',
  '#b4bfff',
]

const gColors = []
const shadowColorMap = {}
lightColors.forEach((lcolor, i) => {
  gColors.push('l(0) 0:' + lcolor + ' 1:' + darkColors[i])
  shadowColorMap[lcolor] = shadowColors[i]
})

const layoutCfg = {
  type: 'compactBox',
  direction: 'LR',
  getHeight: (d) => {
    if (d.tag === 'purpose') {
      return 72
    }
    return 24
  },
  getWidth: (d) => {
    if (d.id === 'antv') {
      return 10
    }
    return 16
  },
  getVGap: () => {
    return 0
  },
  getHGap: (d) => {
    if (d.id === 'antv') {
      return 160
    }
    return 140
  },
}
export default {
  name: 'MindMap',
  data() {
    return {
      graph: null,
      decoGraph: null,
      data_: null,
      purposeMap: {},
      aftercollapse: false,
      graphAnimating: false,
      CANVAS_WIDTH: 1320,
      CANVAS_HEIGHT: 696,
      collapseExpandCfg: {},
    //   animateShapes: [],
      heightStates: {
        height: '800px',
      },
      screenStates: {
        fullscreenDisplay: 'block',
        exitfullscreenDisplay: 'none',
      },
    }
  },
  created() {
    //   console.log(ckbData)
    this.register()
    this.createCollapseExpandCfg()
  },
  mounted() {
    this.createTreeGraph()
  },
  methods: {
    loadData(data) {
      this.graph.data(data)
      this.graph.render()
    },
    register() {
      this.data_ = this.processData(ckbData)
      let _self = this
      G6.registerEdge(
        'tree-edge',
        {
          afterDraw(cfg, group) {
            const keyShape = group.get('children')[0]
            const sourceModel = cfg.source.getModel()
            if (sourceModel.tag === 'purpose') {
              keyShape.attr({
                opacity: 0,
              })
              keyShape.animate(
                (ratio) => {
                  return {
                    opacity: ratio,
                  }
                },
                {
                  duration: 300,
                  delay: 100,
                }
              )
            }
          },
        },
        'cubic-horizontal'
      )
      G6.registerNode('bubble', {
        drawShape(cfg, group) {
          const hwRatio = 0.31
          const r = cfg.size / 2
          // a circle by path
          const path = [
            ['M', -r, 0],
            ['C', -r, r / 2, -r / 2, r, 0, r],
            ['C', r / 2, r, r, r / 2, r, 0],
            ['C', r, -r / 2, r / 2, -r, 0, -r],
            ['C', -r / 2, -r, -r, -r / 2, -r, 0],
            ['Z'],
          ]
          const keyShape = group.addShape('path', {
            attrs: {
              x: 0,
              y: 0,
              path,
              fill: cfg.color || 'steelblue',
              shadowColor: shadowColorMap[cfg.color.split(' ')[1].substr(2)],
              shadowBlur: 0,
              matrix: [1, 0, 0, 0, hwRatio, 0, 0, 0, 1],
            },
          })
        //   console.log(this)
          animateShapes.push(keyShape)

          let maskMatrix = [1, 0, 0, 0, hwRatio + 0.05, 0, 0, 0, 1]
          maskMatrix = transform(maskMatrix, [
            ['r', 0.13 * (Math.random() * 2 - 1)],
          ])
          group.addShape('path', {
            attrs: {
              x: 0,
              y: 0,
              path,
              opacity: 0.15,
              fill: cfg.color || 'steelblue',
              matrix: maskMatrix,
            },
          })

          const height = 0.31 * 2 * r + 30
          const width = 2 * r + 20
          const rect = group.addShape('rect', {
            attrs: {
              x: -width / 2,
              y: -height / 2,
              width,
              height,
              fill: '#fff',
              opacity: 0,
              cursor: 'pointer',
            },
            className: 'bubble-bbox-mask',
          })
          return rect
        },
        afterDraw(cfg, group) {
          const self = this
          const r = cfg.size / 2

          if (cfg.label) {
            const labelCfg = cfg.labelCfg || {}
            const labelStyle = labelCfg.style || {}
            const label = group.addShape('text', {
              attrs: {
                text: cfg.label,
                x: 0,
                y: 0,
                fontSize: labelStyle.fontSize || 14,
                fontWeight: labelStyle.fontWeight || 'bold',
                fill: labelStyle.fill || '#fff',
                cursor: 'pointer',
              },
            })
            const labelBBox = label.getBBox()
            label.attr({
              x: -labelBBox.width / 2,
              y: labelBBox.height / 2,
            })
          }

          const spNum = 10 // split points number
          const directions = [],
            rs = []
          const floatRange = 0.1
          const speedConst = 0.0015
          self.changeDirections(spNum, directions)
          for (let i = 0; i < spNum; i++) {
            const rr = r + directions[i] * (Math.random() * r * speedConst) // +-r/6, the sign according to the directions
            if (rs[i] < (1 - floatRange) * r) rs[i] = (1 - floatRange) * r
            else if (rs[i] > (1 + floatRange) * r) rs[i] = (1 + floatRange) * r
            rs.push(rr)
          }
          const children = group.get('children')
          const bubble = children[0]
          bubble.animate(
            (ratio) => {
              const path = self.getBubblePath(
                r,
                spNum,
                directions,
                rs,
                floatRange,
                speedConst
              )
              return {
                path,
              }
            },
            {
              repeat: true,
              duration: 10000,
              delay: Math.random() * 1000,
            }
          )
        },
        changeDirections(num, directions) {
          for (let i = 0; i < num; i++) {
            if (!directions[i]) {
              const rand = Math.random()
              const dire = rand > 0.5 ? 1 : -1
              directions.push(dire)
            } else {
              directions[i] = -1 * directions[i]
            }
          }
          return directions
        },
        getBubblePath(r, spNum, directions, rs, floatRange, speedConst) {
          const path = []
          const cpNum = spNum * 2 // control points number
          const unitAngle = (Math.PI * 2) / spNum // base angle for split points
          let angleSum = 0
          let spAngleOffset = 0 // split point's offset
          const sps = []
          const cps = []
          for (let i = 0; i < spNum; i++) {
            const speed = speedConst * Math.random()
            rs[i] = rs[i] + directions[i] * speed * r // +-r/6, the sign according to the directions
            if (rs[i] < (1 - floatRange) * r) {
              rs[i] = (1 - floatRange) * r
              directions[i] = -1 * directions[i]
            } else if (rs[i] > (1 + floatRange) * r) {
              rs[i] = (1 + floatRange) * r
              directions[i] = -1 * directions[i]
            }
            const spX = rs[i] * Math.cos(angleSum)
            const spY = rs[i] * Math.sin(angleSum)
            sps.push({ x: spX, y: spY })
            for (let j = 0; j < 2; j++) {
              const cpAngleRand = unitAngle / 3
              const cpR = rs[i] / Math.cos(cpAngleRand)
              const sign = j === 0 ? -1 : 1
              const x = cpR * Math.cos(angleSum + sign * cpAngleRand)
              const y = cpR * Math.sin(angleSum + sign * cpAngleRand)
              cps.push({ x, y })
            }
            spAngleOffset = (Math.random() * unitAngle) / 3 - unitAngle / 6
            angleSum += unitAngle
          }
          path.push(['M', sps[0].x, sps[0].y])
          for (let i = 1; i < spNum; i++) {
            path.push([
              'C',
              cps[2 * i - 1].x,
              cps[2 * i - 1].y,
              cps[2 * i].x,
              cps[2 * i].y,
              sps[i].x,
              sps[i].y,
            ])
          }
          path.push([
            'C',
            cps[cpNum - 1].x,
            cps[cpNum - 1].y,
            cps[0].x,
            cps[0].y,
            sps[0].x,
            sps[0].y,
          ])
          path.push(['Z'])
          return path
        },
        update(cfg, group) {},
        setState(name, value, item) {
          if (name === 'highlight') {
            const group = item.get('group')
            const keyShape = group.get('children')[0]
            if (value) {
              keyShape.animate(
                {
                  shadowBlur: 30,
                },
                {
                  duration: 150,
                  callback: () => {
                    _self.graphAnimating = false
                  },
                }
              )
            } else {
              keyShape.animate(
                {
                  shadowBlur: 0,
                },
                {
                  duration: 150,
                  callback: () => {
                    _self.graphAnimating = false
                  },
                }
              )
            }
          }
        },
      })
    },
    // 处理数据
    processData(data) {
      const root = {
        id: 'antv',
        children: [],
        type: 'image',
        shape: 'image',
        size: 66,
        img: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
        anchorPoints: [
          [-0.1, 0.5],
          [1.1, 0.5],
        ],
        tag: 'root',
      }
      const bubbleCfg = {
        collapsed: true,
        type: 'bubble',
        shape: 'bubble',
        tag: 'purpose',
        size: 165,
        anchorPoints: [
          [-0.08, 0.5],
          [1.1, 0.5],
        ],
        labelCfg: {
          style: {
            fontSize: 16,
            fill: '#fff',
            fontWeight: 350,
          },
        },
      }
      this.purposeMap = {}
      let purposeCount = 0
      const relationMidPoints = []
      Object.keys(data).forEach((chartId) => {
        const chart = data[chartId]
        // remove the dulplicated parent-child tag such as Relation and Hierarchy
        let childExist = false,
          parentExist = false,
          parentIdx = -1
        chart.purpose.forEach((pur, i) => {
          if (pur === '层级' || pur === '流向') {
            childExist = true
          } else if (pur === '关系') {
            parentExist = true
            parentIdx = i
          }
        })
        if (childExist && parentExist) {
          delete chart.purpose[parentIdx]
        }
        chart.purpose.forEach((pur) => {
          if (pur === '聚类' || !pur) return // temperal
          if (pur === '层级' || pur === '流向') {
            if (!this.purposeMap['关系']) {
              purposeCount++
              const purpose = {
                id: '关系',
                label: '关系',
                children: [],
                color: gColors[purposeCount % gColors.length],
                gradientColor: gColors[purposeCount % gColors.length],
                ...bubbleCfg,
                labelCfg: bubbleCfg.labelCfg,
              }
              root.children.push(purpose)
              this.purposeMap['关系'] = purpose
            }
            if (!this.purposeMap[pur]) {
              const color = this.purposeMap['关系'].color
                .split(' ')[2]
                .substr(2)
              const midPoint = {
                id: pur,
                type: 'midpoint',
                tag: 'midpoint',
                size: 6,
                label: pur,
                color,
                gradientColor: this.purposeMap['关系'].color,
                children: [],
                style: {
                  fill: '#fff',
                  stroke: '#d8d8d8',
                  lineWidth: 2,
                },
                labelCfg: {
                  position: 'right',
                  offset: 9,
                  style: {
                    fill: color,
                    fontSize: 14,
                  },
                },
                anchorPoints: [
                  [-0.5, 0.5],
                  [9, 0.5],
                ],
              }
              relationMidPoints.push(midPoint)
              this.purposeMap[pur] = midPoint
            }
          }

          if (!this.purposeMap[pur]) {
            purposeCount++
            const purpose = {
              id: pur,
              label: pur,
              children: [],
              gradientColor: gColors[purposeCount % gColors.length],
              color: gColors[purposeCount % gColors.length],
              ...bubbleCfg,
              labelCfg: bubbleCfg.labelCfg,
            }
            root.children.push(purpose)
            this.purposeMap[pur] = purpose
          }
          const leaf = this.processLeaf(chart, this.purposeMap[pur])
          this.purposeMap[pur].children.push(leaf)
        })
      })
      relationMidPoints.forEach((midpoint) => {
        this.purposeMap['关系'].children.push(midpoint)
      })
      Object.keys(this.purposeMap).forEach((purposeName) => {
        const purpose = this.purposeMap[purposeName]
        const children = purpose.children
        let childNum = children.length
        children.forEach((child) => {
          const cc = child.children
          if (cc) {
            childNum += cc.length
          }
        })
        purpose.label = `${purpose.label} (${childNum})`
      })
      return root
    },
    processLeaf(chart, parent) {
      const cloneChart = clone(chart)
      let color = parent.color
      if (color.split(' ').length > 2) {
        color = color.split(' ')[2].substr(2)
      }
      const cfg = {
        id: `${cloneChart.id}-${uniqueId()}`,
        shape: 'leaf',
        type: 'leaf',
        label: chart.name,
        tag: 'leaf',
        size: 6,
        parentId: parent.id,
        parentColor: parent.gradientColor,
        anchorPoints: [
          [-0.5, 0.5],
          [1.1, 0.5],
        ],
        labelCfg: {
          position: 'right',
          offset: 9,
          style: {
            fill: color,
            fontSize: 14,
          },
        },
        style: {
          fill: '#fff',
          stroke: '#d8d8d8',
          lineWidth: 2,
          opacity: 0,
        },
      }
      return Object.assign({}, cloneChart, cfg)
    },
    createCollapseExpandCfg() {
      this.collapseExpandCfg = {
        type: 'collapse-expand',
        shouldBegin: (e) => {
          const model = e.item.getModel()
          if (this.graphAnimating) return false

          if (model.tag === 'purpose') {
            animateShapes.forEach((shape) => {
              if (shape && !shape.destroyed) shape.pauseAnimate()
            })
            this.graphAnimating = true
            return true
          }
          return false
        },
        onChange: (item, collapsed) => {
          const model = item.getModel()
          const itemId = model.id
          const nodes = this.graph.getNodes()
          nodes.forEach((node) => {
            const nodeModel = node.getModel()
            // collapse others
            if (nodeModel.tag === 'purpose' && nodeModel.id !== itemId)
              nodeModel.collapsed = true
            if (nodeModel.tag === 'leaf' || nodeModel.tag === 'midpoint') {
              this.fadeOutItem(node)
            }
          })
          const edges = this.graph.getEdges()
          edges.forEach((edge) => {
            const targetNode = edge.get('targetNode')
            if (
              targetNode.getModel().tag === 'leaf' ||
              targetNode.getModel().tag === 'midpoint'
            ) {
              this.fadeOutItem(edge)
            }
          })
        },
      }
    },
    createTreeGraph() {
      this.graph = new G6.TreeGraph({
        container: this.$refs.element,
        width: this.CANVAS_WIDTH,
        height: this.CANVAS_HEIGHT * 2,
        layout: layoutCfg,
        modes: {
          default: [
            {
              type: 'drag-canvas',
              direction: 'y',
            },
            this.collapseExpandCfg,
          ], //'double-finger-drag-canvas',
        },
        defaultEdge: {
          type: 'tree-edge',
          color: '#D8D8D8',
          sourceAnchor: 1,
          targetAnchor: 0,
        },
        animate: true,
        animateCfg: {
          duration: 300,
          easing: 'easeQuadInOut',
          callback: () => {
            this.graphAnimating = false
          },
        },
      })
      console.log(this.data_)
      this.loadData(this.data_)
    //   console.log(this.graph)
    },
    fadeOutItem(item) {
      const nodeGroup = item.get('group')
      const children = nodeGroup.get('children')
      children.forEach((child, i) => {
        child.animate(
          (ratio) => {
            let opacity = 1 - 3 * ratio
            if (opacity < 0) opacity = 0
            return {
              opacity,
            }
          },
          {
            duration: 500,
            repeat: false,
          }
        )
      })
    },
    scrollToCanvas() {
      const element = document.getElementById('decisionTree')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    handleFullScreen() {
      const fullscreenDom = this.$refs.wrapperElement
      if (fullscreenDom) {
        this.screenStates.fullscreenDisplay = 'none'
        this.screenStates.exitfullscreenDisplay = 'block'
        if (fullscreenDom.requestFullscreen) {
          fullscreenDom.requestFullscreen()
        } else if (fullscreenDom.mozRequestFullscreen) {
          fullscreenDom.mozRequestFullscreen()
        } else if (fullscreenDom.msRequestFullscreen) {
          fullscreenDom.msRequestFullscreen()
        } else if (fullscreenDom.webkitRequestFullscreen) {
          fullscreenDom.webkitRequestFullscreen()
        }
        if (this.graph && window.screen) {
          graph.changeSize(window.screen.width, window.screen.height * 2)
          decoGraph.changeSize(window.screen.width, window.screen.height * 2)
          loadData(data)
          const group = graph.get('group')
          const graphBBox = group.getBBox()
          graph.moveTo(Math.abs(graphBBox.x) + 200, Math.abs(graphBBox.y) + 60)
        }
      }
    },
  },
}
</script>

<style lang="less">
@import '../styles/palette.less';
.wrapper {
  background: #f0f5fa;
  .topContaner {
    margin-left: 8.05%;
    width: 91.95%;
    width: 1440px;
    max-width: calc(100% - 120px);
    margin-left: auto;
    margin-right: auto;
    .title {
      margin-left: 4.06%;
      font-size: 2.714em;
      color: #000;
      margin-bottom: 0;
      font-weight: 500;
      position: relative;
      height: min-content;
      cursor: pointer;
    }
  }
  .contentWrapper {
    display: flex;
    margin: auto;
    margin-top: 50px;
    position: relative;
    flex-direction: column;
    padding: 0;
    background: #f0f5fa;
    overflow-x: hidden;
    transition: all 0.3s;
    .rightbottom {
      background: linear-gradient(130deg, #aa6aff 40%, #706dff);
      width: 100%;
      height: 80%;
      right: 0;
      margin-top: 48px;
      position: absolute;
    }
    .content {
      width: 95.8%;
      height: 100%;
      margin-left: 0;
      margin-bottom: 5%;
      position: relative;
      .lefttop {
        background: #fff;
        width: 100%;
        height: 85%;
        position: relative;
        box-shadow: -5px 5px 15px rgba(0, 0, 0, 0.1);
        overflow-y: hidden;
        .mountNode {
          background: #fff;
          width: 100%;
          height: 100%;
          canvas {
            position: absolute;
          }
        }
        .canvasDescription {
          color: rgba(0, 0, 0, 0.2);
          position: absolute;
          bottom: 8px;
          right: 20px;
          &:hover {
            color: rgba(0, 0, 0, 1);
          }
        }
        .screenButton {
          opacity: 0.1;
          background: #fff;
          width: 32px;
          height: 32px;
          transition: all 0.3s;
          top: 16px;
          right: 16px;
          position: absolute;
          cursor: pointer;
          &:hover {
            opacity: 0.6;
          }
          .screenIcon {
            opacity: 0.25;
            font-size: 32px;
          }
        }
      }
    }
  }
}
</style>
