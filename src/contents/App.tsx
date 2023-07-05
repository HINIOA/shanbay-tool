import Modal from "./Modal";
import TranslateBtn from "./TranslateBtn";
import { useClickOutside, useSelect } from "./hooks";
import cssText from "data-text:~/contents/style.css";
import { type FC, useState } from "react";
import type { WordInfo } from "~background/messages/translate";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const App: FC = () => {
  const [wordInfo, setWordInfo] = useState<WordInfo>();
  const { ref, visible, setVisible } = useClickOutside<HTMLDivElement>(
    false,
    () => setWordInfo(undefined)
  );
  const { selection, position } = useSelect(() => setVisible(true));

  return (
    <div ref={ref} style={{ visibility: visible ? "visible" : "hidden" }}>
      {wordInfo ? (
        <Modal position={position} wordInfo={wordInfo} />
      ) : (
        <TranslateBtn
          key={selection}
          word={selection}
          position={position}
          onTranslate={setWordInfo}
        />
      )}
    </div>
  );
};

export default App;
