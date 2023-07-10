import ErrorContent from "./ErrorContent";
import WordContent from "./WordContent";
import type { PlasmoCSUIJSXContainer, PlasmoRender } from "plasmo";
import { type FC } from "react";
import type { WordInfo } from "~background/messages/translate";
import type { Position } from "~contents/TranslateBtn";
import { useOverflow } from "~contents/hooks";

const Modal: FC<{
  position: Position;
  wordInfo: WordInfo;
  visible: boolean;
}> = ({ visible, position, wordInfo }) => {
  const { style, ref } = useOverflow(position, visible);

  return (
    <div ref={ref} style={style} className="modal">
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
