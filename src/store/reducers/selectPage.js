import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    google: {title: 'Google', isSelected: true},
    kijiji: {title: 'Kijiji', isSelected: true},
}

const selectGoogle = (state, action) => {
    return updateObject(state, {
        google: {title: 'Google', isSelected: true}
    });
}

const not_selectGoogle = (state, action) => {
    return updateObject(state, {
        google: {title: 'Google', isSelected:false}
    });
}

const selectKijiji = (state, action) => {
    return updateObject(state, {
        kijiji: {title: 'Kijiji', isSelected:true}
    });
}

const not_selectKijiji = (state, action) => {
    return updateObject(state, {
        kijiji: {title: 'Kijiji', isSelected:false}
    });
}

const reducer = (state=initialState, action) => {
    
    switch (action.type) {
        case actionTypes.SELECT_GOOGLE: return selectGoogle(state, action);
        case actionTypes.NOT_SELECT_GOOGLE: return not_selectGoogle(state, action);
        case actionTypes.SELECT_KIJIJI: return selectKijiji(state, action);
        case actionTypes.NOT_SELECT_KIJIJI: return not_selectKijiji(state, action);
        
        default:
            return state;
    }
}

export default reducer;
