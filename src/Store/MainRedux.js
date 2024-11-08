import {configureStore} from '@reduxjs/toolkit';
import Credentials from './Credentials.js';
import Side from './Side.js';
import Cancel from './Cancelled.js';

const store = configureStore({
    
    reducer:{Credentials,Side,Cancel}

});

export default store;