import Head from "next/head";
import firebase from "firebase";
import { useEffect, useState } from "react";
import Axios from "axios";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDo40La6wagjNgck6SgFepkeZ8tHNDsXGg",
    authDomain: "decent-line-296513.firebaseapp.com",
  });
}

export function MainPage() {
  const [email, setEmail] = useState("kamilwronka7@gmail.com");
  const [password, setPassword] = useState("Kamilo108");
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(firebase.auth().currentUser);
      setUser(firebase.auth().currentUser);
    });
  }, []);

  useEffect(() => {
    if (user) {
      Axios.get(
        "http://localhost:4000/memes-service/memes?page=1&pageSize=12"
      ).then((res) => console.log(res.data));
    }
  }, [user]);

  function login(e) {
    e.preventDefault();

    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase.auth().signInWithEmailAndPassword(email, password);
      });
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={login}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      cancerus maximus
    </div>
  );
}
