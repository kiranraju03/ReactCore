import React, { Component } from "react";

import classes from "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

import ContextProvider from '../context_provider/contextProvider';

import WithClass from '../hoc/WithClass';

class App extends Component {
  //Creation Lifecycle Item 1 : Initialises the class
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  state = {
    persons: [
      { id: "asfa1", name: "Max", age: 28 },
      { id: "vasdf1", name: "Manu", age: 29 },
      { id: "asdf11", name: "Stephanie", age: 26 },
    ],
    otherState: "some other value",
    showPersons: false,
    updateCounter: 0,
    authenticated: false
  };

  //Creation Lifecycle Item 2: Brings sync between the props and the state
  static getDerivedStateFromProps(props, state) {
    console.log("[App.js] getDerivedStateFromProps", props);
    return state;
  }

  //Old component not used anymore
  // componentWillMount() {
  //   console.log('[App.js] componentWillMount');
  // }

  //called after the components are mounted on the DOM tree
  //can be used to load data from remote endpoints async'ly
  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex],
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;


    //When the state needs to be updated based on the exact prevstate value
    this.setState((prevState, props) => {
      return {
        persons: persons,
        updateCounter: prevState.updateCounter + 1
      };
    });
  };

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  loginHandler = () => {
    this.setState({ authenticated: !this.state.authenticated });
  };

  render() {
    console.log("[App.js] render");
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
      );
    }

    return (
      <WithClass classes={classes.App}>
        {/*Provider value gets updated when ever the state value changes */}
        {/*Provider is created at a level higher than the components that require the data */}
        <ContextProvider.Provider value={{
          autheticated: this.state.authenticated,
          login: this.loginHandler
        }}
        >
          <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.persons.length}
            clicked={this.togglePersonsHandler}
          />
          {persons}
        </ContextProvider.Provider>
      </WithClass>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
