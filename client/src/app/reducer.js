import { setCars, GET_CARS } from "./actions";

const initialState = {
    data: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CARS: {
            return { ...state, data: action.payload };
        }
        default:
            return state;
    }
};

export const loadCars = (make, model) => async (dispatch, getState) => {
    const vehicles = await fetch(
        `http://localhost:8080/api/vehicles?make=${make}&model=${model}`
    ).then(res => res.json());
    dispatch(setCars(vehicles));
};
