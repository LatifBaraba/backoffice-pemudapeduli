import { combineReducers } from 'redux';
import Customizer from './customizer.reducer';
import tokenReducer from '../redux/token/reducer';
import albumReducer from '../redux/album/reducer';

const reducers = combineReducers({
    Customizer,
    tokenReducer,
    albumReducer

});
console.log('combine reducer')
export default reducers;