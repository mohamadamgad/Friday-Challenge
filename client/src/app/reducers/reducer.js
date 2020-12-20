import { setCars, GET_CARS } from "../actions/actions";
import { getVehicles } from "../services/api";

const initialState = {
    data: [],
    pending: true
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CARS: {
            return { ...state, data: action.payload, pending: false };
        }
        default:
            return state;
    }
};

export const loadCars = (make, model) => async (dispatch, getState) => {
    const vehicles = await getVehicles(make, model);
    dispatch(setCars(vehicles));
};
