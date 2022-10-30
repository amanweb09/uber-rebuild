import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import tw from 'twrnc'

const data = [
    {
        id: '123',
        icon: 'home',
        location: 'Home',
        destination: 'Karol Bagh, Delhi'
    },
    {
        id: '234',
        icon: 'briefcase',
        location: 'Work',
        destination: 'Cannaught Place, Delhi'
    },
]

const NavFavorites = () => {
    return (
        <FlatList
            keyExtractor={(item) => item.id}
            // ItemSeparatorComponent={() => {<View style={tw``}></View>}}
            data={data}
            renderItem={({ item }) => {
                return <TouchableOpacity style={tw`flex flex-row items-center p-3`}>
                    <View style={tw`mr-4 rounded-full w-10 h-10 bg-gray-300 p-3 flex items-center justify-center`}>
                        <Entypo
                            color={'#fff'}
                            size={20}
                            name={item.icon} />
                    </View>
                    <View>
                        <Text style={tw`font-semibold`}>{item.location}</Text>
                        <Text style={tw`text-gray-500`}>{item.destination}</Text>
                    </View>
                </TouchableOpacity>
            }} />
    )
}

export default NavFavorites