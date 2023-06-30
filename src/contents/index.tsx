import Modal, { type WordInfo } from "./Modal";
import type { Position } from "./TranslateBtn";
import TranslateBtn from "./TranslateBtn";
import { sendToBackground } from "@plasmohq/messaging";
import cssText from "data-text:~/contents/style.css";
import { debounce } from "lodash";
import type { PlasmoCSUIJSXContainer, PlasmoRender } from "plasmo";
import { createRoot } from "react-dom/client";

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

    root.render(
      <TranslateBtn position={position} onClick={() => translate(word)} />
    );
  }

  function renderModal(wordInfo: WordInfo): void {
    if (!wordInfo) {
      return;
    }

    root.render(<Modal wordInfo={wordInfo} position={position} />);
  }

  function close(): void {
    root.render(null);
    document.removeEventListener('click', close)
  }

  async function translate(word: string): Promise<void> {
    const wordInfo = await sendToBackground<any, WordInfo>({
      name: "translate",
      body: {
        word,
      },
    });

    renderModal(wordInfo);
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