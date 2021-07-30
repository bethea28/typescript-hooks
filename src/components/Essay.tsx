import React from 'react'
import { FIELD_NAMES } from '../constants'

require('./Essay.css')

type Props = {
  essayText: string[]
  // handleChangeTextAreaFlag: () => any
}

const Essay: React.FC<Props> = ({ essayText }) => {
  React.useEffect(() => {})
  console.log('essay text', essayText)
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
      {essayText.length >= 6 && (
        <button
          className='essay_edit-button'
          // onClick={handleChangeText  AreaFlag}
        >
          <h3>EDIT</h3>
        </button>
      )}
    </section>
  )
}

export default Essay
