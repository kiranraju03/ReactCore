import React, { Component } from 'react';

//Installed using, npm install --save prop-types
import PropTypes from 'prop-types';

import classes from './Person.css';

import withClassWrapper from '../../../hoc/withClassWrapper';
import Aux from '../../../hoc/Aux';

import ContextProvider from '../../../context_provider/contextProvider';

class Person extends Component {

  //connects the Person component with the ContextProvider
  static contextType = ContextProvider;

  componentDidMount() {
    console.log(this.context.autheticated);
  }

  render() {
    console.log('[Person.js] rendering...');
    return (
      <Aux>
        {/* <ContextProvider.Consumer>
          {context => context.autheticated ? <p>Autheticated</p> : <p>Not Authenticated</p>}
        </ContextProvider.Consumer> */}
        {this.context.autheticated ? <p>Autheticated</p> : <p>Not Authenticated</p>}

        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Aux>
    );
  }
}

//For assigning the specific datattype for each prop for constraining the datatypes.
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
}

export default withClassWrapper(Person, classes.Person);
