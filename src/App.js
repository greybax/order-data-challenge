import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Orders from './Orders';
import SearchInput from './SearchInput';
import OrderContext from './OrderContext'

import './App.css';

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:4000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const tableReducer = (state, action) => {
    switch (action.type) {
      case 'add': {
        for (let i = 0; i < action.payload.length; i++) {
          if (state.data.has(action.payload[i].id)) {
            state.data.set(state.data.get(action.payload[i].id).id, action.payload[i]);
          } else {
            state.data.set(action.payload[i].id, action.payload[i]);
          }
        }

        return {
          search: state.search,
          data: new Map([...state.data].map((o) => {
            return [o[0], o[1]];
          })
        )}
      }
      case 'search': {
        return {
          search: action.payload,
          data: state.data
        }
      }
      default:
        throw new Error();
    }
  }

  const [ordersState, ordersDispatch ] = React.useReducer(tableReducer, {search: '', data: new Map()});

  const providerState = {
    ordersState,
    ordersDispatch
  }

  return (
    <div className="App">
      <h1> Orders UI </h1>
      
      { socket ? (
        <div className="chat-container">
          <OrderContext.Provider value={providerState} >
            <SearchInput />
            <Orders socket={socket} search={ordersState.search} />
          </OrderContext.Provider>
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default App;