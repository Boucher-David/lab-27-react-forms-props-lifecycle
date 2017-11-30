// now that I have included the babel preset 'stage-2', I can create functions using an arrow like below:

// handleChange = () = > {}

// a function declared like so will automatically have this bound to them, so you don't have to bind this later on.



'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.scss';
import { say } from 'cowsay';

const main = document.getElementById('main');


ReactDOM.render(<App/>, main);