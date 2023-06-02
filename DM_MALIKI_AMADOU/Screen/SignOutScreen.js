import {useContext} from 'react'; // importer le token pour que quand je clic sur Sign me out il le met à null pour me deconnecter

import {Button} from 'react-native'

import {TokenContext} from '../Context/Context';

export default function SignOutScreen ({ navigation, route }) {

  const[token, setToken] = useContext(TokenContext);
  
  return <Button title='Sign me out' onPress={() => {setToken(null);navigation.navigate('Home')}} /> //Pour rediriger vers la page d'accueil

}
