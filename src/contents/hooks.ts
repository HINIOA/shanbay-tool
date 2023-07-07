import type { Position } from "./TranslateBtn";
import { debounce } from "lodash";
import { useEffect, useRef, useState, type MouseEventHandler } from "react";

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
      const rect = range.getBoundingClientRect();

      setPosition({
        left: rect.left + window.scrollX,
        top: rect.bottom + window.scrollY,
      });

      onSelect();
    });

    document.addEventListener("selectionchange", handleSelect);
  }, []);

  return { selection, position };
}

/** 点击元素外层的 Hook */
export function useClickOutside<E extends Element>(
  initVisible: boolean,
  onClickOutside?: () => void
) {
  const [visible, setVisible] = useState(initVisible);
  const ref = useRef<E>(null);

  useEffect(() => {
    function handleClick(e: Event): void {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setVisible(false);
        onClickOutside?.();
      }
    }

    // timeout 是为了解决元素显示同时点击外层的误关闭问题
    setTimeout(() => {
      document.addEventListener("click", handleClick);
    }, 100);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const onWrapperClick: MouseEventHandler<E> = (e) => {
    e.stopPropagation();
  };

  return { ref, visible, setVisible, onWrapperClick };
}
