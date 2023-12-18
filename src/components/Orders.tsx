//@ts-nocheck
import "../styles/orders.scss"

const Orders = ({orders}) => {

  return (
    <div className="orders">
      <div>
        <h2>Your Orders</h2>
        <p>{orders.length > 0 ? "" : "Looks like you haven't placed an order."}</p>

        <>         
            {
              orders.map((order,index) => {
                return (
                     <div className="order">
                      <div key={index} className="order-title">
                          <p>Order Placed</p>
                      </div>                               
                    {
                    order.map(item => {
                      return (
                        <>
                          <div key={item.id} className="ordered-items">
                            <img src={item.imgSrc} alt={item.name} />
                            <div>
                              <h3>{item.name}</h3>
                              <p>Price: ${(item.price / 100).toFixed(2)}</p>
                              <p>Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          </>
                      )
                    })}
                  </div> 
                )
              })
            }






            {/* {
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
            } */}
        </>  

      </div>
    </div>
  )
}

export default Orders