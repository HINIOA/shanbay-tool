import type { PlasmoCSUIJSXContainer, PlasmoRender } from "plasmo";
import {
  type FC,
} from "react";
import type { WordInfo } from "~background/messages/translate";
import type { Position } from "~contents/TranslateBtn";
import ErrorContent from "./ErrorContent";
import WordContent from "./WordContent";

const Modal: FC<{ position: Position, wordInfo: WordInfo }> = ({
  position,
  wordInfo,
}) => {

  return (
    <div
      className="modal"
      style={position}
    >
      {wordInfo.msg ? (
      <ErrorContent wordInfo={wordInfo} />
    ) : (
      <WordContent wordInfo={wordInfo} />
    )}
    </div>
  );
};

// 取消自动渲染
export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async () => {};

export default Modal;
