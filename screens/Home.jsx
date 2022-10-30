import React from 'react'
import { View, Text, Image, SafeAreaView } from 'react-native'
import tw from 'twrnc'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { env } from '../env'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import NavFavorites from '../components/NavFavorites'

const Home = () => {

    const dispatch = useDispatch()

    return (
        <SafeAreaView>
            <View style={tw`p-5`}>
                <Image
                    style={[tw``, { width: 100, height: 100, resizeMode: 'contain' }]}
                    source={{ uri: 'https://links.papareact.com/gzs' }} />

                <GooglePlacesAutocomplete
                    onPress={(data, details=null) => {
                        dispatch(setOrigin({
                            location: details.geometry.location,
                            description: data.description
                        }))
                        dispatch(setDestination(null))
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    minLength={2}
                    styles={{ container: { flex: 0 }, textInput: 18 }}
                    query={{ key: env.GOOGLE_MAPS_KEY, language: 'en' }}
                    placeholder='Where from'
                    nearbyPlacesAPI='GooglePlacesSearch'
                    debounce={400} />
                <NavOptions />
                <NavFavorites />
            </View>
        </SafeAreaView>
    )
}

export default Home