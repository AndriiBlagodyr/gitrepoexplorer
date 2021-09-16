import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { apiCallBegan } from './api';

const slice = createSlice({
  name: 'projects',
  initialState: {
    map: {},
    loading: false,
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    projectsRequested: (projects, action) => {
      projects.loading = true;
    },

    projectsReceived: (projects, action) => {
      projects.map[action.payload.parameters.userName] = action.payload.data;
      projects.loading = false;
    },

    // eslint-disable-next-line no-unused-vars
    projectsRequestFailed: (projects, action) => {
      projects.loading = false;
    },

    // eslint-disable-next-line no-unused-vars
    projectsCleared: (projects, action) => {
      projects.map = {};
    },
  },
});

export const { projectsReceived, projectsRequested, projectsRequestFailed, projectsCleared } =
  slice.actions;
export default slice.reducer;

// Action Creators
const url = name => `/users/${name}/repos`;

// eslint-disable-next-line no-unused-vars
export const loadProjects = userName => (dispatch, getState) => {
  return dispatch(
    apiCallBegan({
      url: url(userName),
      onStart: projectsRequested.type,
      onSuccess: projectsReceived.type,
      onError: projectsRequestFailed.type,
      parameters: { userName },
    })
  );
};

// Selector
// eslint-disable-next-line no-unused-vars
export const getUserProjects = userName =>
  createSelector(
    state => state.entities.projects.map,
    projects => projects[userName]
  );
