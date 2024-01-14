import { useContext, useReducer, useEffect, createContext } from 'react';
import { reducer } from './useReducer/reducer';
import { vars } from './useReducer/actions';
import cartItems from './data';
import { getTotals } from './utils';

const cartItemsObject = cartItems.map((item) => [item.id, { ...item }]);
const cartMap = new Map(cartItemsObject);
const newArrayFromMap = Array.from(cartMap.entries());
const AppContext = createContext();
// const CLEARFunc
const initialState = {
	isLoading: false,
	cart: cartMap,
};
export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { totalAmount, totalCost } = getTotals(state.cart);

	const ClearCart = () => {
		dispatch({ type: vars.CLEAR_ITEMS });
	};
	const RemoveItem = (id) => {
		dispatch({ type: vars.REMOVE_ITEM, payload: { id } });
	};
	const IncreaseItem = (id) => {
		dispatch({ type: vars.INCREASE_ITEM, payload: { id } });
	};
	const DecreaseItem = (id) => {
		dispatch({ type: vars.DECREASE_ITEM, payload: { id } });
	};

	const values = {
		...state,
		ClearCart,
		RemoveItem,
		IncreaseItem,
		DecreaseItem,
		totalAmount,
		totalCost,
	};
	return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};
