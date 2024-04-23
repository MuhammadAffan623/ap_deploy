import GoogleMapReact from 'google-map-react'
import MarkerImage from '../../assets/icons/location-pin.png'

const AnyReactComponent = ({ lat, lng }: { lat: number; lng: number }) => (
  <div
    style={{
      width: '30px',
      height: '30px',
      backgroundImage: `url(${MarkerImage})`,
      backgroundSize: 'cover',
      textAlign: 'center',
      color: 'black',
      fontWeight: 'bold',
      fontSize: '16px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <div style={{ display: 'none' }}>{lat + lng}</div>
  </div>
)

export default function Map({ latitude, longitude }: { latitude: number; longitude: number }) {
  const defaultProps = {
    center: {
      lat: latitude ?? 10.99835602,
      lng: longitude ?? 77.01502627
    },
    zoom: 11
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '20vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: import.meta.env.VITE_GOOGLE_MAP_API_KEY
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={latitude} lng={longitude} />
      </GoogleMapReact>
    </div>
  )
}
