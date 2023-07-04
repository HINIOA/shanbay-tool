import notFoundImage from "data-base64:~assets/404.png";
import type { PlasmoCSUIJSXContainer, PlasmoRender } from "plasmo";
import { type FC } from "react";
import type { WordInfo } from "~background/messages/translate";

interface ModalProps {
  wordInfo: WordInfo;
}

const ErrorContent: FC<ModalProps> = ({ wordInfo }) => {
  const { msg } = wordInfo;

  return msg === "登录信息过期" ? (
    <a href="https://web.shanbay.com/web/account/login" target="_blank">
      去扇贝网登录
    </a>
  ) : (
    <img src={notFoundImage} alt="没有在扇贝网中查到该词" />
  );
};

// 取消自动渲染
export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async () => {};

export default ErrorContent;
