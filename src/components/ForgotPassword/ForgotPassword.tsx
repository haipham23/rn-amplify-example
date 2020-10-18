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
  updateUsername(username: string): void,
  sendForgotCode(): void
}

const ForgotPassword = ({
  username,
  updateUsername,
  sendForgotCode
}: Props) => (
  <View style={styles.content}>
    <Form>
      <Item floatingLabel last>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={updateUsername}
        />
      </Item>
      <Button full style={styles.button} onPress={sendForgotCode}>
        <Text>Send code</Text>
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

export default ForgotPassword;
