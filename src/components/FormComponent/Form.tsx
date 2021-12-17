/* 
Form takes in data through onChange but only displays it to screen when onBlur
is triggered
*/
import React from 'react'
import { FIELDS } from '../../constants'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

require('./Form.css')

type Props = {
  fieldOrder: string[]
  handleInputChange: (
    field: string,
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => any

  handleBlur: () => any
  mainAnswers: string[]
}

const Form: React.FC<Props> = ({
  fieldOrder,
  handleBlur,
  mainAnswers,
  handleInputChange,
}) => {
  console.log('form')

  return (
    <form className='form'>
      <h2 className='form_header'>About Me</h2>
      {fieldOrder.map((field: string, id: number) => (
        <label
          className='form_label'
          key={`${field}_field`}
          htmlFor='form_label'
        >
          <h4 className='form_label-header'>{FIELDS[field]}</h4>
          <input
            // value={mainAnswers[id]}
            className='form_input'
            type='text'
            name={field}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(field, id, event)
            }
            onBlur={() => handleBlur()}
            // onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
            //   handleBlur(field, id, event)
            // }
          />
        </label>
      ))}
    </form>
  )
}

const createMadlibMutation = gql`
  mutation addChannel(
    $growUp: String
    $favoriteFood: String
    $loveTodDo: String
    $messageMe: String
    $band: String
    $favoriteHole: String
    $id: String
  ) {
    createMadlib(
      growUp: $growUp
      favoriteFood: $favoriteFood
      loveTodDo: $loveTodDo
      messageMe: $messageMe
      band: $band
      favoriteHole: $favoriteHole
      id: $id
    ) {
      growUp
      favoriteFood
      loveTodDo
      messageMe
      band
      favoriteHole
      id
    }
  }
`
// const FormWithMutation = graphql(createMadlibMutation)(Form)
export default Form
