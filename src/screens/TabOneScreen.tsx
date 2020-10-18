import * as React from 'react';
import Auth from '@aws-amplify/auth';
import { Container } from 'native-base';

import Register from '../components/Register';
import Confirmation from '../components/Confirmation';
import Login from '../components/Login';
import Loader from '../components/Loader';
import AuthOptions from '../components/AuthOptions';

interface IForm {
  username: string,
  email: string;
  password: string;
  confirmCode: string;
}

interface Props {
  navigation: any;
}

const initialForm = {
  username: '',
  email: '',
  password: '',
  confirmCode: ''
};

const TabOneScreen = ({ navigation }: Props) => {
  const [form, setForm] = React.useState<IForm>(initialForm);
  const [formState, setFormState] = React.useState<string>('loading');

  React.useEffect(() => {
    const navigateIfAuth = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();

        if (user) {
          navigation.navigate('TabTwo');
          return;
        }

        setFormState('register');
      } catch (e) {
        // logged out
        setFormState('login');
      }
    };

    navigateIfAuth();

    return () => setFormState('login');
  }, []);

  const updateForm = (key: string) => (text: string) => setForm({ ...form, [key]: text });

  const setFormStateTo = (key: string) => () => setFormState(key);

  const signUp = async () => {
    setFormState('loading');

    try {
      await Auth.signUp({
        username: form.username,
        password: form.password,
        attributes: {
          email: form.email
        }
      });
      setFormState('confirm');
    } catch (e) {
      console.log(e);
      setFormState('register');
    }
  };

  const confirmSignUp = async () => {
    try {
      setFormState('loading');
      await Auth.confirmSignUp(form.username, form.confirmCode);
      setFormState('login');
    } catch (e) {
      console.log(e);
      setFormState('register');
    } finally {
      setForm(initialForm);
    }
  };

  const login = async () => {
    try {
      setFormState('loading');
      await Auth.signIn(form.username, form.password);
      setForm(initialForm);

      navigation.navigate('TabTwo');
    } catch (e) {
      console.log(e);
    } finally {
      setFormState('login');
    }
  };

  if (formState === 'loading') {
    return <Loader />;
  }

  return (
    <Container>
      {
        formState === 'register' && (
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
        formState === 'confirm' && (
          <Confirmation
            email={form.email}
            confirmCode={form.confirmCode}
            updateConfirmCode={updateForm('confirmCode')}
            confirm={confirmSignUp}
          />
        )
      }
      {
        formState === 'login' && (
          <Login
            username={form.username}
            password={form.password}
            updateUsername={updateForm('username')}
            updatePassword={updateForm('password')}
            login={login}
          />
        )
      }
      <AuthOptions
        currentFormState={formState}
        showRegister={setFormStateTo('register')}
        showLogin={setFormStateTo('login')}
        showForgetPassword={setFormStateTo('forgetPassword')}
      />
    </Container>
  );
};

export default TabOneScreen;
