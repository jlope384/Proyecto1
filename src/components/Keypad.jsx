import Key from './Key'
import './Keypad.css'

const keys = [
  '%','+/-','/',
  '7','8','9','+',
  '4','5','6','-',
  '1','2','3','*',
  '0','.','=','C'  
]

export default function Keypad({ onKey }) {
  return (
    <div className='keypad'>
      {keys.map(k => (
        <Key key={k} label={k} onClick={onKey} />
      ))}
    </div>
  )
}