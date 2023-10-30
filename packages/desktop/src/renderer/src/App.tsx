import { useState } from 'react'
import { Text, View } from 'react-native'

function App(): JSX.Element {
  const [username, setUsername] = useState<string>('')
  return (
    <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	 Hello world
    </div>
  )
}

export default App
