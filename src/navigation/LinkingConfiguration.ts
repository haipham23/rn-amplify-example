import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Auth: {
            screens: {
              AuthScreen: 'auth'
            }
          },
          Main: {
            screens: {
              MainScreen: 'main'
            }
          }
        }
      },
      NotFound: '*'
    }
  }
};
