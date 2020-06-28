import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, detailsOrder, payOrder } from '../actions/orderActions';
import PaypalButton from '../components/PaypalButton';
function OrderScreen(props) {

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successPay) {
      props.history.push("/profile");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
    };
  }, [successPay]);

  const handleSuccessPayment = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  }

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  return loading ? <div>Carregando...</div> : error ? <div>{error}</div> :

    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h2>
              Local de Entrega
          </h2>
            <div>
              {order.shipping.address}, {order.shipping.city},
          {order.shipping.postalCode}, {order.shipping.country},
          </div>
            <div>
              {order.isDelivered ? "Entregue em: " + order.deliveredAt : "Não entregue."}
            </div>
          </div>
          <div>
            <h2>Método de Pagamento</h2>
            <div>
              Metodo de Pagamento: {order.payment.paymentMethod}
            </div>
            <div>
              {order.isPaid ? "Pago em " + order.paidAt : "Não pago."}
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
                order.orderItems.length === 0 ?
                  <div>
                    Carrinho está vazio.
          </div>
                  :
                  order.orderItems.map(item =>
                    <li key={item._id}>
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
            <li className="placeorder-actions-payment">
              {loadingPay && <div>Finalizando Pagamento...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
            </li>
            <li>
              <h2>Descrição do Pedido</h2>
            </li>
            <li>
              <div>Itens</div>
              <div>R${order.itemsPrice}</div>
            </li>
            <li>
              <div>Taxa de Entrega</div>
              <div>R${order.shippingPrice}</div>
            </li>
            <li>
              <div>Outras Taxas</div>
              <div>R${order.taxPrice}</div>
            </li>
            <li>
              <div>Total do Pedido</div>
              <div>R${order.totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>

}

export default OrderScreen;