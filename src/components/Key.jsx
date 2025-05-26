import './Key.css'

export default function Key({ label, onClick }) {
  return <button className='key' onClick={() => onClick(label)}>{label}</button>
}