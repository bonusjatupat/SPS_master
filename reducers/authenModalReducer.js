const OPEN_AUTHEN_MODAL = 'OPEN_AUTHEN_MODAL';
const CLOSE_AUTHEN_MODAL = 'CLOSE_AUTHEN_MODAL';
const TRIGGER_AUTHEN_MODAL = 'TRIGGER_AUTHEN_MODAL';

const AuthenModalReducer = (state = {
    opened: false
}, action) => {
    switch(action.type) {
        case OPEN_AUTHEN_MODAL: {
            return {
                opened: true
            }
            break;
        }
        case CLOSE_AUTHEN_MODAL: {
            return {
                opened: false
            }
            break;
        }
        case TRIGGER_AUTHEN_MODAL: {
            return {
                opened: !state.opened
            }
            break;
        }
    }
    return state;
}

export default AuthenModalReducer;