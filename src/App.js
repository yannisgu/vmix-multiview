import "./App.css";
import xml from "fast-xml-parser";
import { useEffect, useState } from "react";

const url = "http://127.0.0.1:8088/API/";
//const url = "/sample.xml";

const inputWidth = 432;
const inputHeight = 243;
const titleHeight = 27;
const gap = 10;

const parser = new xml.XMLParser();

function App() {

  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    let isRunning = true;
    (async () => {
      while (isRunning) {
        try {
          const r = await fetch(url);
          const body = await r.text();
          const data = parser.parse(body);
          console.log(data);
          setInputs(data.vmix.inputs.input);
        } catch (e) {
          console.error(e);
        }
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    })();
    return () => {
      isRunning = false;
    };
  }, []);
  return (
    <div className="App" style={{
      display: "grid",
      gridTemplateColumns: "repeat(4, " + inputWidth +  "px)",
      columnGap: gap
    }}>
      {inputs.slice(0, 16).map((input, i) => {
        return (
          <div
            key={i}
            style={{ width: inputWidth, height: inputHeight + titleHeight }}
          >
            <div
              style={{
                height: titleHeight,
                background: "#001D67",
                color: "white",
                fontWeight: "bold",
                lineHeight: titleHeight + "px"
              }}
            >
              {input["#text"] || input}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
