import {configureStore} from '@reduxjs/toolkit';

import utilizadorReducer from './reducers/userSlice';
import todosUtilizadoresReducer from './reducers/usersListSlice';

export default configureStore({
  reducer: {
    utilizador: utilizadorReducer,
    todosUtilizadores: todosUtilizadoresReducer,
  },
});
