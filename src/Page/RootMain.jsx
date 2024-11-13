import { Outlet, useLoaderData, useSearchParams, useSubmit } from "react-router-dom";
import NavigationBar from './NavigationBar';
import SideBar from "../Components/SideBar";
import {Toaster} from 'react-hot-toast';
import {useSelector} from 'react-redux';
import Footer from "./Footer";

const RootMain = ({RootMain = 'div'}) => {

   const SID = localStorage.getItem("ID");
  const openCloseSide = useSelector(state => state.Side.browseRefine);
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get('ref'); 


  return (
  <RootMain>
  <Toaster position="top-right" reverseOrder={false} />
  {openCloseSide && <SideBar/>}
  {referralCode ? undefined : SID? undefined :   <NavigationBar/>}
  <Outlet/>
  {SID? undefined :  <Footer/>}
  </RootMain>
  )
}

export default RootMain