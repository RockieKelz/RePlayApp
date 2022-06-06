import AsyncStorage from "@react-native-async-storage/async-storage";
export const storeData = async (name ,data) => {
    try {
      await AsyncStorage.setItem(name, data);
    } catch (e) {
      // saving error
      console.log("Error", e);
    }
  };


export const getData = async(name) => {
    try {
      const response = await AsyncStorage.getItem(name);  
      return response
    } catch (error) {
        return error
    }
}

export const TrackItem = ({songName, songArtists, picURL}) => {
	return (
		<div className='w-full flex items-start mb-7 w-full pr-8 truncate overflow-hidden'>
			<div className='hidden sm:block sm:w-12 sm:h-12 overflow-hidden rounded-full'>
				<img src={picURL} alt="track" className='object-cover'/>
			</div>
			<div className='ml-4 truncate'>
				<h4 className='text-gray-400 hover:text-white truncate' >{songName}</h4>
				{Array.isArray(songArtists) && songArtists ?
					<h3 className='text-sm text-gray-700 truncate'>{cleaner(songArtists)}</h3>
					:
					<h3 className='text-sm text-gray-700 truncate' >{songArtists}</h3>
				}
				
			</div>
		</div>

	)
}
export const convertMS = ( milliseconds ) =>
{
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
export const cleaner = (arr) => 
{
	const array = arr.map(solo => solo.name)
	return array.join(', ')
}