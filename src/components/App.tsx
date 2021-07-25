import React from 'react'
import Form from './Form'
import { FIELDS } from '../constants'

// import Essay from './Essay'
// import TextAreaComponent from './TextArea'

require('./App.css')

// type Props = {
//   showTextArea: boolean
// }

const App = () => {
  console.log('hey')
  const [fields] = React.useState(Object.keys(FIELDS))
  const [answers, setAnswers] = React.useState([])

  const setFieldData = (
    field: string,
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newAnswers: any = [...answers]
    newAnswers[id] = event.target.value
    setAnswers(newAnswers)
    console.log('hey brayn', answers)
  }
  // React.useEffect(() => {
  //   console.log('answers', answers)
  // }, [answers])

  return (
    <section className='App'>
      {
        <section className='App_forms-container'>
          <article>
            <Form
              // sending essayText to be used as previous state for comparison
              // handleBlur={(field, id, event) => {
              //   createSentenceThunk(field, id, event, essayText)
              // }}
              handleInputChange={(field, id, event) => {
                setFieldData(field, id, event)
              }}
              fieldOrder={fields}
            />
          </article>
          <article>
            {/* <Essay
            // essayText={essayText}
            // handleChangeTextAreaFlag={textAreaFlagChange}
            /> */}
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
