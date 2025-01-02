import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import {
  // startTransition,
  useCallback,
  useDeferredValue,
  useId,
  useReducer,
  useRef,
  // useMemo,
  useState,
} from "react";
import "./App.css";
import MyInputs from "./components/MyInput";
import SlowList from "./components/SlowList";
import { auth } from "./firebase";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const singUpHandler = useCallback(async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((r) => console.log(r))
      .catch((e) => console.error(e));
  }, [email, password]);

  const signInHandler = useCallback(async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((r) => console.log(r))
      .catch((e) => console.error(e));
  }, [email, password]);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const handleCount = () => {
    setTimeout(() => {
      setCount1((count) => count + 1);
      setCount2((count) => count + 1);
    }, 1000);
  };

  console.log("rendering", new Date().toLocaleTimeString());

  // const [input, setInput] = useState("");
  // const [list, setList] = useState<string[]>([]);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setInput(value);

  //   startTransition(() => {
  //     if (!value) return setList([]);
  //     const newList = Array(20000)
  //       .fill(null)
  //       .map((_, i) => `${value}-${i}`);
  //     setList(newList);
  //   });
  // };

  // const [input2, setInput2] = useState("");
  // const deferredInput = useDeferredValue(input2);

  // const list2 = useMemo(
  //   () =>
  //     Array(2000)
  //       .fill(null)
  //       .map((_, i) => `${deferredInput} - Item ${i}`),
  //   [deferredInput]
  // );

  const id = useId();

  const [input3, setInput3] = useState("");
  const deferredInput3 = useDeferredValue(input3);

  const customInputRef = useRef<{
    focus: () => void;
    scrollIntoView: () => void;
  }>(null);

  const handleFocus = () => {
    customInputRef.current?.focus();
  };

  const handleScroll = () => {
    customInputRef.current?.scrollIntoView();
  };

  const [state, dispatch] = useReducer(
    (state: { count: number }, actions: string) => {
      switch (actions) {
        case "increment":
          return { count: state.count + 1 };
        case "decrement":
          return { count: state.count - 1 };
        default:
          return state;
      }
    },
    { count: 0 }
  );

  return (
    <>
      <button onClick={handleScroll}>Scroll to Input</button>
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

      <div>
        <button onClick={handleCount}>カウント</button>
        <div>count1: {count1}</div>
        <div>count2: {count2}</div>
      </div>

      {/* <div>
        <h3>startTransition</h3>
        <input type="text" value={input} onChange={handleChange} />
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div> */}

      {/* <div>
        <h3>deferredInput</h3>
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
        />
        <ul>
          {list2.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div> */}

      <div>
        <p>id: {id}</p>
      </div>

      <div>
        <h3>最適化</h3>
        <input
          type="text"
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
        />
        <SlowList text={deferredInput3} />
      </div>

      <div>
        <h3>useImperativeHandle</h3>
        <MyInputs
          ref={customInputRef}
          placeholder="Enter text"
          onChange={(e) => console.log(e.target.value)}
        />
        <button onClick={handleFocus}>Focus Input</button>
      </div>

      <div>
        <h3>useReducer</h3>
        <div>Count: {state.count}</div>
        <button onClick={() => dispatch("increment")}>Increment</button>
        <button onClick={() => dispatch("decrement")}>Decrement</button>
      </div>
    </>
  );
}

export default App;
