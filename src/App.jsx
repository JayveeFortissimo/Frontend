import {createBrowserRouter,RouterProvider} from 'react-router-dom';
//Pages
import RootMain from './Page/RootMain';
import UserProfile, {Logout} from './Page/profiles/UserProfile';
import HomePage from './Page/Homepage';
import Items,{items} from './Page/Items';
import Faqs from './Page/Faqs';
import Inquire,{sendEmail} from './Page/inquire';
import ItemDetails,{itemsInfos} from './Page/ItemsDetails/ItemDetails.jsx';
import SearchBar,{itemSearch} from './Page/SearchBar.jsx';
import SizingForm from './Page/SizingForm.jsx';
import ReviewPage from './Page/ReviewPage.jsx';
import Cart from './Page/Cart.jsx';
import Check_Out from './Page/Check_Out.jsx';
//credentials
import Login,{Logins} from './Page/Login';
import Register,{regista} from './Page/Register';
import ReferalRegister,{registas} from './Components/ReferalRegister.jsx';

//Auth
import {  TokenAuth , CheckAuth } from './auth/Token.js';

//Admins
import RootAdmin from './Page/admin/Root.jsx';
import Dashboard, {Dash} from './Page/admin/Dashboard.jsx';
import Products,{itemsProduct} from './Page/admin/Products.jsx';
import Orders_Appoint,{allUsers} from './Page/admin/Orders_Appoint.jsx';
import InquiresAdmin from './Page/admin/InquiresAdmin.jsx';
import SettingsAdmin from './Page/admin/Settings.jsx';
import Productsdetails from './Page/admin/Productsdetails.jsx';
import User_Details, {userFullDetails} from './Page/admin/User_Details.jsx';
import AddItems from './Page/admin/AddItems.jsx';
import Appointment from './Page/admin/Appointment.jsx';

  const App = () => {

    const client_Routes = createBrowserRouter([
          {
            path:'/',
            element:<RootMain/>,
            id:"root",
            loader:TokenAuth,
            children:[
             {index:true,element:<HomePage/>},

             {
              path:"Items",
              id:"Items",
              loader:items,
              children:[
                { index:true ,element:<Items/>},
                { path:":Items_ID",
                 element:<ItemDetails/>,
                 loader:itemsInfos
                },
              ]
             },

             {path:"search",
              id:"search",
              element:<SearchBar/>,
             loader:itemSearch
            },

             {path:'Faqs',element:<Faqs/>},
        
             {path:'sizing_Form',element:<SizingForm/>},

             {path:'Inquire',
              element:<Inquire/>,
              action:sendEmail
            },


            {path:'Review',
              element:<ReviewPage/>,
            },

             {path:'cart',element:<Cart/>},
              {path:'check_out',element:<Check_Out/>},


             {path:'Login',
              element:<Login/>,
              action:Logins
            },
  
             {path:'Register',
              element:<Register/>,
              action:regista
            },

            {path:'register/Referal',
              element:<ReferalRegister/>,
              action:registas
            },
 
            {path:'profile',
            element:<UserProfile/>,
            loader:CheckAuth,
            action:Logout
            }

            ]
          },
 
          {
            path: '/admin',
            element: <RootAdmin />,
            loader: CheckAuth, 
            children: [
                {
                    index: true,
                    element: <Dashboard />,
                    loader: Dash
                },
                {
                    path: 'Products',
                    id: 'product',
                    loader: itemsProduct,
                    children: [
                        { index: true, element: <Products /> },
                        {
                            path: ':product_ID',
                            element: <Productsdetails />
                        }
                    ]
                },
                {
                    path: 'Orders',
                    id: 'userData',
                    loader: allUsers,
                    children: [
                        { index: true, element: <Orders_Appoint /> },
                        {
                            path: ':userDetails',
                            element: <User_Details />,
                            loader: userFullDetails
                        }
                    ]
                },
                { path: 'addItems', element: <AddItems /> },
                { path: 'appointment', element: <Appointment /> },
                { path: 'Inquires', element: <InquiresAdmin /> },
                { path: 'Settings', element: <SettingsAdmin /> }
            ]
        }

    ]);

  return (
    <>

<RouterProvider router={client_Routes} />

    </>
  )
}

export default App;
