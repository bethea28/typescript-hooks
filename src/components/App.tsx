import React from 'react';
import Form from './Form';
import Essay from './Essay';
import TextAreaComponent from './TextArea';

require('./App.css');

type Props = {
  fieldOrder: string[],
  setFieldData: (field: string, id: number, event: object) => object,
  createSentenceThunk: (field: string, id: number, event: object, essayText: string[]) => object,
  essayText: string[],
  textAreaFlagChange: ()=> object,
  showTextArea: boolean,
  startOver: ()=> object
}

const App = ({
  fieldOrder,
  setFieldData,
  createSentenceThunk,
  essayText,
  textAreaFlagChange,
  showTextArea,
  startOver,
}: Props) => (
  <section className="App">
    {!showTextArea && (
      <section className="App_forms-container">
        <article>
          <Form
          // sending essayText to be used as previous state for comparison
            handleBlur={(field, id, event) => {
              createSentenceThunk(field, id, event, essayText);
            }}
            handleInputChange={(field, id, event) => {
              setFieldData(field, id, event);
            }}
            fieldOrder={fieldOrder}
          />
        </article>
        <article>
          <Essay
            essayText={essayText}
            handleChangeTextAreaFlag={textAreaFlagChange}
          />
        </article>
      </section>
    )}

    {showTextArea && (
      <article className="App_textarea-component">
        <TextAreaComponent handleStartOver={startOver} essayText={essayText} />
      </article>
    )}
  </section>
);

export default App;
