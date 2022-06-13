export const refresher = (arr) => 
{
	const array = arr.map(solo => solo.name)
	return array.join(', ')
}

export const genreRefresher = (ar) => {
	const capped = ar.map(gen => gen[0].toUpperCase()+gen.slice(1))
	return capped.slice(0, 3).join(', ')
}

export const SingleCard = ({imageURL, itemName}) => {
	return (
		<div >
			<div >
				<div >
					<img src={imageURL} alt="" />
				</div>
				<div >
					<h3 >{itemName}</h3>
				</div>
			</div>
		</div>
	)
}

export const DoubleCard = ({imageURL, subItem, itemName}) => 
{
	return (
		<div >
			<div>
				<div>
					<img src={imageURL} alt=""/>
				</div>
				<div>
					<h3 >{itemName}</h3>
					<div >
						{Array.isArray(subItem) ? 
							<h3 className='truncate'>{refresher(subItem)}</h3> 
							: 
							<h3 className='truncate'>{subItem}</h3>}
					</div>
				</div>
			</div>
		</div>
	)
}

export const TrackItem = ({songName, songArtists, picURL}) => {
	return (
		<div >
			<div >
				<img src={picURL} alt="track" />
			</div>
			<div >
				<h4 c>{songName}</h4>
				{Array.isArray(songArtists) && songArtists ?
					<h3 >{refresher(songArtists)}</h3>
					:
					<h3  >{songArtists}</h3>
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

export const simplifyDate = (date) => 
{
	return date.split('T')[0]}