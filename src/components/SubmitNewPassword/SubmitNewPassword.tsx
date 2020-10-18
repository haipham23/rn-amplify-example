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
  forgotCode: string,
  newPassword: string,
  updateForgotCode(forgotCode: string): void,
  updateNewPassword(newPassword: string): void,
  submitNewPassword(): void
}

const SubmitNewPassword = ({
  username,
  forgotCode,
  newPassword,
  updateForgotCode,
  updateNewPassword,
  submitNewPassword
}: Props) => (
  <View style={styles.content}>
    <Form>
      <Item floatingLabel>
        <Input
          placeholder="Username"
          value={username}
          disabled
        />
      </Item>
      <Item floatingLabel>
        <Input
          keyboardType="number-pad"
          placeholder="Code"
          value={forgotCode}
          onChangeText={updateForgotCode}
        />
      </Item>
      <Item floatingLabel last>
        <Input
          secureTextEntry
          placeholder="New password"
          value={newPassword}
          onChangeText={updateNewPassword}
        />
      </Item>
      <Button full style={styles.button} onPress={submitNewPassword}>
        <Text>Save</Text>
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

export default SubmitNewPassword;
