import React from 'react'
import Form from './Form'
import { FIELDS } from '../constants'
import getTextTemplates from '../helpers'

import Essay from './Essay'
import TextAreaComponent from './TextArea'

require('./App.css')

const init = {
  field: '',
  id: 0,
  event: { target: { value: '' } },
}

type fieldData = {
  field: string
  id: number
  event: { target: { value: string } }
}

const App = () => {
  const [fields] = React.useState<string[]>(Object.keys(FIELDS))
  const [updatedEssay, setUpdatedEssay] = React.useState<string[]>([])
  const [textArea, setShowTextArea] = React.useState<boolean>(false)
  const [fieldData, setFieldData] = React.useState<fieldData>(init)
  const [mainAnswers, setMainAnswers] = React.useState<string[]>([])

  const StartOver = () => {
    setUpdatedEssay([])
    setMainAnswers([])
    setShowTextArea(!textArea)
  }

  const handlingOnBlur = (
    field: string,
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let template = getTextTemplates(fieldData.field)
    const randomNumber = Math.floor(Math.random() * template.length)
    const updatedTemplate = template[randomNumber]
    mainAnswers[fieldData?.id] = updatedTemplate?.replace(
      '$answer',
      fieldData?.event.target.value
    )
    let newMainAnswers = [...mainAnswers]
    setUpdatedEssay(newMainAnswers)
  }

  return (
    <section className='App'>
      {!textArea && (
        <section className='App_forms-container'>
          <article>
            <Form
              handleInputChange={(field, id, event) => {
                setFieldData({ field, id, event })
              }}
              handleBlur={(field, id, event) => {
                handlingOnBlur(field, id, event)
              }}
              fieldOrder={fields}
              mainAnswers={mainAnswers}
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
