import React from 'react'

function Numb({ numb, onUpdateNumb }) {
  return (<div>
    <strong>{numb}: </strong>
    <button onClick={onUpdateNumb(numb + 1)}>+</button>
    <button onClick={onUpdateNumb(numb - 1)}>-</button>
  </div>)
}

export default Numb