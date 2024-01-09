import { useState } from "react";

const App = () => {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");

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
      <div>{code}</div>
    </div>
  );
};

export default App;
