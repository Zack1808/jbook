import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";

const App = () => {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const ref = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInput(event.target.value);

  const onClick = async () => {
    if (!ref.current) return;
    const result = await ref.current.transform(input, {
      loader: "jsx",
      target: "es2015",
    });
    setCode(result.code);
  };

  return (
    <div>
      <textarea value={input} onChange={onChange}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

export default App;
