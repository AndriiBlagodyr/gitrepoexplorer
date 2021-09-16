import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { apiCallBegan } from './api';

const slice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    usersRequested: (users, action) => {
      users.loading = true;
    },

    usersReceived: (users, action) => {
      users.list = action.payload.data.items;
      users.loading = false;
    },

    // eslint-disable-next-line no-unused-vars
    usersRequestFailed: (users, action) => {
      users.loading = false;
    },
  },
});

export const { usersReceived, usersRequested, usersRequestFailed } = slice.actions;
export default slice.reducer;

// Action Creators
const url = '/search/users?q=';

// eslint-disable-next-line no-unused-vars
export const loadUsers = searchName => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: `${url}${searchName}`,
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};

// Selector
export const getFirstFiveUsers = () =>
  createSelector(
    state => state.entities.users.list,
    list => list.slice(0, 5)
  );
