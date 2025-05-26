import { useState, useEffect } from 'react'

export default function useCalculator() {
  const [display, setDisplay] = useState('0')
  const [buffer, setBuffer] = useState(null)
  const [operator, setOperator] = useState(null)
  const [overwrite, setOverwrite] = useState(false)

  // Mapeo de teclas del teclado a nuestras teclas de calculadora
  const keyMap = {
    '0': '0',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '+': '+',
    '-': '-',
    '*': '*',
    '/': '/',
    '%': '%',
    '.': '.',
    '=': '=',
    'Enter': '=',
    'Escape': 'C',
    ',': '.', 
    'Backspace': '⌫' //Increible
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      const mappedKey = keyMap[e.key]
      if (mappedKey) {
        e.preventDefault() 
        handleKey(mappedKey)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [display, buffer, operator, overwrite])

  function handleKey(key) {
    if (key === '⌫') {
      if (display.length === 1 || (display.length === 2 && display.startsWith('-'))) {
        setDisplay('0')
      } else {
        setDisplay(display.slice(0, -1))
      }
      return
    }

    if (/\d/.test(key)) {
      if (overwrite || display === '0') {
        setDisplay(key)
        setOverwrite(false)
      } else if (display.length < 9) {
        setDisplay(display + key)
      }
    } else if (key === 'C') {
      setDisplay('0')
      setBuffer(null)
      setOperator(null)
      setOverwrite(false)
    } else if (['+', '-', '*', '/', '%'].includes(key)) {
      compute()
      setOperator(key)
      setBuffer(parseFloat(display))
      setOverwrite(true)
    } else if (key === '=') {
      compute()
      setOperator(null)
    } else if (key === '.') {
      if (!display.includes('.') && display.length < 9) {
        setDisplay(display + '.')
      }
    } else if (key === '+/-') {
      toggleSign()
    }
  }

  function toggleSign() {
    if (display === '0') return
    
    if (display.startsWith('-')) {
      // Eliminar el signo negativo
      const newDisplay = display.substring(1)
      if (newDisplay.length <= 9) {
        setDisplay(newDisplay)
      }
    } else {
      // Agregar signo negativo si hay espacio
      if (display.length < 9) {
        setDisplay('-' + display)
      }
    }
  }

  function compute() {
    if (buffer === null || operator === null) return
    const current = parseFloat(display)
    let result = 0
    
    try {
      switch (operator) {
      case '+': 
        result = buffer + current
        break
      case '-': 
        result = buffer - current
        break
      case '*': 
        result = buffer * current
        break
      case '/': 
        if (current === 0) throw new Error('Division by zero')
        result = buffer / current
        break
      case '%': 
        result = buffer % current
        break
      default:
        return
      }
      
      // Manejo de resultados con muchos decimales
      let strResult = ''
      if (Number.isInteger(result)) {
        strResult = result.toString()
      } else {
        // Limitar decimales para no exceder 9 caracteres
        const maxLength = 9
        const integerPart = Math.floor(Math.abs(result)).toString()
        const availableDecimals = maxLength - integerPart.length - (result < 0 ? 1 : 0)
        
        if (availableDecimals > 0) {
          strResult = result.toFixed(availableDecimals)
            .replace(/\.?0+$/, '') 
        } else {
          strResult = Math.round(result).toString()
        }
      }
      
      // Verificar límite de 9 caracteres
      if (strResult.length > 9) {
        if (Math.abs(result) > 999999999 || Math.abs(result) < 0.0000001) {
          setDisplay('ERROR')
        } else {
          strResult = strResult.slice(0, 9)
          setDisplay(strResult)
        }
      } else {
        setDisplay(strResult)
      }
      
      setBuffer(parseFloat(strResult))
    } catch (error) {
      setDisplay('ERROR')
    }
    
    setOverwrite(true)
  }

  return { display, handleKey }
}