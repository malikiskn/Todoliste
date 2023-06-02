
import {UsernameContext} from '../Context/Context'
import {useContext} from 'react'
import {Text,View} from 'react-native'
//import TodoItem from './components/TodoItem';
export default function HomeScreen () {
  const [username, setUsername] = useContext(UsernameContext)
  return (
    <UsernameContext.Consumer>
      {([username,setUsername]) =>{
        return(
          <View>
            <Text>Welcome !</Text>
            <Text>You are logged as {username}</Text>
          </View>
        )
      }}
    </UsernameContext.Consumer>
  )
}
