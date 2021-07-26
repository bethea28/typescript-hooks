import React from 'react'
import Form from './Form'
import { FIELDS } from '../constants'

import Essay from './Essay'
// import TextAreaComponent from './TextArea'

require('./App.css')

// type Props = {
//   showTextArea: boolean
// }

const App = () => {
  const [fields] = React.useState(Object.keys(FIELDS))
  const [updatedEssay, setUpdatedEssay] = React.useState([''])

  const updateEssay = (finalMadlib: any) => {
    console.log('handle blur updateessay', finalMadlib)
    setUpdatedEssay(finalMadlib)
  }
  React.useEffect(() => {})

  return (
    <section className='App'>
      {
        <section className='App_forms-container'>
          <article>
            <Form
              // sending essayText to be used as previous state for comparison
              handleBlur={(finalMadlib) => setUpdatedEssay(finalMadlib)}
              // handleBlur={(finalMadlib) => updateEssay(finalMadlib)}
              handleInputChange={(field, id, event) => {
                // setFieldData(field, id, event)
              }}
              fieldOrder={fields}
            />
          </article>
          <article>
            <Essay
              essayText={updatedEssay}
              // handleChangeTextAreaFlag={textAreaFlagChange}
            />
          </article>
        </section>
      }
      {/* 
    {showTextArea && (
      <article className='App_textarea-component'>
      <TextAreaComponent handleStartOver={startOver} essayText={essayText} />
      </article>
    )} */}
    </section>
  )
}

export default App
