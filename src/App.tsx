import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { useCallback, useState } from "react";
import "./App.css";
import { auth } from "./firebase";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singUpHandler = useCallback(async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  }, [email, password]);

  const signInHandler = useCallback(async () => {
    await signInWithEmailAndPassword(auth, email, password);
  }, [email, password]);

  return (
    <>
      <label>
        メールアドレス
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        パスワード
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button onClick={singUpHandler}>新規登録</button>
      <button onClick={signInHandler}>ログイン</button>
    </>
  );
}

export default App;
