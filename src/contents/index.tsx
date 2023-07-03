import ErrorContent from "./ErrorContent";
import type { Position } from "./TranslateBtn";
import TranslateBtn from "./TranslateBtn";
import WordContent from "./WordContent";
import { sendToBackground } from "@plasmohq/messaging";
import cssText from "data-text:~/contents/style.css";
import { debounce } from "lodash";
import type { PlasmoCSUIJSXContainer, PlasmoRender } from "plasmo";
import { createRoot } from "react-dom/client";
import type { ErrorRes } from "~api";
import type { WordInfo } from "~background/messages/translate";


export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
};

export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
  anchor,
  createRootContainer,
}) => {
  const rootContainer = await createRootContainer(anchor);
  const root = createRoot(rootContainer);
  let position: Position;

  function renderTranslateBtn(word: string): void {
    if (!word) {
      return;
    }

    async function translate(word: string): Promise<void> {
      const userInfo = await sendToBackground<ErrorRes, WordInfo>({
        name: "user",
      });

      if (userInfo.msg) {
        renderModal(userInfo)
        return
      }

      const wordInfo = await sendToBackground<any, WordInfo>({
        name: "translate",
        body: {
          word,
        },
      });

      renderModal(wordInfo);
    }

    root.render(
      <TranslateBtn position={position} onClick={() => translate(word)} />
    );
  }

  function renderModal(wordInfo: WordInfo): void {
    if (!wordInfo) {
      return;
    }

    const Content = wordInfo.msg ? (
      <ErrorContent wordInfo={wordInfo} />
    ) : (
      <WordContent wordInfo={wordInfo} />
    );

    root.render(
      <div className="modal" style={{ ...position }}>
        {Content}
      </div>
    );
  }

  function close(): void {
    root.render(null);
    document.removeEventListener("click", close);
  }

  function handleSelect() {
    const selection = window.getSelection();

    if (selection.rangeCount < 1) {
      return;
    }

    const word = selection.toString();
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    position = { left: rect.left, top: rect.bottom };

    renderTranslateBtn(word);

    // 点击外侧关闭弹框
    setTimeout(() => {
      document.addEventListener("click", close);
    }, 500);
  }

  document.addEventListener("selectionchange", debounce(handleSelect, 500));
};