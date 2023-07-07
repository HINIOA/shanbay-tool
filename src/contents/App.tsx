import Modal from "./Modal";
import TranslateBtn from "./TranslateBtn";
import { useClickOutside, useSelect } from "./hooks";
import cssText from "data-text:~/contents/style.css";
import { type FC, useState, type PropsWithChildren } from "react";
import type { WordInfo } from "~background/messages/translate";

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

const Wrapper: FC<
  PropsWithChildren<{
    visible: boolean;
    onClickOutside: () => void;
  }>
> = ({ visible, children, onClickOutside }) => {
  const { ref, onWrapperClick } =
    useClickOutside<HTMLDivElement>(500, onClickOutside);

  return (
    <div
      ref={ref}
      style={{ visibility: visible ? "visible" : "hidden" }}
      onClick={onWrapperClick}
    >
      {children}
    </div>
  );
};

const App: FC = () => {
  const [visible, setVisible] = useState(false);
  const [wordInfo, setWordInfo] = useState<WordInfo>();
  const { selection, position } = useSelect(() => {
    setVisible(true);
  });

  if (!selection) {
    return null;
  }

  function handleClickOutside() {
    setVisible(false)
    setWordInfo(undefined)
  }

  return (
    <Wrapper visible={visible} onClickOutside={handleClickOutside}>
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
    </Wrapper>
  );
};

export default App;
