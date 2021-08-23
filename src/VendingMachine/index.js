
import { changes } from './data'

export class Vendor {
  constructor(products, changes, total) {
    this.products = products
    this.changes = changes
    this.init = total
    this.total = total
    this.card = 0
  }

  getProduct = (productRow, productCol) => {
    return this.products[productRow - 1][productCol - 1]
  }

  isValidMoney = (money) => {
    if (money < 1) money = Number(money).toFixed(1);
    let acceptedMoney = { 0.1: true, 0.2: true, 0.5: true, 1: true, 20: true, 50: true }
    if (acceptedMoney[money] == true) return true
    return false
  }

  buyProduct = (itemRow, itemCol, money) => {
    let product = this.products[itemRow - 1][itemCol - 1]
    let userChange = []

    if (product.price > money) {
      return alert(`${product.price - money}$ more money needed`)
    } else if (product.quantity === 0) {
      return 'No product atm sorry'
    }
    else {
      let cumulativeChange = money - product.price
      let machineCompare = money - product.price
      let backChange = 0

      let changeArr = JSON.parse(JSON.stringify(this.changes));
      let length = changeArr.length
      for (let i = length - 1; i >= 0; i--) {
        if ((changeArr[i].quantity >= 1) && (changeArr[i].equal <= cumulativeChange)) {
          backChange += changeArr[i].equal
          cumulativeChange = cumulativeChange - changeArr[i].equal

          userChange.push(changeArr[i].type)
          changeArr[i].quantity -= 1
          i++
        }
        if (cumulativeChange === 0) {
          break;
        }
      }

      if (machineCompare - Number(backChange.toFixed(1)) > 0) {
        return alert('sorry! no Enough changes in the machine 🙁')
      }

      product.quantity -= 1
      this.total += product.price
      this.changes = JSON.parse(JSON.stringify(changeArr))
    }

    for (let i = 0; i < this.changes.length; i++) {
      if (money === this.changes[i].equal) {
        this.changes[i].quantity += 1
      }
    }
    alert('done! take your changes')
    return userChange
  }

  buyByCard = (price) => {
    this.total += price
    return alert('done! take your snack')
  }

  getBalance = () => {
    return this.total
  }

  getChanges = () => {
    return this.changes
  }

  getProfit = () => {
    return this.total - this.init
  }

}



function total(changes) {
  let total = 0
  for (let i = 0; i < changes.length; i++) {
    total += changes[i].equal * changes[i].quantity
  }
  return total
}

export const initialMoney = total(changes)