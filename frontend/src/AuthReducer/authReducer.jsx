const initialState = {
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        localStorage.setItem('admin_token', action.payload);
        return {
          ...state,
          isAuthenticated: true,
          token: action.payload,
        };
      case 'LOGOUT':
        localStorage.removeItem('admin_token');
        return {
          ...state,
          isAuthenticated: false,
          token: null,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  