import React from 'react'

require('./TextArea.css')

type TextAreaComponentProps = {
  essayText: string[]
  handleStartOver: () => void
}

const TextAreaComponent = ({
  essayText,
  handleStartOver,
}: TextAreaComponentProps) => {
  return (
    <section className='textarea-container'>
      <h2>Your essay text</h2>

      {/* onChange required for eslint purposes */}
      <textarea className='textarea-component' value={essayText.join(' ')} />
      <button
        className='textarea-container_startover_button '
        onClick={handleStartOver}
      >
        START OVER
      </button>
    </section>
  )
}

export default TextAreaComponent
