import {redirect} from 'react-router-dom';

  const TokenAuth = () =>{
      const token = localStorage.getItem("ID");
      return token;
  }

  const CheckAuth = () =>{
    const tokens = TokenAuth();
    if(!tokens) return redirect('/login');
    return null;
  }

  export {
    TokenAuth,
    CheckAuth
  }

