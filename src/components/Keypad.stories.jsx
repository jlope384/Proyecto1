import Keypad from './Keypad'

export default {
  component: Keypad,
  title: 'Calculator/Keypad'
}

export const Default = {
  args: {
    onKey: key => console.log(key)
  }
}
