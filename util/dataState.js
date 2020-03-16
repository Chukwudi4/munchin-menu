import { decorate, observable } from "mobx";


class DataState {
    categories = [];
    ingredients = [];
    recipes = [];
}

const Data = decorate(DataState, {
    categories: observable,
    ingredients: observable,
    recipes: observable
})

export const data = new Data()