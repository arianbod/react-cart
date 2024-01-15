import { useContext, useReducer, useEffect, createContext } from 'react';
import { reducer } from './useReducer/reducer';
import { vars } from './useReducer/actions';
import cartItems from './data';
import { getTotals } from './utils';
const API = import.meta.env.VITE_API_URL;
const cartItemsObject = cartItems.map((item) => [item.id, { ...item }]);
const AppContext = createContext();

const initialState = {
	isLoading: false,
	cart: new Map(),
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
	const FetchData = async () => {
		dispatch({ type: vars.LOADING });
		const response = await fetch(API);
		if (!response.ok) {
			throw new Error(`not responding - ${response.message}`);
		}
		try {
			const ResData = await response.json();
			dispatch({ type: vars.DISPLAY_ITEMS, payload: { ResData } });
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		FetchData();
	}, []);
	return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};
