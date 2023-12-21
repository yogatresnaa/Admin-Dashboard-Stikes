import React, { useEffect, useState } from "react";

function AutoTyping({ text, delay }) {
  const [currentText, setCurrentText] = useState({ text: '', index: 0, isFull: false })

  useEffect(() => {
    if (currentText.index <= text.length && !currentText.isFull) {

      if (currentText.index == text.length) {
        setCurrentText(prevState => ({ ...prevState, isFull: true }))
      }
      else {

        const timeout = setTimeout(() => {
          setCurrentText((prevState) => ({ ...prevState, text: prevState.text + text[prevState.index], index: prevState.index + 1 }))
        }, delay)
        return () => clearTimeout(timeout)
      }

    }
    else {
      if (currentText.index > 0) {
        const timeout = setTimeout(() => {
          setCurrentText((prevState) => ({ ...prevState, text: text.slice(0, prevState.index), index: prevState.index - 1 }))
        }, delay)
        return () => clearTimeout(timeout)
      }
      else {
        setCurrentText(prevState => ({ ...prevState, isFull: false, index: 1 }))
      }

      //setCurrentText((prevState)=>({text:text[0],index:1}))

    }
  }, [text, delay, currentText])
  return (
    <span>{currentText.text}</span>
  )
}
export default AutoTyping;