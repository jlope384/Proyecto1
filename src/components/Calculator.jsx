import Display from './Display'
import Keypad from './Keypad'
import useCalculator from '../hooks/useCalculator'
import './Calculator.css'

export default function Calculator() {
  const calc = useCalculator()

  return (
    <div className='calculator'>
      <Display value={calc.display} />
      <Keypad onKey={calc.handleKey} />
    </div>
  )
}