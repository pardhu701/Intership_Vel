import {Provider} from 'react-redux';
import store from './useStore';
import ProviderReact from './ProviderReact';

export default function Reactapp(){
    return(
        <Provider store={store}>
            <ProviderReact />
        </Provider>

    );
}