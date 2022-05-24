import React from 'react'

require('./Essay.css')

type EssayProps = {
  essayText: string[]
  showTextArea: () => void
  editButton: boolean
}

const Essay = ({ essayText, showTextArea, editButton }: EssayProps) => {
  return (
    <section className='essay'>
      <article>
        <h2>Essay</h2>
        {essayText.length > 0 &&
          essayText.map((sentence, key) => (
            <b key={`${key}_fields`}>{` ${sentence}`}</b>
          ))}
      </article>

      {/* tells the edit button to show when all fields are populated and none contain
       empty strings */}
      {editButton && (
        <button className='essay_edit-button' onClick={showTextArea}>
          <h3>EDIT</h3>
        </button>
      )}
    </section>
  )
}

export default Essay
