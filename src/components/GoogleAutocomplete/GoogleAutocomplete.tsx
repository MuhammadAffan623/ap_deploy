import Autocomplete from 'react-google-autocomplete'
import './style.scss'

const GoogleAutocomplete = ({
  handlePlaceSelect,
  resetKey
}: {
  handlePlaceSelect: (place: any) => void
  resetKey: any
}) => {
  return (
    <Autocomplete
      apiKey={import.meta.env.VITE_GOOGLE_MAP_API_KEY}
      onPlaceSelected={(place) => handlePlaceSelect(place)}
      className='google-autocomplete'
      key={resetKey}
    />
  )
}

export default GoogleAutocomplete
