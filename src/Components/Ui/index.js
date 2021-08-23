import React, { useState, useEffect } from 'react'
import { initialMoney, Vendor } from '../../VendingMachine'
import { changes, products } from '../../VendingMachine/data'
import Product from '../Product'
import ProductSelection from '../ProductSelection'
import './style.css'


const vending = new Vendor(products, changes, initialMoney)

export default function Ui() {
  const [userChange, setUserChange] = useState([])
  const [row, setRow] = useState(null)
  const [col, setCol] = useState(null)
  const [money, setMoney] = useState(null)
  const [chosedProduct, setchosedProduct] = useState(null)
  const [totalProfit, setTotalProfit] = useState(null)


  const resetProduct = () => {
    setRow(null)
    setCol(null)
    setchosedProduct(null)
    setMoney('')
  }

  const showProduct = () => {
    if (!row || !col) {
      return alert('select product plz')
    }
    let Product = vending.getProduct(row, col)
    if (Product.quantity > 0) setchosedProduct(Product)
    else {
      setchosedProduct(false)
      setRow(null)
      setCol(null)
    }
  }

  const buy = (row, col, money) => {
    if (!row || !col) {
      return alert('select product plz')
    }
    let change = vending.buyProduct(row, col, money)
    setUserChange(change)
    setTotalProfit(vending.getProfit())
    resetProduct()
  }

  console.log(userChange)
  useEffect(() => {
    if (row && col) {
      showProduct()
      setMoney('')
    } else {
      return
    }
  }, [row, col])

  useEffect(() => {
    if (!Array.isArray(userChange)) {
      alert(`${userChange}`)
    } else {
      return
    }
  }, [userChange])

  return (
    <div className='ui'>
      <div className='products-countiner'>
        {
          vending.products.map((productsRow, i) => {
            return (
              <div className='products' key={i}>
                {
                  productsRow.map((productsCol, i) => <Product key={i} product={productsCol} />)
                }
              </div>

            )
          })
        }
      </div>

      <div className='output-countiner'>
        <div style={{ display: 'flex' }}>
          <div className='control'>
            {
              chosedProduct != null ? (chosedProduct ? <Product product={chosedProduct} /> : <p>there is no quantity </p>) : ''
            }
            {(!row || !col) && <ProductSelection setRow={setRow} setCol={setCol} row={row} col={col} setUserChange={setUserChange} />
            }      <input type='number' min='0' step='.1' value={money} onChange={(e) => setMoney(e.target.value)} />
            <button disabled={!vending.isValidMoney(money) || !chosedProduct} onClick={() => buy(row, col, money)} >
              buy
            </button>
            <p>accepted money 10c, 20c, 50c, 1$, 20$ and 50$</p>
          </div>

          <div className='changes'>
            {
              userChange?.length > 1 ?
                (<>
                  <h5> this is your changes </h5>
                  {userChange.map((change, i) => <p key={i} >{change}</p>)
                  }
                </>
                ) : (<h5>there is no changes</h5>)
            }
          </div></div>
        {
          totalProfit &&
          <p className='profit'>Profit: ${totalProfit}</p>
        }
      </div>
    </div >
  )
}
