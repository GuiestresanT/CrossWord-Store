import React from 'react';
import {Link} from 'react-router-dom';
import data from '../data';

function ProductScreen(props) {
    console.log(props.match.params);
    const product = data.products.find(x=> x._id === props.match.params.id);
    return <div>
        <div className="back-to-result">
            <Link to="/">Voltar aos resultados</Link>
        </div>
        <div className="details">
            <div className="details-image">
                <img src={product.image} alt="product"/>
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
                        Preço: {product.price}
                    </li>
                    <li>
                        Status: {product.status}
                    </li>
                    <li>
                        Qtd: <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select>
                    </li>
                    <li>
                        <button className="button">Add ao Carrinho</button>
                    </li>
                </ul>
            </div> 
        </div>
    </div>
}
export default ProductScreen;