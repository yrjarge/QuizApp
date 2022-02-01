import React, { useEffect, useContext, useState } from "react";
import { Text, Button, View } from "react-native";
import SessionContext from "../context/SessionToken/sessionContext";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const sessionContext = useContext(SessionContext);
  const { setToken } = sessionContext;

  const auth = getAuth();
  const db = getDatabase();
  const currentUser = auth.currentUser; //returns null if no user is logged in
  if (currentUser){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `user/${currentUser.uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      setUsername(snapshot.val().name);
    }}).catch((error) => {
      console.error(error);
    });
  }
  
  
  useEffect(() => {
    const startSession = async () => {
      await setToken();
    };
    startSession();
  }, []);
  if (!currentUser){
    return (
      <View>
        <Text>Welcome! Press "Start new Quiz" to play as a guest!</Text>
        <Button
          title="Start new Quiz!"
          onPress={() => navigation.navigate("QuizForm")}
        />
        <Button
          title="Login"
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          title="Sign up"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>Welcome! Homo {username}</Text>
        <Button
          title="Start new Quiz!"
          onPress={() => navigation.navigate("QuizForm")}
        />
        <Button
          title="Login"
          onPress={() => navigation.navigate("Login")}
        />
        <Button
          title="Sign up"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    );
  }
}

