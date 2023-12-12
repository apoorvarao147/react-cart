//@ts-nocheck
import '../styles/cart.scss';
import Order from './Order';

function Cart({cart}) {

  const priceShipping = 4.99
  const priceTax = 0.10

  let sum = 0
  for (let item of cart) {
    let price = Number((item.price/100).toFixed(2))
    sum = sum + price   
  }

  let total = sum + priceShipping
  let totalTax = total * priceTax
  let orderTotal = total + totalTax
  orderTotal = orderTotal.toFixed(2)
  sum = sum.toFixed(2)
  total = total.toFixed(2)
  totalTax = totalTax.toFixed(2)

  console.log(orderTotal)

  return (
    <div id="/cart" className="cart-heading">
      <h2>Shopping Cart (5 items)</h2>

      <div className="cart">
        <h4>Review your order</h4>

        <div className="orders">
          <div className="order-items">
            {
              cart.map(item => (
                <div className="item">
                  <img src={item.imgSrc} alt={item.name} />
                  <div className="item-right">
                    <h3>{item.name}</h3>
                    <h4>${(item.price/100).toFixed(2)}</h4>                   
                      <p>Quantity: 1</p> 
                      <div className="quantity">
                        <button>Update</button>
                        <button>Delete</button>
                      </div>                   
                  </div>                 
                </div>
              ))
            }
          </div>
        
        <Order sum={sum} priceShipping={priceShipping} total={total} totalTax={totalTax} orderTotal={orderTotal} />

        </div>  
      </div>
         
    </div>
  )
}

export default Cart