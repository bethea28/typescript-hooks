import React from 'react'
import Form from '../FormComponent/Form'
import { FIELDS } from '../../constants'
import getTextTemplates from '../../helpers'
import Essay from '../EssayComponent/Essay'
import TextAreaComponent from '../TextAAeaComponent/TextArea'

require('./Madlib.css')

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

const Madlib = () => {
  const [fields] = React.useState<string[]>(Object.keys(FIELDS))
  const [textArea, setShowTextArea] = React.useState<boolean>(false)
  const [editButtonFlag, setShowEditButton] = React.useState<boolean>(false)
  const [fieldData, setFieldData] = React.useState<fieldData>(initFieldData)
  const [mainAnswers, setMainAnswers] = React.useState<string[]>(
    Array(6).fill('')
  )
  const [updatedEssay, setUpdatedEssay] = React.useState<string[]>(
    Array(6).fill('')
  )

  const startOver = () => {
    setUpdatedEssay([])
    setMainAnswers([])
    setShowTextArea(false)
    setShowEditButton(false)
  }

  const showTextArea = () => {
    setShowTextArea(true)
    setShowEditButton(false)
  }

  const handleInputChange = (
    field: string,
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFieldData({ field, id, event })
  }

  const handlingOnBlur = React.useCallback(() => {
    /*
    function called when onblur is triggered; it generates new random madlib template and fills the answers
    */
    //core logic to generate template// need to take template out of array so that edit button works right
    const template = getTextTemplates(fieldData.field)
    const randomNumber = Math.floor(Math.random() * template.length)
    const updatedTemplate = template[randomNumber]
    mainAnswers[fieldData?.id] = updatedTemplate?.replace(
      '$answer',
      fieldData?.event.target.value
    )
    const newMainAnswers = [...mainAnswers]
    const editButtonFlag = newMainAnswers?.every((text) => {
      return text?.length >= 1
    })
    if (editButtonFlag && newMainAnswers.length >= 6) setShowEditButton(true)
    setUpdatedEssay(newMainAnswers)
  }, [
    fieldData?.event.target.value,
    fieldData.field,
    fieldData?.id,
    mainAnswers,
  ])

  return (
    <section className='Madlib'>
      {!textArea && (
        <section className='Madlib_forms-container'>
          <article>
            <Form
              handleInputChange={(
                field: string,
                id: number,
                event: React.ChangeEvent<HTMLInputElement>
              ) => {
                handleInputChange(field, id, event)
              }}
              handleBlur={handlingOnBlur}
              fieldOrder={fields}
              mainAnswers={mainAnswers}
            />
          </article>
          <article>
            <Essay
              editButton={editButtonFlag}
              essayText={updatedEssay}
              showTextArea={showTextArea}
            />
          </article>
        </section>
      )}

      {textArea && (
        <article className='Madlib_textarea-component'>
          <TextAreaComponent
            handleStartOver={startOver}
            essayText={updatedEssay}
          />
        </article>
      )}
    </section>
  )
}

export default Madlib
