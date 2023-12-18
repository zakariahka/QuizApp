import { SET_USER, CLEAR_USER} from './userActions';

const initialState = {
  status: ''
};

const userStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, status: action.payload };
    case CLEAR_USER:
      return { ...state, status: '' };
    default:
      return state;
  }
};

export default userStatusReducer;
