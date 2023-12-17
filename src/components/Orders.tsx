//@ts-nocheck
import "../styles/orders.scss"

const Orders = ({orders}) => {
  console.log(orders)

  return (
    <div className="orders">
      <div>
        <h2>Your Orders</h2>
        <p>{orders ? "" : "Looks like you haven't placed an order."}</p>

        <div className="order">
          <div className="order-title">
            <p>Order Placed </p>
            {/* <p>Total: </p> */}
          </div>
            {
              orders.map(item => (
                <div key={item.id} className="ordered-items">
                  <img src={item.imgSrc} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>Price: ${(item.price / 100).toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>                 
              ))
            }
        </div>  

      </div>
    </div>
  )
}

export default Orders