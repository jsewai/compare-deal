import * as actionTypes from './actionTypes';

export const setGoogle = userChoice => {
    if(userChoice){
        return {
            type: actionTypes.SELECT_GOOGLE,
            google: {title: 'Google', isSelected:true}
        }
    }else{
        return {
            type: actionTypes.NOT_SELECT_GOOGLE,
            google: {title: 'Google', isSelected:false}
        }
    }
}
 
export const setKijiji = userChoice => {
    if(userChoice){
        return {
            type: actionTypes.SELECT_KIJIJI,
            kijiji: {title: 'Kijiji', isSelected: true}
        }   
    }else{
        return {
            type: actionTypes.NOT_SELECT_KIJIJI,
            kijiji: {title: 'Kijiji', isSelected: false}
        }
    }
}

export const setPage = (clickedPage, isChecked) => {
    switch(clickedPage){
        case 'Google': return setGoogle(isChecked);
        case 'Kijiji': return setKijiji(isChecked);
        default: return console.log('The new page must be added to actionTypes please create a new actionType');
    }
}
