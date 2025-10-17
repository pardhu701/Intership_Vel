import {createStore} from 'redux';
import counterReducer from './reducer';


const Store = createStore(counterReducer)

export default Store
