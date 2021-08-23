import React from 'react'

const ProductSelection = ({ row, col, setRow, setCol, setUserChange }) => {
  const selectRowCol = (e) => {
    if (!row) {
      setRow(e.target.value)
      setUserChange([])
      return
    }
    else if (!col) {
      setCol(e.target.value)
      return
    }
  }

  return (
    <div className='index-buttons'>
      {
        [1, 2, 3, 4, 5]
          .map((number, i) => <button
            key={i} value={number}
            onClick={selectRowCol} >{number}</button>)
      }
    </div>
  )
}

export default ProductSelection