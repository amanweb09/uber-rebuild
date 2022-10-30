import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import MapElement from '../components/Map'
import { createStackNavigator } from '@react-navigation/stack'
import NavigationCard from '../components/NavigationCard'
import RideOptionsCard from '../components/RideOptionsCard'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Map = () => {

    const Stack = createStackNavigator()

    const navigation = useNavigation()

    return (
        <View>

            <TouchableOpacity
                onPress={() => navigation.navigate('HomeScreen')}
                style={tw`bg-gray-100 absolute top-8 left-4 z-50 p-3 rounded-full shadow-lg`}>
                <Entypo name='menu' color={'#000'} size={25} />
            </TouchableOpacity>

            <View style={tw`h-1/2`}>
                <MapElement />
            </View>
            <View style={tw`h-1/2`}>
                <Stack.Navigator>
                    <Stack.Screen
                        name='NavigationCard'
                        component={NavigationCard}
                        options={{ headerShown: false }} />
                    <Stack.Screen
                        name='RideOptionsCard'
                        component={RideOptionsCard}
                        options={{ headerShown: false }} />
                </Stack.Navigator>
            </View>
        </View>
    )
}

export default Map