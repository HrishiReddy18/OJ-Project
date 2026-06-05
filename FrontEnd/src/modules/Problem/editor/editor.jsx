import React, { useContext, useState } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import "./editor.scss";
import { inputContext } from "../../shared/inputContext";

const Editor = () => {
  const [language, SetLanguage] = useState("java");
  const languageTemplates = {
    javascript: `// JS template
function solve(input) {
  return input;
}

console.log(solve("Hello"));
`,
    java: `// Java template
public class Main {
  public static void main(String[] args) {
    System.out.println("Hello World");
  }
}
`,
    python: `# Python template
print("Hello World")
`,
    cpp: `#include <bits/stdc++.h>
using namespace std;
int main() {
}
`,
  };
  const [code, setCode] = useState(languageTemplates[language]);
  const { getInput } = useContext(inputContext);

  const chooseLanguage = (e) => {
    SetLanguage(e.target.value);
    getInput({ code: code, language: e.target.value });
  };
  const generateInput = (value) => {
    setCode(value); //it is called , but state variables are updated only when re-rendered
    console.log(code);
    //**************************************************************************************** */
    // DOUBT: This is major , because react bundles multiple statement into one and execute at same time
    // getInput({ code: code, language: language });
    //***************************************************************************************************** */
    getInput({ code: value, language: language });
  };
  return (
    <div className="editor-container">
      <select
        onChange={(e) => {
          chooseLanguage(e);
        }}
      >
        {/* onchange it will pass a event */}
        <option value="java">java</option>
        <option value="python">python</option>
        <option value="cpp">cpp</option>
      </select>
      <MonacoEditor
        className="monacoEditor"
        language={language}
        key={language}
        value={code}
        theme="vs-dark"
        onChange={(value) => generateInput(value)}
      />
    </div>
  );
};

export default Editor;
