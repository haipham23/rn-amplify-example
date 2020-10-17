import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'native-base';

interface Props {
  currentFormState: string,
  showRegister(): void,
  showLogin(): void,
  showForgetPassword(): void,
  showResendEmail(): void,
}

const AuthOptions = ({
  currentFormState,
  showRegister,
  showLogin,
  showForgetPassword,
  showResendEmail
}: Props) => (
  <View style={styles.content}>
    {
      currentFormState !== 'register' && (
        <Button transparent onPress={showRegister}>
          <Text>Register</Text>
        </Button>
      )
    }
    {
      currentFormState !== 'login' && (
        <Button transparent onPress={showLogin}>
          <Text>Login</Text>
        </Button>
      )
    }
    {
      currentFormState !== 'forgetPassword' && (
        <Button transparent onPress={showForgetPassword}>
          <Text>Forget your password?</Text>
        </Button>
      )
    }
    {
      currentFormState !== 'resendEmail' && (
        <Button transparent onPress={showResendEmail}>
          <Text>Resend confirmation code.</Text>
        </Button>
      )
    }
  </View>
);

const styles = StyleSheet.create({
  content: {
    padding: 10
  }
});

export default AuthOptions;
