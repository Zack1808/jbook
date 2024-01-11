import { useEffect, useRef } from "react";

import "./Preview.css";

interface PreviewPropsType {
  code: string;
}

const html = `
  <html>
    <head>
      <style>
        html {
          background-color: white
        }
      </style>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (err) => {
          const root = document.getElementById("root")
          root.innerHTML = "<div style='color: red;'><h4>Runtime Error:</h4>" + err + "</div>"
          console.error(err)
        }

        window.addEventListener('error', (event) => {
          event.preventDefault()
          handleError(event.error)
        })

        window.addEventListener('message', (event) => {
          try {
            eval(event.data)
          } catch (err) {
            handleError(err)
          }
        }, false)
      </script>
    </body>
  </html>
`;

const Preview: React.FC<PreviewPropsType> = ({ code }) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    const timer = setTimeout(() => {
      iframe.current?.contentWindow.postMessage(code, "*");
    }, 100);

    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default Preview;
