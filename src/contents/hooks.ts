import type { Position } from "./TranslateBtn";
import { debounce } from "lodash";
import {
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
  type RefCallback,
  type CSSProperties,
} from "react";

/** 添加选择事件处理的 Hook，返回选中值及鼠标位置。 */
export function useSelect(onSelect: () => void): {
  selection: string;
  position?: Position;
} {
  const [selection, setSelection] = useState<string>();
  const [position, setPosition] = useState<Position>();

  useEffect(() => {
    const handleSelect = debounce(() => {
      const selection = window.getSelection();
      const word = selection.toString();

      if (selection.rangeCount < 1 || !word) {
        return;
      }

      setSelection(word);

      const range = selection.getRangeAt(0);
      const { top, left, right, bottom } = range.getBoundingClientRect();

      setPosition({
        top: top + window.scrollY,
        left: left + window.scrollX,
        right: right + window.scrollX,
        bottom: bottom + window.scrollY,
      });

      onSelect();
    }, 500);

    document.addEventListener("selectionchange", handleSelect);
  }, []);

  return { selection, position };
}

/** 点击元素外层的 Hook */
export function useClickOutside<E extends Element>(
  wait?: number,
  onClickOutside?: () => void
) {
  const ref = useRef<E>(null);

  useEffect(() => {
    function handleClick(e: Event): void {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside?.();
      }
    }

    // timeout 是为了解决元素显示同时点击外层的误关闭问题
    setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, wait);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [wait, onClickOutside]);

  const onWrapperClick: MouseEventHandler<E> = (e) => {
    e.stopPropagation();
  };

  return { ref, onWrapperClick };
}

/** 当元素超过窗口，重新计算元素位置并返回 */
export function useOverflow<E extends Element>(
  selectionPosition: Position,
  initVisible: boolean
): {
  style: CSSProperties;
  ref: RefCallback<E>;
} {
  const [position, setPosition] = useState<Position>({
    top: selectionPosition.bottom, // 默认在选中内容的底部显示
    left: selectionPosition.left,
  });
  const [visible, setVisible] = useState(false);

  const ref: RefCallback<E> = (node) => {
    if (!node || visible) {
      return;
    }

    const { right, bottom, height } = node.getBoundingClientRect();

    setPosition((position) => {
      if (right > window.innerWidth) {
        delete position.left;
        position.right = 0;
      }

      if (bottom > window.innerHeight) {
        position.top = selectionPosition.top - height - 12;
      }

      return position;
    });
    setVisible(true);
  };

  return {
    style: {
      ...position,
      visibility: visible && initVisible ? "visible" : "hidden",
    },
    ref,
  };
}
