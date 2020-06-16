import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL } from "../constants/productConstants";

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

function productDetailsReducer(state = {product: {} }, action){
    switch (action.type){
        case PRODUCT_DETAILS_REQUEST: //Envia uma requisiçao para o servidor pedindo a lista de produtos
            return {loading: true}; //indica que esta carregando
        case PRODUCT_DETAILS_SUCCESS: //Consegui os dados do servidor
            return {loading: false, product: action.payload};
        case PRODUCT_DETAILS_FAIL: //Erro
            return {loading: false, error: action.payload};
        default: //Nao altero o estado.
            return state;
    }
}

export {productListReducer, productDetailsReducer}
