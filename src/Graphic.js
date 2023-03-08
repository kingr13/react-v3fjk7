import React, { useState, useRef, useEffect } from 'react'
import mx from 'mxgraph'

const MX = new mx()

function Graphic({ numb }) {
  const ref = useRef()
  const outlineRef = useRef()
  const [graphic, setGraphic] = useState(null)
  const [hasOutline, setHasOutline] = useState(false)

  const main = () => {
    const rubber = new MX.mxRubberband(graphic)
    const parent = graphic.getDefaultParent()

    if (!rubber) return false

    graphic.setPanning(true)
    graphic.getModel().beginUpdate()
    try {
      const arr = Array.from(Array(100 + numb).keys())

      let xIndex = 0
      let yIndex = 0

      let edges = []
      let cells = []

      arr.forEach((a, index) => {
        const newIndex = index + 1
        const rest = newIndex%20
        const x = ((5 + 15) * xIndex)
        const y = ((5 + 15) * yIndex)
        const cellId = `id-${newIndex}`

        xIndex = rest === 0 ? 0 : xIndex + 1
        yIndex = rest === 0 ? (index/20) : yIndex

        const vertex = graphic.insertVertex(parent, cellId, a, x, y, 15, 10)
        const cell = { [cellId]: vertex }
        cells = {...cells, ...cell}
        if (index) edges = [...edges, { from: `id-${index}`, to: cellId }]
      })

      edges.forEach((e) => {
        const edge = graphic.insertEdge(parent, null, '', cells[e.from], cells[e.to])
      })

      const numbVertex = graphic.insertVertex(parent, null, numb, 5, 125, 30, 20)
    } catch (e) {
      console.log('error', e)
    } finally {
      graphic.getModel().endUpdate()
    }
  }

  useEffect(() => {
    console.log('init graphic')
    setGraphic(new MX.mxGraph(ref.current))
  }, [])

  useEffect(() => {
    if (graphic) {
      console.log('there is graphic')
      graphic.removeCells(graphic.getChildVertices(graphic.getDefaultParent()))
      main()
    }
  }, [graphic, numb])

  useEffect(() => {
    if (graphic && !hasOutline) {
      const outln = new MX.mxOutline(graphic, outlineRef.current)
      if (!outln) console.log('There is not outline')
      setHasOutline(true)
    }
  }, [graphic, hasOutline])

  return (<>
    <h1>Numb: {numb}</h1>
    <div id="graphic" ref={ref} />
    <div id="outline" ref={outlineRef} />
  </>)
}

export default Graphic