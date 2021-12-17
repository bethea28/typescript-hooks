import React from 'react'

require('./Essay.css')

type Props = {
  essayText: string[]
  showTextArea: () => any
}

const Essay: React.FC<Props> = ({ essayText, showTextArea }) => {
  const showEditButton = () => {
    let show = essayText.every((text) => {
      return text.length > 1
    })
    console.log('shwo what the fuck', show)
    return show
  }
  console.log('essay', essayText)
  return (
    <section className='essay'>
      <article>
        <h2>Essay</h2>
        {essayText.length > 0 &&
          essayText.map((sentence) => (
            <b key={`${sentence}_fields`}>{sentence}</b>
          ))}
      </article>

      {/* tells the edit button to show when all fields are populated and none contain
       empty strings */}
      {showEditButton() && (
        <button className='essay_edit-button' onClick={showTextArea}>
          <h3>EDIT</h3>
        </button>
      )}
    </section>
  )
}

export default Essay
