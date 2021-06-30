export interface IModelFood {
    plateName: string,
    idFoodType: number,
    description:string,
    shortDescription: string,
    image: string,
    cant: number,
    id: number,
    idTimeFood: number,
  }

  export interface IModelDrinks {
    drinkName: string,
    idDrinkType: number,
    description:string,
    shortDescription: string,
    image: string,
    cant: number,
    id: number
  }

  export interface IModelMenuItem {
    food: IModelFood[],
    drink:IModelDrinks[]
  }

  export interface IDrinkType {
    idDrinkType: number;
    drinkName: String;
  }
  export interface IFoodType {
    idFoodType: number;
    foodName: String;
  }

  export interface ITimeFood {
    idTimeFood: number;
    timeFoodName: String;
  }

