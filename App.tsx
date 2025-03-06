import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import Button from './src/components/Button';
import Display from './src/components/Display';

function App(): React.JSX.Element {

//const [state, setState] = React.useState({displayValue: '0', clearDisplay: false, operation: null, values: [0, 0], current: 0});
// const [operation, setOperation] = React.useState('');
const [state, setState] = React.useState<{
  displayValue: string;
  clearDisplay: boolean;
  operation: string | null;
  values: number[];
  current: number;
}>({
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
});

function addDigit(digit: string) {
  if (digit === '.' && state.displayValue.includes('.')) {
    return;
  }

  const clearDisplay = state.displayValue === '0' || state.clearDisplay;
  const currentValue = clearDisplay ? '' : state.displayValue;
  const displayValue = currentValue + digit;

  const newValue = digit !== '.' ? parseFloat(displayValue) : state.values[state.current];
  const values = [...state.values];
  values[state.current] = newValue;

  setState(prevState => ({
    ...prevState,
    displayValue,
    clearDisplay: false,
    values,
  }));
}

function clearMemory() {
  setState({
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
  });
}

function setOperation(operation: string) {
  if (state.current === 0) {
    setState(prevState => ({
      ...prevState,
      operation,
      current: 1,
      clearDisplay: true,
    }));
  } else {
    const equals = operation === '=';
    const values = [...state.values];

    if (state.operation) {
      try {
        values[0] = eval(`${values[0]} ${state.operation} ${values[1]}`);
      } catch (error) {
        values[0] = state.values[0];
      }
    }

    values[1] = 0;

    setState(prevState => ({
      ...prevState,
      displayValue: values[0].toString(),
      operation: equals ? null : operation,
      current: equals ? 0 : 1,
      clearDisplay: !equals,
      values,
    }));
  }
}



  return (
    <SafeAreaView style={styles.container}>
    <Display value = {state.displayValue}/>
      <SafeAreaView style={styles.buttons}>
      <Button label = "AC" triple onClick={() => clearMemory()}/>
      <Button label = "/" operation onClick={() => setOperation('/')} />
      <Button label = "7" onClick = {() => addDigit('7')}/>
      <Button label = "8" onClick= {() => addDigit('8')}/>
      <Button label = "9" onClick={() => addDigit('9')} />
      <Button label = "*" operation onClick={() => setOperation('*')}/>
      <Button label = "4" onClick={() => addDigit('4')} />
      <Button label = "5" onClick={() => addDigit('5')}/>
      <Button label = "6" onClick={() => addDigit('5')}/>
      <Button label = "-" operation onClick={() => setOperation('-')}/>
      <Button label = "1" onClick={() => addDigit('1')}/>
      <Button label = "2" onClick={() => addDigit('2')}/>
      <Button label = "3" onClick={() => addDigit('3')}/>
      <Button label = "+" operation onClick={() => setOperation('+')} />
      <Button label = "0" double onClick={() => addDigit('0')} />
      <Button label = "." onClick={() => addDigit('.')} />
      <Button label = "=" operation onClick={() => setOperation('=')}/>

    </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }});

export default App;
