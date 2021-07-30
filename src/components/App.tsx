import React from 'react'
import Form from './Form'
import { FIELDS } from '../constants'
import getTextTemplates from '../helpers'

import Essay from './Essay'
// import TextAreaComponent from './TextArea'

require('./App.css')

// type Props = {
//   showTextArea: boolean
// }

const App = () => {
  const [fields] = React.useState(Object.keys(FIELDS))
  const [updatedEssay, setUpdatedEssay] = React.useState<any>([])
  const [fieldData, setFieldData] = React.useState<any>({})
  const [blur, setBlur] = React.useState(false)
  const [answers] = React.useState<Array<string>>([''])

  React.useEffect(() => {
    console.log('fielddata', fieldData)
    let template = getTextTemplates(fieldData?.field)
    const randomNumber = Math.floor(Math.random() * template.length)
    const updatedTemplate = template[randomNumber]
    answers[fieldData?.id] = updatedTemplate?.replace(
      '$answer',
      fieldData?.event.target.value
    )
    let newAnswers = [...answers]
    console.log('field datas blurs', answers)
    setUpdatedEssay(newAnswers)
  }, [blur])

  return (
    <section className='App'>
      {
        <section className='App_forms-container'>
          <article>
            <Form
              // sending essayText to be used as previous state for comparison
              handleBlur={() => setBlur((blur) => !blur)}
              handleInputChange={(field, id, event) => {
                setFieldData({ field, id, event })
              }}
              fieldOrder={fields}
              answers={answers}
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
