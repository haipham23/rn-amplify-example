import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Item,
  Form,
  Input,
  Button,
  Text
} from 'native-base';

interface Props {
  username: string,
  password: string,
  updateUsername(username: string): void,
  updatePassword(password: string): void,
  login(): void,
}

const Login = ({
  username,
  password,
  updateUsername,
  updatePassword,
  login
}: Props) => (
  <View style={styles.content}>
    <Form>
      <Item floatingLabel>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={updateUsername}
        />
      </Item>
      <Item floatingLabel last>
        <Input
          secureTextEntry
          placeholder="Password"
          value={password}
          onChangeText={updatePassword}
        />
      </Item>
      <Button full style={styles.button} onPress={login}>
        <Text>Login</Text>
      </Button>
    </Form>
  </View>
);

const styles = StyleSheet.create({
  button: {
    marginVertical: 40
  },
  content: {
    padding: 10
  }
});

export default Login;
