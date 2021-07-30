import React from 'react'
import { FIELDS } from '../constants'
require('./Form.css')

type Props = {
  fieldOrder: string[]
  handleInputChange: (
    field: string,
    id: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => any
  handleBlur: () => any
  // handleBlur: (finalMadlib: string[]) => any
  answers: string[]
}

const Form: React.FC<Props> = ({
  fieldOrder,
  handleBlur,
  answers,
  handleInputChange,
}) => {
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
            className='form_input'
            type='text'
            name={field}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(field, id, event)
            }
            onBlur={handleBlur}
          />
        </label>
      ))}
    </form>
  )
}

export default Form
