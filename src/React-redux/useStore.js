import {createStore} from 'redux'

const initialState={
    count:0,
    
}

export const increment = () => ({ type: 'INC' });
export const decrement = () => ({ type: 'DEC' });


export  function counterReducer(state=initialState,action){
    switch (action.type) {
    case 'INC':
      return { ...state, count: state.count + 1  };
    case 'DEC':
      return { ...state, count: state.count - 1  };
    default:
      return state;
  }
}


 const store = createStore(counterReducer);
 export default store;
