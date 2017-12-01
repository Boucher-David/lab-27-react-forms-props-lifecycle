// now that I have included the babel preset 'stage-2', I can create functions using an arrow like below:

// handleChange = () = > {}

// a function declared like so will automatically have this bound to them, so you don't have to bind this later on.



'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.scss';
import { say } from 'cowsay';

const main = document.getElementById('main');

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <SearchForm />
            </div>
        )
    }
}

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {threads: [{name: 'Larry'},{name: 'David'},{name: 'Ellen'}]};
    }
    captureInput = (event) => {
        let value = event.target.value;
        (event.target.id === 'subredditInput') ? this.setState({subreddit: value}) : this.setState({results: value});
    }
    searchReddit = (event) => {
        event.preventDefault();

        
    }
    render () {
        return (
            <div>
                <p>Subreddit</p>
                <input id="subredditInput" value={this.state.subreddit} onChange={this.captureInput}></input> 
                <br />
                <p>Number of Results</p>
                <input id="numberInput" value={this.state.results} onChange={this.captureInput}></input>
                <br />
                <input type="submit" value="Search Reddit for Subreddit." onClick={this.searchReddit}></input>
                <br />
                <SearchResultList threads={this.state.threads}/>    
            </div>
        )
    }
}

class SearchResultList extends React.Component {
    constructor(props) {
        super(props);
    }
    renderThreads = (props) => {
        // need to re-write this to work with actual reddit data. no clue how to get around CORS issue
        return props.threads.map(thread => {
            return <li key={thread.name}>{thread.name}</li>
        });
    };

    render () {
        return (
            <ul>
                {this.renderThreads(this.props)}
            </ul>
        )
    }
}

ReactDOM.render(<App/>, main);