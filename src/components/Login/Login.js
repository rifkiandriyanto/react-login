import React, { useState, useEffect, useReducer } from 'react';
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';


const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_PASSWORD') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: undefined,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: undefined,
  });

  useEffect(() => {
    console.log('EFFECT RUNNING');
    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  // Object destructuring
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Check form validity! ');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 400);
    return () => {
      console.log('CLEAN UP'); // ..CLeanup process for useEffect after 5 sec
      clearTimeout(identifier); // Clear the timer
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({
      type: 'USER_INPUT',
      val: event.target.value,
    });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'USER_PASSWORD',
      val: event.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className='login'>
      <form onSubmit={submitHandler}>
        <div className={emailState.isValid === false ? 'invalid' : 'control'}>
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={passwordState.isValid === false ? 'invalid' : 'control'}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className='actions'>
          <Button type='submit' className='btn' disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
