import { connect } from 'react-redux';
import {
  setFieldData, createSentenceThunk, textAreaFlagChange, startOver,
} from '../madlibs';
import App from '../components/App.tsx';

function mapStateToProps(state) {
  return state;
}

const mapDispatchToProps = {
  setFieldData,
  createSentenceThunk,
  textAreaFlagChange,
  startOver,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
