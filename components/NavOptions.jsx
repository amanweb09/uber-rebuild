import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'

const data = [
    {
        id: '123',
        title: 'Get a Ride',
        image: 'https://links.papareact.com/3pn',
        screen: 'MapScreen'
    },
    {
        id: '124',
        title: 'Order Food',
        image: 'https://links.papareact.com/28w',
        screen: 'EatsScreen'
    },
]

const NavOptions = () => {

    const navigation = useNavigation()

    const origin = useSelector(selectOrigin)

    return (
        <FlatList
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                    disabled={!origin}
                        onPress={() => navigation.navigate(item.screen)}
                        style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}>
                        <View style={!origin && tw`opacity-20`}>
                            <Image
                                style={[tw``, { width: 120, height: 120, resizeMode: 'contain' }]}
                                source={{ uri: item.image }} />
                            <Text style={tw`ml-2 font-semibold`}>{item.title}</Text>
                            <View style={tw`w-10 h-10 mt-4 flex items-center justify-center bg-black rounded-full`}>
                                <AntDesign
                                    style={tw`text-xl`}
                                    name='arrowright'
                                    color={'#fff'} />
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            }}
            horizontal
            data={data} />
    )
}

export default NavOptions