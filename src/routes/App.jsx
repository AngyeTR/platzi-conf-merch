import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../containers/Home';
import Checkout from '../containers/Checkout';
import Information from '../containers/Information';
import Payment from '../containers/Payment';
import Success from '../containers/Success';
import NotFound from '../containers/NotFound';
import AppContext from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';



const App = () => {
  const initialState = useInitialState();
  const isEmpty = Object.keys(initialState.state).length;
    return (
      <>
      {isEmpty > 0 ? (
      <AppContext.Provider value={initialState}>
      <BrowserRouter>
        {/* <Layout> */}
        <Routes>
          {/* <Route exact path="/" component={Home} />
          <Route exact path="/checkout" component={Checkout} />
          <Route exact path="/checkout/information" component={Information} />
          <Route exact path="/checkout/payment" component={Payment} />
          <Route exact path="/checkout/success" component={Success} />
          <Route component={NotFound} /> */}
        <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/checkout/information' element={<Information />} />
        <Route path='/checkout/payment' element={<Payment />} />
        <Route path='/checkout/success' element={<Success />} />
        <Route path='*' element={<NotFound />} />
        </Route>
        </Routes>
        {/* </Layout> */}
      </BrowserRouter>
      </AppContext.Provider>
      ) : (<h1>Loading</h1>)}
      </>
    );
  };

export default App;


