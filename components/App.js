import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import Mathml2latex from 'mathml-to-latex';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/stex/stex';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/seti.css';
import '../index.scss';

class App extends Component {
  state = { convertedValue: '', value: '' };

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', () => this.updateDimensions());
    if (localStorage.getItem('value')) {
      this.updateCode(localStorage.getItem('value'));
      this.refs.editor1.getCodeMirror().setValue(localStorage.getItem('value'));
    } else {
      localStorage.setItem('value', '');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  updateDimensions() {
    this.refs.editor1.getCodeMirror().setSize(null, window.innerHeight / 1.5);
    this.refs.editor2.getCodeMirror().setSize(null, window.innerHeight / 1.5);
  }

  updateCode(newValue) {
    this.setState({ value: newValue });
    try {
      this.refs.editor2
        .getCodeMirror()
        .setValue(Mathml2latex.convert(newValue));
    } catch {}
    localStorage.setItem('value', newValue);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="App row">
          <div className="col-md-5 editor">
            <CodeMirror
              ref="editor1"
              mode="xml"
              value={this.state.value}
              options={{ autofocus: true }}
              onChange={(newValue) => this.updateCode(newValue)}
            />
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-5 editor">
            <CodeMirror
              ref="editor2"
              options={{ readOnly: true }}
              mode="stex"
              value={this.state.convertedValue}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
