/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from "react";
import { StyleSheet, View, Text, Button, LogBox } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
//Screens
import HomeScreen from "./src/screens/HomeScreen";
import QuizForm from "./src/screens/QuizForm";
import Quiz from "./src/screens/Quiz";
import CongratzScreen from "./src/screens/CongratzScreen";
import LoginScreen from "./src/screens/Login";
import SignupScreen from "./src/screens/Signup";
import SignupConfirmScreen from "./src/screens/SignupConfirm";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
//states
import QuestionState from "./src/context/Questions/QuestionState";
import SessionState from "./src/context/SessionToken/SessionState";
import ScoreState from "./src/context/Score/ScoreState";
import { Header } from "react-native/Libraries/NewAppScreen";
//firebase
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const style = StyleSheet.create({
  headerIcon: {
    marginRight: 10,
  },
  root: {
    backgroundColor: "white",
  },
});

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyAXMpuTA1mPGUEhErF4ysDfn7-S620XZHo",
  authDomain: "dima-75489.firebaseapp.com",
  databaseURL:
    "https://dima-75489-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "dima-75489",
  storageBucket: "dima-75489.appspot.com",
  messagingSenderId: "838745386187",
  appId: "1:838745386187:web:e1d72786e267eea152bf4e",
};
//inits firebaseapp
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth();
const c_user = auth.currentUser; //Is null if not logged in
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loaded: true,
        });
      } else {
        this.setState({
          loaded: true,
        });
      }
    });
  }

  render() {
    const { loaded } = this.state;
    LogBox.ignoreLogs(["Setting a timer", "AsyncStorage has been"]);
    //returns loading screen
    if (!loaded) {
      return (
        //DISPLAY LOADING SCREEN
        <View>
          <Text>LOADING</Text>
        </View>
      );
    } else {
      return (
        <SessionState>
          <QuestionState>
            <ScoreState>
              <NavigationContainer style={style.root}>
                <Stack.Navigator
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: "#1e3b52",
                    },
                    headerTintColor: "#fff",
                  }}
                  initialRouteName="Home"
                >
                  <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    style={style.root}
                  />
                  <Stack.Screen name="QuizForm" component={QuizForm} />
                  <Stack.Screen name="Quiz" component={Quiz} />
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Signup" component={SignupScreen} />
                  <Stack.Screen
                    name="SignupConfirm"
                    component={SignupConfirmScreen}
                  />
                  <Stack.Screen
                    name="Forgot Password"
                    component={ForgotPasswordScreen}
                  />
                  <Stack.Screen
                    name="Reset Password"
                    component={ResetPasswordScreen}
                  />
                  <Stack.Screen
                    name="Congratz"
                    component={CongratzScreen}
                    options={({ navigation }) => ({
                      headerLeft: () => (
                        <View style={{ marginRight: 15 }}>
                          <Button
                            title="Home"
                            onPress={() => navigation.navigate("Home")}
                          />
                        </View>
                      ),
                    })}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </ScoreState>
          </QuestionState>
        </SessionState>
      );
    }
  }
}

export default App;
