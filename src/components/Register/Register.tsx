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
  email: string,
  password: string,
  updateUsername(username: string): void,
  updateEmail(emai: string): void,
  updatePassword(password: string): void,
  signUp(): void,
}

const Register = ({
  username,
  email,
  password,
  updateUsername,
  updateEmail,
  updatePassword,
  signUp
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
      <Item floatingLabel>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={updateEmail}
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
      <Button full style={styles.button} onPress={signUp}>
        <Text>Sign Up</Text>
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

export default Register;
