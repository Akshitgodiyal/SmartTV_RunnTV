
export function mapChannel(channel){
  return {
  id: channel.id,
  title: channel.title,
  playUrl: channel.playUrl,
  description: channel.description,
  image: channel.images,
  baseSourceLocation: channel.baseSourceLocation,
  categories: channel.categories.map(category => category.name),
  schedules: channel.schedules,
  layout: "horizontal"
 } 
}

export function mapChannelEpg(response) {
  return response.map((channel, index) => ({
    ...mapChannel(channel),
    previousChannel: index === 0 ? null : response[index - 1] ,
    previousChannelIndex: index === 0 ? null : index - 1 , // Correctly fetch the previous channel
    nextChannel: index === response.length - 1 ? null : response[index + 1], // Fetch the next channel, if it exists
    nextChannelIndex: index === response.length - 1 ? null : index + 1
  }));
}