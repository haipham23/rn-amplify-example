import * as React from 'react';
import Auth from '@aws-amplify/auth';
import { Container } from 'native-base';
import { useFocusEffect } from '@react-navigation/native';

import Register from '../components/Register';
import Confirmation from '../components/Confirmation';
import Login from '../components/Login';
import Loader from '../components/Loader';
import AuthOptions from '../components/AuthOptions';
import ForgotPassword from '../components/ForgotPassword';
import SubmitNewPassword from '../components/SubmitNewPassword';

import FormStates from '../constants/FormStates';

interface IForm {
  username: string,
  email: string;
  password: string;
  confirmCode: string;
  forgotCode: string;
  newPassword: string;
}

interface Props {
  navigation: any;
}

const initialForm = {
  username: '',
  email: '',
  password: '',
  confirmCode: '',
  forgotCode: '',
  newPassword: ''
};

const AuthScreen = ({ navigation }: Props) => {
  const [form, setForm] = React.useState<IForm>(initialForm);
  const [formState, setFormState] = React.useState<string>('empty');

  const onScreenFocus = React.useCallback(() => {
    const navigateIfAuth = async () => {
      setFormState(FormStates.loading);

      try {
        const user = await Auth.currentAuthenticatedUser();

        if (user) {
          navigation.replace('Root');
          return;
        }

        setFormState(FormStates.register);
      } catch (e) {
        // logged out
        setFormState(FormStates.login);
      }
    };

    navigateIfAuth();

    return () => setFormState(FormStates.empty);
  }, []);

  const updateForm = (key: string) => (text: string) => setForm({ ...form, [key]: text });

  const setFormStateTo = (key: string) => () => setFormState(key);

  const signUp = async () => {
    setFormState(FormStates.loading);

    try {
      await Auth.signUp({
        username: form.username,
        password: form.password,
        attributes: {
          email: form.email
        }
      });
      setFormState(FormStates.confirm);
    } catch (e) {
      console.log(e);
      setFormState(FormStates.register);
    }
  };

  const confirmSignUp = async () => {
    setFormState(FormStates.loading);

    try {
      await Auth.confirmSignUp(form.username, form.confirmCode);
      setFormState(FormStates.login);
    } catch (e) {
      console.log(e);
      setFormState(FormStates.register);
    } finally {
      setForm(initialForm);
    }
  };

  const login = async () => {
    setFormState(FormStates.loading);

    try {
      await Auth.signIn(form.username, form.password);
      setForm(initialForm);

      navigation.replace('Root');
    } catch (e) {
      console.log(e);
    } finally {
      setFormState(FormStates.login);
    }
  };

  const sendForgotCode = async () => {
    setFormState(FormStates.loading);

    try {
      await Auth.forgotPassword(form.username);
      setFormState(FormStates.newPassword);
    } catch (e) {
      console.log(e);
      setFormState(FormStates.forgotPassword);
    }
  };

  const submitNewPassword = async () => {
    setFormState(FormStates.loading);

    try {
      await Auth.forgotPasswordSubmit(
        form.username,
        form.forgotCode,
        form.newPassword
      );

      setForm(initialForm);
      setFormState(FormStates.login);
    } catch (e) {
      console.log(e);
      setFormState(FormStates.forgotPassword);
    }
  };

  useFocusEffect(onScreenFocus);

  if (formState === FormStates.empty) {
    return null;
  }

  if (formState === FormStates.loading) {
    return <Loader />;
  }

  return (
    <Container>
      {
        formState === FormStates.register && (
          <Register
            username={form.username}
            email={form.email}
            password={form.password}
            updateUsername={updateForm('username')}
            updateEmail={updateForm('email')}
            updatePassword={updateForm('password')}
            signUp={signUp}
          />
        )
      }
      {
        formState === FormStates.confirm && (
          <Confirmation
            email={form.email}
            confirmCode={form.confirmCode}
            updateConfirmCode={updateForm('confirmCode')}
            confirm={confirmSignUp}
          />
        )
      }
      {
        formState === FormStates.login && (
          <Login
            username={form.username}
            password={form.password}
            updateUsername={updateForm('username')}
            updatePassword={updateForm('password')}
            login={login}
          />
        )
      }
      {
        formState === FormStates.forgotPassword && (
          <ForgotPassword
            username={form.username}
            updateUsername={updateForm('username')}
            sendForgotCode={sendForgotCode}
          />
        )
      }
      {
        formState === FormStates.newPassword && (
          <SubmitNewPassword
            username={form.username}
            forgotCode={form.forgotCode}
            newPassword={form.newPassword}
            updateForgotCode={updateForm('forgotCode')}
            updateNewPassword={updateForm('newPassword')}
            submitNewPassword={submitNewPassword}
          />
        )
      }
      <AuthOptions
        currentFormState={formState}
        showRegister={setFormStateTo(FormStates.register)}
        showLogin={setFormStateTo(FormStates.login)}
        showForgetPassword={setFormStateTo(FormStates.forgotPassword)}
      />
    </Container>
  );
};

export default AuthScreen;
