import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn'
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8'
  },
  {
    id: 'Uber-Lux-789',
    title: 'Uber Lux',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf'
  }
]

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {

  const navigation = useNavigation()

  const [selected, setSelected] = useState(null)

  const travelTimeInfo = useSelector(selectTravelTimeInformation)

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw`flex flex-row items-center`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('NavigationCard')}
          style={tw`absolute left-5`}>
          <Entypo
            style={tw`shadow-md rounded-full`}
            name='chevron-left'
            size={25}
            color="#000" />
        </TouchableOpacity>
        <Text style={tw`text-center text-lg flex-1 py-5`}>Select a Ride - {travelTimeInfo?.distance?.text}</Text>
      </View>

      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        renderItem={({ item }) => {
          return <TouchableOpacity
            onPress={() => setSelected(item)}
            style={[tw`flex-row justify-between items-center px-6 ${item === selected && 'bg-gray-200'}`]}>
            <Image
              style={{ width: 85, height: 85, resizeMode: 'contain' }}
              source={{ uri: item.image }} />
            <View style={tw`-ml-6`}>
              <Text style={tw`font-semibold text-lg`}>{item.title}</Text>
              <Text>{travelTimeInfo?.duration?.text}</Text>
            </View>
            <Text style={tw`text-lg`}>

            {
              new Intl.NumberFormat('en-in', {
                style: 'currency',
                currency: 'INR'
              }).format(
                (travelTimeInfo?.duration.value * SURGE_CHARGE_RATE*item.multiplier)/25
              )
            }

            </Text>
          </TouchableOpacity>
        }} />

      <View style={tw``}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black ${!selected && 'bg-gray-300'} py-3 m-3`}>
          <Text style={tw`text-center text-white text-lg`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard