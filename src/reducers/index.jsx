import { combineReducers } from 'redux';
import Customizer from './customizer.reducer';
import tokenReducer from '../redux/token/reducer';
import albumReducer from '../redux/album/reducer';
import partnerReducer from '../redux/partner/reducer';
import bannerReducer from '../redux/banner/reducer';
import beritaReducer from '../redux/berita/reducer';
import donasiReducer from '../redux/donasi/reducer';
import tentangReducer from '../redux/tentang/reducer';
import programReducer from '../redux/program/reducer';
import teamReducer from '../redux/team/reducer';
import testimoniReducer from '../redux/testimoni/reducer';
import userReducer from '../redux/user/reducer';
import beneficariesReducer from '../redux/beneficaries/reducer';
import achievementReducer from '../redux/achievement/reducer';

const reducers = combineReducers({
    Customizer,
    tokenReducer,
    albumReducer,
    partnerReducer,
    bannerReducer,
    beritaReducer,
    donasiReducer,
    tentangReducer,
    programReducer,
    teamReducer,
    testimoniReducer,
    userReducer,
    beneficariesReducer,
    achievementReducer

});

export default reducers;