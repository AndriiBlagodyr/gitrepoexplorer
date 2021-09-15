import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import { GlobalStyle } from './theme/GlobalStyle';
import storeCreator from './store/configureStore';
import { light } from './theme/theme';
import { GitSearch } from './pages/GitSearch';

const store = storeCreator();

function App() {
  return (
    <div>
      <ThemeProvider theme={light}>
        <Provider store={store}>
          <GlobalStyle />
          <GitSearch />
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
