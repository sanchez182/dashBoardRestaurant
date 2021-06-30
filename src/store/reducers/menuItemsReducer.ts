  
import { IModelFood, IModelMenuItem,IModelDrinks } from '../../interfaces/IModelMenuItem';
import { IMenuItemsActions,SET_MENUITEM,MenuStage} from '../actions/actionsInterfaces/IMenuItemsActions';

const model: IModelFood = {
  plateName: "Plato vegano",
  idFoodType: 1,
  description: "descripcion larga vegano asd asda sda sdasd",
  shortDescription: "descripcion corta",
  image: "platillo1.jpg",
  cant: 0,
  id: 1,
  idTimeFood: 1
}


const model7: IModelFood = {
  plateName: "Plato vegetariano desayuno",
  idFoodType: 2,
  description: "descripcion larga vegetariano asd asda sda sdasd",
  shortDescription: "descripcion corta",
  image: "platillo1.jpg",
  cant: 0,
  id: 2,
  idTimeFood: 1
}

const model3: IModelFood = {
  plateName: "Carne o cualquier cosa",
  idFoodType:3,
  description: "descripcion larga jajsd asd asda sda sdasd",
  shortDescription: "descripcion corta",
  image: "platillo1.jpg",
  cant: 0,
  id: 3,
  idTimeFood: 3
}


const model4: IModelFood = {
  plateName: "Algún postre",
  idFoodType:4,
  description: "descripcion larga del postre asd asda sda sdasd",
  shortDescription: "descripcion corta",
  image: "platillo1.jpg",
  cant: 0,
  id: 4,
  idTimeFood: 3
}


const model5: IModelFood = {
  plateName: "Plato vegetariano almuerzo",
  idFoodType: 2,
  description: "descripcion larga vegetariano2 asd asda sda sdasd",
  shortDescription: "descripcion corta",
  image: "platillo1.jpg",
  cant: 0,
  id: 5,
  idTimeFood: 2
}

const model6: IModelFood = {
  plateName: "Plato vegano2",
  idFoodType: 1,
  description: "descripcion larga vegano2 asd asda sda sdasd",
  shortDescription: "descripcion corta",
  image: "platillo1.jpg",
  cant: 0,
  id: 6,
  idTimeFood: 1
}


const drink1 : IModelDrinks ={
  drinkName: "Sangría",
  idDrinkType: 1, //licor
  description: "Descripcion larga de sangría  safasdasdasdasdas",
  shortDescription: "Descripcion corta de bebida 1",
  image: "sangria.jpg",
  cant: 0,
  id: 1
}
const drink2 : IModelDrinks ={
  drinkName: "Gaseosa 2",
  idDrinkType: 2, //Gaseosa
  description: "Descripcion larga de bebida Gaseosa safasdasdasdasdas",
  shortDescription: "Descripcion corta de bebida 2",
  image: "gaseosa.jpg",
  cant: 0,
  id: 2
}

const drink3 : IModelDrinks ={
  drinkName: "Bebida natural",
  idDrinkType: 3, //Natural
  description: "Descripcion larga de bebida natural safasdasdasdasdas",
  shortDescription: "Descripcion corta de bebida 3",
  image: "natural.png",
  cant: 0,
  id: 3
}

const drink4 : IModelDrinks ={
  drinkName: "Café negro",
  idDrinkType: 4, //Calientes
  description: "Descripcion larga de bebida caliente cafe negro ",
  shortDescription: "Descripcion corta de bebida 3",
  image: "Cafe.jpg",
  cant: 0,
  id: 4
}

 const modelMenu : IModelMenuItem = {
  food :  [model,model3,model4,model5,model6,model7],
  drink :  [drink1,drink2,drink3,drink4],
 }


const initialState: MenuStage ={ items: modelMenu}

const menuItemsReducer = (state = initialState, action: IMenuItemsActions) => {
  switch(action.type) {
    case SET_MENUITEM:
      return {
        ...state, 
        item: action.payload
      }
    default:
      return state;
  }
}

export default menuItemsReducer;