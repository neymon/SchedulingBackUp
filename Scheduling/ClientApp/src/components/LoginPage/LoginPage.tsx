import React, {FunctionComponent, useState} from 'react';
import './loginPage.css'
import { connect } from 'react-redux';
import { RootState } from '../../store/configureStore';
import { Dispatch } from 'redux';
import { login } from '../../store/login/actions';
import { ILoginInfo, LoginActionType } from '../../store/login/types';
import { Redirect } from 'react-router';
import checkLoginData from '../../webAPI/login/loginAPI';
import {useCookies} from "react-cookie";

interface ILoginProps {
  login: (logininfo: ILoginInfo) => LoginActionType,
  logined: boolean
}

interface ILoginState {
  email: string,
  password: string,
  isValidInfo: boolean
}

const Login: FunctionComponent<ILoginProps> = (props: ILoginProps) => {
  const [token, setToken, removeToken] = useCookies(['token']);

    const [state, setState] = useState({
      email: '',
      password: '',
      isValidInfo: true,
    });


  const onInputEmail = (event: React.FormEvent<HTMLInputElement>) => {
    setState({
      ...state,
      email: event.currentTarget.value
    });
  }

  const onInputPassword = (event: React.FormEvent<HTMLInputElement>) => {
    setState({
      ...state,
      password: event.currentTarget.value
    });
  }

  const onSubmit = async () => {

    if(!state.email || !state.password)
      return;
    const loginData = await checkLoginData(state.email, state.password);

    setToken('token', loginData.token);

    console.log(token);

    setState({
      ...state,
      isValidInfo: loginData.isValidInfo
    })

    props.login({
      logined: !!loginData.token,
      token: loginData.token,
      permissions: loginData.permissions
    })

  }

  let loginMessage = null;

  if(!state.isValidInfo){
    loginMessage = <p className='no-valid'>Invalid login or password</p>;
  }

  let loginPage = (
    <div className='login-page'>
      <div className='login-container'>
        <form onSubmit={(e) => {e.preventDefault(); onSubmit() }}>
          <h4>Sign into your account </h4>
          {loginMessage}
          <div className='input-container'>
            <label form='email'>Email: </label>
            <input
              className={state.isValidInfo ? '': 'no-valid'}
              type='email'
              name='email'
              id='email'
              value={state.email}
              onChange={event => onInputEmail(event)}
            />
          </div>
          <div className='input-container'>
            <label form='email'>Password: </label>
            <input
              className={state.isValidInfo ? '': 'no-valid'}
              type='password'
              name='password'
              id='password'
              value={state.password}
              onChange={event => onInputPassword(event)}
            />
          </div>
          <button type='submit'>Sign in</button>
        </form>
      </div>
    </div>
  )


  if(props.logined)
    loginPage = <Redirect to="home"></Redirect>;
  return loginPage;
}


const mapStateToProps = (store: RootState) => {
	return {
		logined: store.login.logined
	}
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
	login: (loginInfo: ILoginInfo) => dispatch(login(loginInfo))
})


export default connect(mapStateToProps,mapDispatchToProps)(Login);