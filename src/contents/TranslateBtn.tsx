import type { PlasmoCSUIJSXContainer, PlasmoRender } from "plasmo";
import type { ButtonHTMLAttributes, FC } from "react";

export interface Position {
  left: number;
  top: number;
}

interface TranslateBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  position: Position;
}

const TranslateBtn: FC<TranslateBtnProps> = ({ position, ...extra }) => {
  const { left, top } = position || {};
  return (
    <button
      className="translate-btn"
      style={{ position: "fixed", left, top }}
      {...extra}
    >
      扇贝翻译
    </button>
  );
};

export default TranslateBtn;

// 取消自动渲染
export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async () => {};
