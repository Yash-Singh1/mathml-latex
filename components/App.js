import React, { Component } from 'react';
import CodeMirror from 'react-codemirror';
import Mathml2latex from 'mathml-to-latex';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/stex/stex';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/seti.css';
import '../index.css';

class App extends Component {
  state = { convertedValue: '', value: '' };

  componentDidMount() {
    this.refs.editor1.getCodeMirror().setSize(null, window.innerWidth / 2);
    this.refs.editor2.getCodeMirror().setSize(null, window.innerWidth / 2);
    if (localStorage.getItem('value')) {
      this.updateCode(localStorage.getItem('value'));
      this.refs.editor1.getCodeMirror().setValue(localStorage.getItem('value'));
    } else {
      localStorage.setItem('value', '');
    }
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
    const style = {
      border: 'solid'
    };

    return (
      <div className="container-fluid">
        <div className="App row">
          <div style={style} className="col-md-6">
            <CodeMirror
              ref="editor1"
              mode="xml"
              value={this.state.value}
              onChange={(newValue) => this.updateCode(newValue)}
            />
          </div>
          <div style={style} className="col-md-6">
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
