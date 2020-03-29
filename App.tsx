import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MyApp from './src';

const App: React.FC<{}> = () => (
  <PaperProvider>
    <MyApp />
  </PaperProvider>
);

export default App;
