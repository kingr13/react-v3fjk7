import React, { useState, useCallback } from "react"

import Numb from './Numb'
import Graphic from './Graphic'

export default function App() {
  const [numb, setNumb] = useState(0)

  const handleUpdateNumb = useCallback((val) => function() {setNumb(val)})
  
  return (<>
    <Numb numb={numb} onUpdateNumb={handleUpdateNumb} />
    <Graphic numb={numb} />
  </>)
}
