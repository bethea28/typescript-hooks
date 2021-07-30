import React from 'react'
import Form from './Form'
import { FIELDS } from '../constants'
import getTextTemplates from '../helpers'

import Essay from './Essay'
import TextAreaComponent from './TextArea'

require('./App.css')

// type Props = {
//   showTextArea: boolean
// }

const App = () => {
  const [fields] = React.useState(Object.keys(FIELDS))
  const [updatedEssay, setUpdatedEssay] = React.useState<any>([])
  const [textArea, setShowTextArea] = React.useState<any>(false)
  const [fieldData, setFieldData] = React.useState<any>({})
  // const [blur, setBlur] = React.useState(false)
  const [answers, setAnswers] = React.useState<Array<string>>([''])

  // React.useEffect(() => {
  //   let template = getTextTemplates(fieldData?.field)
  //   const randomNumber = Math.floor(Math.random() * template.length)
  //   const updatedTemplate = template[randomNumber]
  //   answers[fieldData?.id] = updatedTemplate?.replace(
  //     '$answer',
  //     fieldData?.event.target.value
  //   )
  //   let newAnswers = [...answers]
  //   setUpdatedEssay(newAnswers)
  // }, [blur])

  const StartOver = () => {
    setUpdatedEssay([])
    setAnswers([])
    setShowTextArea(!textArea)
  }

  const handlingOnBlur = () => {
    let template = getTextTemplates(fieldData?.field)
    const randomNumber = Math.floor(Math.random() * template.length)
    const updatedTemplate = template[randomNumber]
    answers[fieldData?.id] = updatedTemplate?.replace(
      '$answer',
      fieldData?.event.target.value
    )
    let newAnswers = [...answers]
    setUpdatedEssay(newAnswers)
  }

  return (
    <section className='App'>
      {!textArea && (
        <section className='App_forms-container'>
          <article>
            <Form
              // sending essayText to be used as previous state for comparison
              handleBlur={handlingOnBlur}
              // handleBlur={() => setBlur((blur) => !blur)}
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
              showTextArea={() =>
                setShowTextArea((prevState: boolean) => !prevState)
              }
            />
          </article>
        </section>
      )}

      {textArea && (
        <article className='App_textarea-component'>
          <TextAreaComponent
            handleStartOver={StartOver}
            essayText={updatedEssay}
          />
        </article>
      )}
    </section>
  )
}

export default App
