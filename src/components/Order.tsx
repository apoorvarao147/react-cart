//@ts-nocheck
import '../styles/order.scss'

function Order({sum, priceShipping, total, totalTax, orderTotal}) {
  console.log(sum, priceShipping, total, totalTax, orderTotal)
  return (
      <div className="order-summary">
            <h3>Order Summary</h3>
            <div>
              <div>
                <p>Items (5):</p>
                <p>${sum}</p>
              </div>
              <div>
                <p>Shipping & handling:</p>
                <p>${priceShipping}</p>
              </div>
              <div className="order-tax">
                <p>Total before tax:</p>
                <p>${total}</p>
              </div>
              <div>
                <p>Estimated tax (13%):</p>
                <p>${totalTax}</p>
              </div>
              
              <div className="order-total">
              <h2>Order total:</h2>
              <h2>${orderTotal}</h2>
              </div>

              <button>Place your order</button>
            </div>
          </div>
  )
}

export default Order