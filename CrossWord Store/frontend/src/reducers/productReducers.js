import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../constants/productConstants";

function productListReducer(state = {products:[]}, action){
    switch (action.type){
        case PRODUCT_LIST_REQUEST: //Envia uma requisiçao para o servidor pedindo a lista de produtos
            return {loading: true}; //indica que esta carregando
        case PRODUCT_LIST_SUCCESS: //Consegui os dados do servidor
            return {loading: false, products: action.payload};
        case PRODUCT_LIST_FAIL: //Erro
            return {loading: false, error: action.payload};
        default: //Nao altero o estado.
            return state;
    }
}

export {productListReducer}
