import { connect } from 'react-redux';
import {
  setFieldData, createSentenceThunk, textAreaFlagChange, startOver,
} from '../madlibs';
import App from '../components/App';

type rootState = {
  fieldOrder: string[],
  fieldId: number,
  fieldAnswers: string[],
  essayText: string[],
  showTextArea: boolean
}

function mapStateToProps(state: rootState) {
  return state;
}

const mapDispatchToProps = {
  setFieldData,
  createSentenceThunk,
  textAreaFlagChange,
  startOver,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
