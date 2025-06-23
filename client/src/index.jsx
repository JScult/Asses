import React from 'react';
import ReactDOM from 'react-dom/client';
import $ from 'jquery';

import Practice from './components/Practice.jsx';
import PhraseList from './components/PhraseList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'phrases'
    };
  }

  changeView(option) {
    this.setState({
      view: option
    });
  }

  render() {
    return (
      <div>
        <div className="nav">
          <span className="logo">Korean Tutor</span>
          <span className={this.state.view === 'phrases'
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => this.changeView('phrases')}>
            Phrase List
          </span>
          <span className={this.state.view === 'practice'
            ? 'nav-selected'
            : 'nav-unselected'}
          onClick={() => this.changeView('practice')}>
            Practice
          </span>
        </div>

        <div className="main">
          {this.state.view === 'phrases'
            ? <PhraseList />
            : <Practice />
          }
        </div>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);