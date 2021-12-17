import React from 'react'
import Form from './FormComponent/Form'
import { FIELDS } from '../constants'
import getTextTemplates from '../helpers'

import Essay from './EssayComponent/Essay'
import TextAreaComponent from './TextAAeaComponent/TextArea'

require('./App.css')

const initFieldData = {
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
  const [updatedEssay, setUpdatedEssay] = React.useState<string[]>(
    Array(6).fill('')
  )
  const [textArea, setShowTextArea] = React.useState<boolean>(false)
  const [fieldData, setFieldData] = React.useState<fieldData>(initFieldData)
  const [mainAnswers, setMainAnswers] = React.useState<string[]>(
    Array(6).fill('')
  )

  const StartOver = () => {
    setUpdatedEssay([])
    setMainAnswers([])
    setShowTextArea(!textArea)
  }

  const handlingOnBlur = () => {
    /*
    function called when onblur is triggered
    it generates new random madlib template and fills the answers
    */
    //core logic to generate template// need to take template out of array so that edit button works right
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
              handleInputChange={(
                field: string,
                id: number,
                event: React.ChangeEvent<HTMLInputElement>
              ) => {
                setFieldData({ field, id, event })
              }}
              handleBlur={() => {
                handlingOnBlur()
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
