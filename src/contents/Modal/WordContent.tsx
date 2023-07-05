import { sendToBackground } from "@plasmohq/messaging";
import cssText from "data-text:~/contents/style.css";
import type { PlasmoCSUIJSXContainer, PlasmoRender } from "plasmo";
import { useState, type FC } from "react";
import type { WordInfo } from "~background/messages/translate";

interface ModalProps {
  wordInfo: WordInfo;
}

const PART_OF_SPEECH = {
  "n.": "名词",
  "pron.": "代词",
  "adj.": "形容词",
  "v.": "动词",
  "vt.": "动词",
  "adv.": "副词",
  "conj.": "连词",
  "prep.": "介词",
  "auxv.": "助动词",
  "art.": "冠词",
  "article.": "冠词",
  "abbr.": "缩写",
  "num.": "量词",
  "defa.": "默认",
  "aux. v.": "助动词",
  "phrase.": "短语",
  "mod. v.": "情态动词",
  "linkv.": "连系动词",
  "int.": "未知", // come
  "infinmarker.": "不定词标记", // to
  ".": "未知", // Gatsby
  "un.": "未知", // workflow
};

function speak(src: string) {
  const audio = document.createElement("audio");
  audio.src = src;
  audio.play();
}

const WordModal: FC<ModalProps> = ({ wordInfo }) => {
  const { id, exists, content, audios, definitions } = wordInfo;

  function handleSpeak() {
    speak(audios[0].us.urls[0]);
  }

  const [isAdded, setIsAdded] = useState(false);

  async function handleCollect() {
    const res = await sendToBackground<any, any>({
      name: "collect",
      body: {
        wordId: id,
      },
    });

    res && setIsAdded(true);
  }

  return (
    <>
      <div className="word">{content}</div>
      <div>
        <span className="phonetic">/{audios[0].us.ipa}/</span>
        <span className="speaker" onClick={handleSpeak}>
          🔉
        </span>
      </div>
      <ul>
        {definitions.cn.map(({ pos, def }) => (
          <li key={pos}>
            【<b>{PART_OF_SPEECH[pos]}</b>】 {def}
          </li>
        ))}
      </ul>
      <ul>
        {definitions.en.map(({ pos, def }) => (
          <li key={pos}>
            <em>
              <b>{pos}</b>
            </em>{" "}
            {def}
          </li>
        ))}
      </ul>
      {isAdded ? (
        <a href={`https://web.shanbay.com/wordsweb/#/detail/${id}`}>
          已加入扇贝生词本，去扇贝网学习
        </a>
      ) : (
        <a className="collect" onClick={handleCollect}>
          {exists ? "我忘了" : "+添加到扇贝生词本"}
        </a>
      )}
    </>
  );
};

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

// 取消自动渲染
export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async () => {};

export default WordModal;
