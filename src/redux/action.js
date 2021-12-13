import * as types from "./actionTypes";
import axios from "axios";

const fetchCocktailStart = () =>({
    type: types.FETCH_COCKTAIL_START
})

const fetchCockTailSuccess = (cocktails) =>({
    type: types.FETCH_COCKTAIL_SUCCESS,
    payload: cocktails
})

const fetchCookTailFailure = (error) =>({
    type: types.FETCH_COCKTAIL_FAIL,
    payload: error
})

const fetchSingleCocktailStart = () =>({
    type: types.GET_SINGLE_COCKTAIL_START
})

const fetchSingleCockTailSuccess = (cocktail) =>({
    type: types.GET_SINGLE_COCKTAIL_SUCCESS,
    payload: cocktail
})

const fetchSingleCookTailFailure = (error) =>({
    type: types.GET_SINGLE_COCKTAIL_FAIL,
    payload: error
})

export function fetchCocktail(){
    return function(dispatch) {
        dispatch(fetchCocktailStart());
        axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=').then((response)=>{
            const cocktails = response.data.drinks;
            // console.log(cocktails)
            dispatch(fetchCockTailSuccess(cocktails))
        })
        .catch((error)=> {
            dispatch(fetchCookTailFailure(error));
        })
    }
}

export function fetchSingleCocktail(id){
    return function(dispatch) {
        dispatch(fetchSingleCocktailStart());
        axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`).then((response)=>{
            console.log("response");    
            const cocktail = response.data.drinks;
            dispatch(fetchSingleCockTailSuccess(cocktail))
        })
        .catch((error)=> {
            dispatch(fetchSingleCookTailFailure(error));
        })
    }
}