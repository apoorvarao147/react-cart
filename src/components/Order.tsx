//@ts-nocheck
import "../styles/order.scss";

function Order({ cart, cartQuantity }) {
  const priceShipping = 4.99;
  const priceTax = 0.13;

  let sum = 0;
  for (let item of cart) {
    let price = Number((item.price / 100).toFixed(2));
    sum = sum  + (price * item.quantity);
  }

  let total = sum + priceShipping;
  let totalTax = total * priceTax;
  let orderTotal = total + totalTax;
  orderTotal = orderTotal.toFixed(2);
  sum = sum.toFixed(2);
  total = total.toFixed(2);
  totalTax = totalTax.toFixed(2);

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div>
        <div>
          <p>Items ({cartQuantity}):</p>
          <p>${sum}</p>
        </div>
        <div>
          <p>Shipping & handling:</p>
          <p>${cartQuantity ? priceShipping : '0.00'}</p>
        </div>
        <div className="order-tax">
          <p>Total before tax:</p>
          <p>${cartQuantity ? total : '0.00'}</p>
        </div>
        <div>
          <p>Estimated tax (13%):</p>
          <p>${cartQuantity ? totalTax : '0.00'}</p>
        </div>

        <div className="order-total">
          <h2>Order total:</h2>
          <h2>${cartQuantity ? orderTotal : '0.00'}</h2>
        </div>

        <button disabled={cartQuantity ? "" : "true"}>Place your order</button>
      </div>
    </div>
  );
}

export default Order;
