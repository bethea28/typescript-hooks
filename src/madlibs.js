import { FIELD_NAMES } from './constants';
import getTextTemplates from './helpers';

// Action types
// ----------------------------------------------------------------------------

export const SUBMIT_FIELD = 'MADLIBS.SUBMIT_FIELD';
export const SHOW_TEXTAREA = 'MADLIBS.SHOW_TEXTAREA';
export const START_OVER = 'MADLIBS.START_OVER';
export const ADD_DATA = 'MADLIBS.ADD_DATA';

// Initial state
// ----------------------------------------------------------------------------

export const INITIAL_STATE = {
  fieldOrder: [
    FIELD_NAMES.hometown,
    FIELD_NAMES.favoriteFood,
    FIELD_NAMES.loveToDo,
    FIELD_NAMES.music,
    FIELD_NAMES.messageIf,
    FIELD_NAMES.bar,
  ],
  fieldId: 0,
  fieldAnswers: [],
  essayText: [],
  showTextArea: false,
};

// Action creators
// ----------------------------------------------------------------------------

export function submitField(value, answer, id) {
  return { type: SUBMIT_FIELD, payload: { fieldId: id, answer, value } };
}

export function setFieldData(fieldName, id, event) {
  return { type: ADD_DATA, payload: { fieldName, id, event } };
}

export function textAreaFlagChange() {
  return { type: SHOW_TEXTAREA };
}

export function startOver() {
  return { type: START_OVER };
}


// Thunks
// ----------------------------------------------------------------------------

export const createSentenceThunk = (value, id, event, prevState) => (dispatch) => {
  const template = getTextTemplates(FIELD_NAMES[value]);
  const randomNumber = Math.floor(Math.random() * template.length);
  const sentence = template[randomNumber];

  // checking prevState answer against current state answer
  const compareState = !prevState[id]?.includes(event.target.value);
  if (compareState) dispatch(submitField(value, sentence, id));
};

// Reducer
// ----------------------------------------------------------------------------

export function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SUBMIT_FIELD: {
      const fieldAnswer = state.fieldAnswers[action.payload.fieldId];

      // update madlib template with input answer
      const newSentence = action.payload.answer.replace(
        '$answer',
        fieldAnswer,
      );

      const finalEssayText = [...state.essayText];
      finalEssayText.splice(
        action.payload.fieldId,
        1,
        // filter sentence for undefined
        (!newSentence.includes('undefined') ? newSentence : ''),
      );


      return {
        ...state,
        fieldId: action.payload.fieldId,
        essayText: finalEssayText,
      };
    }

    case ADD_DATA: {
      const newArray = state.fieldAnswers.length > 0 ? [...state.fieldAnswers] : [];
      newArray.splice(action.payload.id, 1, action.payload.event.target.value);
      return {
        ...state,
        ...state.fieldAnswers,
        fieldAnswers: newArray,
      };
    }

    case SHOW_TEXTAREA: {
      return {
        fieldOrder: [...state.fieldOrder],
        showTextArea: !state.showTextArea,
        essayText: state.essayText,
      };
    }
    // startover resets state by assigning it to an empty array
    case START_OVER: {
      return {
        ...state,
        showTextArea: !state.showTextArea,
        essayText: [],
        fieldAnswers: [],
      };
    }

    default:
      return state;
  }
}
