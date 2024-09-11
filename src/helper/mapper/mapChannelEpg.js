export function mapChannel(channel) {
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
  };
}

export function mapChannelEpg(response,categoryIndex) {
  // Filter out channels that have null or empty schedules
  const filteredChannels = response.filter(channel => channel.schedules && channel.schedules.length > 0);

  return filteredChannels.map((channel, index) => ({
    ...mapChannel(channel),
    categoryIndex:categoryIndex,
    previousChannel: index === 0 ? null : filteredChannels[index - 1],
    previousChannelIndex: index === 0 ? null : index - 1, // Correctly fetch the previous channel
    nextChannel: index === filteredChannels.length - 1 ? null : filteredChannels[index + 1], // Fetch the next channel, if it exists
    nextChannelIndex: index === filteredChannels.length - 1 ? null : index + 1
  }));
}