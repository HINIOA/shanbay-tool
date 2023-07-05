import { sendToBackground } from "@plasmohq/messaging";
import type { PlasmoCSUIJSXContainer, PlasmoRender } from "plasmo";
import type { FC, MouseEventHandler } from "react";
import type { ErrorRes } from "~api";
import type { WordInfo } from "~background/messages/translate";

export interface Position {
  left: number;
  top: number;
}

interface TranslateBtnProps {
  word: string;
  position: Position;
  onTranslate: (wordInfo: WordInfo) => void;
}

const TranslateBtn: FC<TranslateBtnProps> = ({
  word,
  position,
  onTranslate,
}) => {
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
    <button className="translate-btn" style={position} onClick={handleClick}>
      扇贝翻译
    </button>
  );
};

export default TranslateBtn;

// 取消自动渲染
export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async () => {};
