//@ts-nocheck
import {Link} from 'react-router-dom'
import "../styles/orders.scss"


const Orders = ({orders}) => {
  return (
    <div className="orders">
      <div>
        <h2>Your Orders</h2>
        {
        orders.length > 0 ? "" : 
        <>
          <p>Looks like you haven't placed an order.</p>
          <Link to={"/"}><button>View products</button></Link>
        </>
        }
       
          {
            orders.map((order, index) => (
                <div key={index} className="order">
                  <div className="order-title">
                      <p>Order Placed</p>
                  </div>                               
                  {
                    order.map(item => {
                      return (
                        <>
                          <div key={item.product.id} className="ordered-items">
                            <img src={item.product.url} alt={item.product.productName} />
                            <div>
                              <h3>{item.product.productName}</h3>
                              <p>Price: ${(item.product.price / 100).toFixed(2)}</p>
                              <p>Quantity: {item.quantity}</p>
                            </div>
                          </div>
                        </>
                      )
                    })}
                </div> 
              )
            )
          }
 

      </div>
    </div>
  )
}

export default Orders