import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps'
import tw from 'twrnc'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirection from 'react-native-maps-directions'
import { env } from '../env'

const Map = () => {

    const dispatch = useDispatch()

    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination)

    const mapRef = useRef(null)

    useEffect(() => {
        if (!origin || !destination) return;

        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, left: 50, bottom: 50 }
        })

    }, [origin, destination])

    useEffect(() => {

        if(!origin || !destination) return;

        const getTravelTime = async() => {
            const url = `https://maps.google.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${env.GOOGLE_MAPS_KEY}`
            
            const res = await fetch(url)
            const data = await res.json()

            dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
        }
        getTravelTime()


    }, [origin, destination, env.GOOGLE_MAPS_KEY])

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: origin.location.lat,
                longitude: origin.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}>

            {origin && destination && (
                <MapViewDirection
                    apikey={env.GOOGLE_MAPS_KEY}
                    origin={origin.description}
                    destination={destination.description}
                    strokeWidth={3}
                    strokeColor='#000' />
            )}

            {
                origin?.location && <Marker coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
                    title="Pickup location"
                    description={origin.description}
                    identifier="origin" />
            }

            {
                destination?.location && <Marker coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                }}
                    title="Drop location"
                    description={destination.description}
                    identifier="destination" />
            }
        </MapView>
    )
}

export default Map