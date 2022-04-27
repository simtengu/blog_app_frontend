import React from 'react';
import Footer from './components/Footer';
import ResponsiveAppBar from './components/ResponsiveBar';
import Navigation from './components/Router';
const App = () => {
  return ( 

    <>
    <ResponsiveAppBar />
    <Navigation/>
    <Footer />
    </>
   );
}
 
export default App;