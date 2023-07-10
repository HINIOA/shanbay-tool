import { useOverflow } from "./hooks";
import { sendToBackground } from "@plasmohq/messaging";
import type { PlasmoCSUIJSXContainer, PlasmoRender } from "plasmo";
import type { FC, MouseEventHandler } from "react";
import type { ErrorRes } from "~api";
import type { WordInfo } from "~background/messages/translate";

export interface Position {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}

interface TranslateBtnProps {
  word: string;
  visible: boolean;
  position: Position;
  onTranslate: (wordInfo: WordInfo) => void;
}

const TranslateBtn: FC<TranslateBtnProps> = ({
  word,
  visible,
  position,
  onTranslate,
}) => {
  const { style, ref } = useOverflow(position, visible);

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();

    const userInfo = await sendToBackground<ErrorRes, WordInfo>({
      name: "user",
    });

    if (userInfo.msg) {
      onTranslate(userInfo);
      return;
    }

    const wordInfo = await sendToBackground<any, WordInfo>({
      name: "translate",
      body: {
        word,
      },
    });

    onTranslate(wordInfo);
  };

  return (
    <button
      ref={ref}
      style={style}
      className="translate-btn"
      onClick={handleClick}
    >
      扇贝翻译
    </button>
  );
};

export default TranslateBtn;

// 取消自动渲染
export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async () => {};
