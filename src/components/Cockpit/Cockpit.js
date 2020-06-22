import React, { useEffect, Fragment, useRef, useContext } from 'react';

import classes from './Cockpit.css';

import ContextProvider from '../../context_provider/contextProvider';

const cockpit = (props) => {

  //Creating a reference to enable some html operations
  const toggleBtnReference = useRef(null);

  //connecting the provider with the cockpit functional component using useContext hook
  const authContext = useContext(ContextProvider);

  //can access the context values outside the context as well
  console.log(authContext.autheticated);

  //Functional component, react hook
  //Combination of componentDidUpdate and componentDidMount
  //Gets called on each re-render cycle, on update of the persons state array
  useEffect(() => {
    console.log('[Cockpit.js] useEffect state hook called on change/at first');
    return () => {
      console.log("[Cockpit.js] clean up work in useEffect, called on state change")
    }
  }, [props.persons]);


  //Gets called only once, as the list sent is empty
  useEffect(() => {
    console.log('[Cockpit.js] useEffect state hook called on change/at first');
    //click the toggle button on first time load
    toggleBtnReference.current.click();

    return () => {
      console.log("[Cockpit.js] clean up work in useEffect, called on state change")
    }
  }, []);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect state hook called at first only');
    return () => {
      console.log("[Cockpit.js] cleanup called only once as no arguments are given");
    };
  });

  const assignedClasses = [];
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return (
    <Fragment>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button
        // click the toggle on first time render
        ref={toggleBtnReference}
        className={btnClass}
        onClick={props.clicked}>Toggle Persons</button>
      {/* <ContextProvider.Consumer>
        {
          (context) => <button onClick={context.login}>Log In!</button>
        }
      </ContextProvider.Consumer> */}
      {/*Using the direct link to the context using useContext*/}
      <button onClick={authContext.login}>Log In!</button>
    </Fragment>
  );
};

//Memoizing the  functional component: storing the snapshot in the memory
//so that only on change of the props incoming the component wont be re-rendered
//Only on mount and unmounting the cockpit the useEffect will be called
export default React.memo(cockpit);