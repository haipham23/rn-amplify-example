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
  email: string,
  confirmCode: string,
  updateConfirmCode(confirmCode: string): void,
  confirm(): void,
}

const Confirmation = ({
  email,
  confirmCode,
  updateConfirmCode,
  confirm
}: Props) => (
  <View style={styles.content}>
    <Text>
      {`Code was sent to your email at ${email}.`}
    </Text>
    <Form>
      <Item floatingLabel last>
        <Input
          placeholder="Confirmation code"
          value={confirmCode}
          onChangeText={updateConfirmCode}
        />
      </Item>
      <Button full style={styles.button} onPress={confirm}>
        <Text>Confirm</Text>
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

export default Confirmation;
