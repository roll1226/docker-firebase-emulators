import { forwardRef, useImperativeHandle, useRef } from "react";

// Propsの型を定義
type CustomInputProps = {
  placeholder?: string; // 任意のplaceholder
  value?: string; // 入力値
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // onChangeイベントハンドラー
};

type CustomHandle = {
  focus: () => void;
  scrollIntoView: () => void;
};

const MyInputs = forwardRef<CustomHandle, CustomInputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current?.focus();
    },
    scrollIntoView() {
      inputRef.current?.scrollIntoView();
    },
  }));

  return <input ref={inputRef} {...props} />;
});

export default MyInputs;
