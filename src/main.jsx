import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

import App from './App.jsx'
import Component from './Component.jsx'
import Hook from './Hook.jsx'
import Appp from './Appp.jsx'
import Common from './redux/Common.jsx'
import ProviderReact from './React-redux/ProviderReact.jsx'
import Reactapp from './React-redux/Reactapp.jsx'
import Hooke from './Hooke.jsx'
import Tan from './TanQuery/Tan.jsx'
import Users from './TanQuery/Users.jsx';
import Parent from './children/Parent.jsx';
import UseState from './Hooks/UseState.jsx';
import UseMemo from './Hooks/UseMemo.jsx';
import Fetching from './Fetching.jsx';
import UseRef from './Hooks/UseRef.jsx';

// const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
//    <StrictMode>
      
// <QueryClientProvider client={queryClient}>
//       <Users />
//     </QueryClientProvider>
//    </StrictMode>

<StrictMode>
   {/* <UseMemo /> */}
   <Component/>
</StrictMode>
   
 
)
