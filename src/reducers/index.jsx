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
import kontakReducer from '../redux/kontak/reducer';
import menuReducer from '../redux/menu/reducer';
import hubungiReducer from '../redux/hubungi/reducer'
import qrisReducer from '../redux/qris/reducer'
import historyReducer from '../redux/history/reducer'
import transactionReducer from '../redux/transaction/reducer'
import reminderReducer from '../redux/reminder/reducer'
import donasiKategoriReducer from '../redux/donasiKategori/reducer'
import paketReducer from '../redux/paket/reducer'
import penggalangReducer from '../redux/penggalang/reducer'
import nominalReducer from '../redux/nominal/reducer'
import kabarterbaruReducer from '../redux/kabarterbaru/reducer'
import uploadReducer from '../redux/uploadpdf/reducer'

const reducers = combineReducers({
    Customizer,
    tokenReducer,
    albumReducer,
    partnerReducer,
    bannerReducer,
    beritaReducer,
    donasiReducer,
    donasiKategoriReducer,
    tentangReducer,
    programReducer,
    teamReducer,
    testimoniReducer,
    userReducer,
    beneficariesReducer,
    achievementReducer,
    kontakReducer,
    menuReducer,
    hubungiReducer,
    qrisReducer,
    historyReducer,
    transactionReducer,
    reminderReducer,
    paketReducer,
    penggalangReducer,
    nominalReducer,
    kabarterbaruReducer,
    uploadReducer
});

export default reducers;