declare var require: any

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Search from './components/Search'

import './App.css';

export class App extends React.Component {        
    render() {
        return (
            <div>         
                    <Search />               
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));