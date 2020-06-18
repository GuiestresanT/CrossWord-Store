import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
function PlaceOrderScreen(props) {

  const cart = useSelector(state => state.cart);
  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // Cria um pedido
    dispatch(createOrder({
      orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
      taxPrice, totalPrice
    }));
  }
  useEffect(() => {
    if (success) {
      props.history.push("/order/" + order._id);
    }

  }, [success]);

  return <div>
    <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
    <div className="placeorder">
      <div className="placeorder-info">
        <div>
          <h2>
            Endereço de Entrega
          </h2>
          <div>
            {cart.shipping.address}, {cart.shipping.city},
          {cart.shipping.postalCode}, {cart.shipping.country},
          </div>
        </div>
        <div>
          <h2>Metodo de Pagamento</h2>
          <div>
            Metodo Escolhido: {cart.payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul className="cart-list-container">
            <li>
              <h2>
                Carrinho de Compras
          </h2>
              <div>
                Preço
          </div>
            </li>
            {
              cartItems.length === 0 ?
                <div>
                  O carrinho está vazio.
          </div>
                :
                cartItems.map(item =>
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>
                          {item.name}
                        </Link>

                      </div>
                      <div>
                        Quantidade: {item.qty}
                      </div>
                    </div>
                    <div className="cart-price">
                      R${item.price}
                    </div>
                  </li>
                )
            }
          </ul>
        </div>

      
      </div>
      <div className="placeorder-action">
        <ul>
          <li>
            <button className="button primary full-width" onClick={placeOrderHandler} >Finalizar Pedido</button>
          </li>
          <li>
            <h2>Descrição do Pedido</h2>
          </li>
          <li>
            <div>Itens</div>
            <div>R${itemsPrice}</div>
          </li>
          <li>
            <div>Taxa de Entrega</div>
            <div>R${shippingPrice}</div>
          </li>
          <li>
            <div>Outras Taxas</div>
            <div>R${taxPrice}</div>
          </li>
          <li>
            <div>Total do Pedido</div>
            <div>R${totalPrice}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>

}

export default PlaceOrderScreen;