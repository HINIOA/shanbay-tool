import cssText from "data-text:~/contents/style.css"
import { debounce } from "lodash"
import type { PlasmoCSUIJSXContainer, PlasmoRender } from "plasmo"
import type { FC } from "react"
import { createRoot } from "react-dom/client"

interface Position {
  left: number
  top: number
}

const TranslateBtn: FC<{ position?: Position }> = ({ position }) => {
  const { left, top } = position || {}
  return (
    <button
      className="translate-btn"
      style={{ position: "absolute", left, top }}>
      扇贝翻译
    </button>
  )
}

export default TranslateBtn

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
  anchor,
  createRootContainer
}) => {
  const rootContainer = await createRootContainer(anchor)
  const root = createRoot(rootContainer)

  function handleSelect() {
    const selection = window.getSelection()

    if (selection.rangeCount < 1) {
      return
    }

    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    const word = selection.toString()

    word &&
      root.render(
        <TranslateBtn position={{ left: rect.left, top: rect.bottom }} />
      )

    // 点击外侧关闭弹框
    setTimeout(() => {
      document.addEventListener("click", () => root.render(null))
    }, 500)
  }

  document.addEventListener("selectionchange", debounce(handleSelect, 500))
}
