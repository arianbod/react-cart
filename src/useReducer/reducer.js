import { vars } from './actions'
export const reducer = (state, action) => {
    let NewCart;
    let ItemId;
    let EditingItem;
    let EditedItem;
    switch (action.type) {
        case vars.INCREASE_ITEM:
            NewCart = new Map(state.cart)
            ItemId = action.payload.id;
            EditingItem = NewCart.get(ItemId)
            EditedItem = {
                ...EditingItem, amount: EditingItem.amount + 1
            }
            NewCart.set(ItemId, EditedItem)
            return { ...state, cart: NewCart }

            break;
        case vars.DECREASE_ITEM:

            NewCart = new Map(state.cart)
            ItemId = action.payload.id;
            EditingItem = NewCart.get(ItemId)
            EditedItem = { ...EditingItem, amount: EditingItem.amount - 1 }
            EditedItem.amount > 0 ?
                NewCart.set(ItemId, EditedItem) : NewCart.delete(ItemId)
            return { ...state, cart: NewCart }
            break;
        case vars.REMOVE_ITEM:
            NewCart = new Map(state.cart)
            NewCart.delete(action.payload.id)
            return { ...state, cart: NewCart }
            break;
        case vars.CLEAR_ITEMS:
            return { ...state, cart: new Map() }

        case vars.LOADING:
            return { ...state, isLoading: true }
        case vars.DISPLAY_ITEMS:
            NewCart = new Map(action.payload.ResData.map((item) => [item.id, item]))

            return { ...state, isLoading: false, cart: NewCart }
            break;

        default:
            throw new Error(`no matching action type ${action.type}`)
            break;
    }

}


