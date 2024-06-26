Bibliotecas
~~~ bash
npm install axios
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
npx expo install expo-secure-store
~~~

Para utilizar o expo-secure-store, inserir em app.json 
~~~ js
{
  "expo": {
    "ios": {
      "config": {
        "usesNonExemptEncryption": false
      }
      ... 
    }
  }
}
~~~