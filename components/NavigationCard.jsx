import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { env } from '../env'
import { useDispatch } from 'react-redux'
import { setDestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavorites from './NavFavorites'
import { AntDesign } from '@expo/vector-icons'

const NavigationCard = () => {

    const navigation = useNavigation()

    const dispatch = useDispatch()

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <Text style={tw`text-center py-5 text-lg`}>Good Morning, Aman</Text>
            <View style={tw`border-t border-gray-200 flex-shrink`}>
                <View>
                    <GooglePlacesAutocomplete
                        onPress={(data, details = null) => {
                            dispatch(setDestination({
                                location: details.geometry.location,
                                description: data.description
                            }))
                            navigation.navigate('RideOptionsCard')
                        }}
                        fetchDetails={true}
                        enablePoweredByContainer={false}
                        minLength={2}
                        styles={toInputBoxTyle}
                        query={{ key: env.GOOGLE_MAPS_KEY, language: 'en' }}
                        placeholder='Where to?'
                        nearbyPlacesAPI='GooglePlacesSearch'
                        debounce={400} />
                </View>

                <NavFavorites />

                <View>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('RideOptionsCard')}
                    style={tw`bg-black px-4 py-2 w-28 flex flex-row items-center justify-center rounded-full ml-4 mt-2`}>
                        <AntDesign name='car' size={20} color="#fff" />
                        <Text style={tw`text-white ml-2`}>Ride</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const toInputBoxTyle = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: 20,
        flex: 0
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 10
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0
    },
})

export default NavigationCard