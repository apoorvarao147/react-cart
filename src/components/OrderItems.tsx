//@ts-nocheck
import "../styles/orderItems.scss";
import toast, {Toaster} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

const OrderItems = ({ cart, setOrders, dispatch }) => {
  const navigate = useNavigate()

  let ordersjson = localStorage.getItem("orders");
  ordersjson = JSON.parse(ordersjson);

  const priceShipping = 4.99;
  const priceTax = 0.13;

  let sum = 0;
  for (let item of cart.cartItems) {
    let price = Number((item.product.price / 100).toFixed(2));
    sum = sum  + (price * item.quantity);
  }

  let total = sum + priceShipping;
  let totalTax = total * priceTax;
  let orderTotal = total + totalTax;
  orderTotal = orderTotal.toFixed(2);
  sum = sum.toFixed(2);
  total = total.toFixed(2);
  totalTax = totalTax.toFixed(2);


  const quantityArray = [];
  cart.cartItems.map((item) => quantityArray.push(item.quantity));
  const quantityInCart = quantityArray.reduce((acc, curr) => acc + curr, 0);


  const handleOrder = async() => {

    let body = {
      "customer_id" : "customer1",
      "box_items" : cart,
      "amount" : orderTotal
    }

    try {
      let sendOrder = await fetch(`${process.env.REACT_APP_BACKEND_API}/order`, {
        method: "POST",
        headers: {
          "Content-type" : "application/json"
        },
        body: JSON.stringify(body)
      })

      if (sendOrder.status === 200) {
        toast.success("Order placed successfully")

        dispatch({type: "EMPTYCART"})
        setTimeout(() => {
          navigate("/orders")
        }, 1000)
      }

      sendOrder = await sendOrder.json()

      if (ordersjson.length > 0) {
        setOrders([[...cart.cartItems],...ordersjson])
      } else {
        setOrders([[...cart.cartItems]])
      }

    } catch (error) {
      toast.error(error)
    } 
  }

  return (
    <div className="order-summary">
      <Toaster />
      <h3>Order Summary</h3>
      <div>
        <div>
          <p>Items ({quantityInCart}):</p>
          <p>${sum}</p>
        </div>
        <div>
          <p>Shipping & handling:</p>
          <p>${cart.cartItems.length > 0 ? priceShipping : '0.00'}</p>
        </div>
        <div className="order-tax">
          <p>Total before tax:</p>
          <p>${cart.cartItems.length > 0 ? total : '0.00'}</p>
        </div>
        <div>
          <p>Estimated tax (13%):</p>
          <p>${cart.cartItems.length > 0 ? totalTax : '0.00'}</p>
        </div>

        <div className="order-total">
          <h2>Order total:</h2>
          <h2>${cart.cartItems.length > 0 ? orderTotal : '0.00'}</h2>
        </div>

        <button disabled={cart.cartItems.length > 0 ? "" : "true"} onClick={handleOrder}>Place your order</button>
      </div>
    </div>
  );
}

export default OrderItems;
