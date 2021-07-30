import React from 'react'

require('./TextArea.css')

type Props = {
  essayText: string[]
  handleStartOver: () => any
}

const TextAreaComponent: React.FC<Props> = ({ essayText, handleStartOver }) => (
  <section className='textarea-container'>
    <h2>Your essay text</h2>

    {/* onChange required for eslint purposes */}
    <textarea
      onChange={() => ''}
      className='textarea-component'
      value={essayText}
    />
    <button
      className='textarea-container_startover_button '
      onClick={handleStartOver}
    >
      START OVER
    </button>
  </section>
)

export default TextAreaComponent
