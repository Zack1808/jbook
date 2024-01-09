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
    console.log(ref.current);
  };

  useEffect(() => {
    startService();
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setInput(event.target.value);

  const onClick = () => {
    console.log(input);
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
