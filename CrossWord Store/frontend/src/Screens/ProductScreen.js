import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {

    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => {
            //
        };
    }, [])

    const handleAddToCart = () => { //Add no carrinho a qtd de vezes que o cliente desejou
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }

    return <div>
        <div className="back-to-result">
            <Link to="/">Voltar aos resultados</Link>
        </div>
        {loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
                (
                    <div className="details">
                        <div className="details-image">
                            <img src={product.image} alt="product" />
                        </div>

                        <div className="details-info">
                            <ul>
                                <li>
                                    <h4>{product.name}</h4>
                                </li>
                                <li>
                                    {product.rating} Estrelas ({product.numReviews} Avaliações)
                    </li>
                                <li>
                                    Preço: <b>${product.price}</b>
                                </li>
                                <li>
                                    <div>
                                        {product.description}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>
                                    <b>Preço: R${product.price}</b>
                                </li>
                                <li>
                                    Status: {product.qtdEstoque > 0? "Em estoque": "Sem Estoque" }
                                </li>
                                <li>
                                    Qtd: <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                        {[...Array(product.qtdEstoque).keys()].map(x =>
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        )}
                                    </select>
                                </li>
                                <li>
                                    {product.qtdEstoque > 0 && <button onClick={handleAddToCart} className="button primary">Add ao Carrinho</button>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>

                )
        }

    </div>
}
export default ProductScreen;