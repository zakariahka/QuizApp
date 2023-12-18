export const SET_USER_STATUS = 'SET_USER_STATUS';

export const setUserStatus = (status) => {
  return {
    type: SET_USER_STATUS,
    payload: status
  };
};
