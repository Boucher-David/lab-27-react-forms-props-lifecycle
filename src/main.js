// now that I have included the babel preset 'stage-2', I can create functions using an arrow like below:

// handleChange = () = > {}

// a function declared like so will automatically have this bound to them, so you don't have to bind this later on.



'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.scss';
import superagent from 'superagent';
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
        this.state = {};
    }
    captureInput = (event) => {
        let value = event.target.value;
        (event.target.id === 'subredditInput') ? this.setState({subreddit: value}) : this.setState({limit: value});
    }
    searchReddit = (event) => {
        event.preventDefault();
        if ((this.state.limit < 1) || (this.state.limit > 100)) return this.setState({error: "Please enter a number of results between 1 and 101"});
        if (this.state.subreddit === 'undefined') return this.setState({error: "Please enter a number of results between 1 and 101"});

        superagent.get(`https://www.reddit.com/r/${this.state.subreddit}.json?limit=${this.state.limit}`).then(results => {
            this.setState({threads: results.body.data.children});

        }).catch(err => this.setState({error: err.message}));
    }

    showError = () => {
        if (this.state.error) return <div>{this.state.error}</div>
    }
    render () {
        return (
            <div>
                <p>Subreddit</p>
                <input id="subredditInput" value={this.state.subreddit} onChange={this.captureInput}></input> 
                <br />
                <p>Number of Results</p>
                <input id="numberInput" value={this.state.limit} onChange={this.captureInput}></input>
                <br />
                {this.showError()}
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
        if (props.threads) return props.threads.map(thread => {
            return (
                <ul key={thread.data.title}>
                    <li>
                        <a href={thread.data.title}>
                            <h3>{thread.data.title}</h3>
                            <p>Ups: {thread.data.ups}</p>
                        </a>
                    </li>
                </ul>
            )
         });
    };

    render () {
        return (
            <div>
                {(this.props.threads) ? <p>A List of reddit threads within your chosen subreddit.</p> : null}
                {this.renderThreads(this.props)}
            </div>
        )
    }
}

ReactDOM.render(<App/>, main);