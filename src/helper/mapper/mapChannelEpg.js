export function mapChannel(channel) {
  return {
    id: channel.id,
    title: channel.title,
    playUrl: channel.playUrl,
    description: channel.description,
    image: channel.images,
    baseSourceLocation: channel.baseSourceLocation,
    categories: channel.categories.map(category => category),
    categoryIds: channel.categoryIds,
    csaiAdTag: channel.csaiAdTag,
    customAttribute: channel.customAttribute,
    displayOrder: channel.displayOrder,
    endAt: channel.endAt,
    epgCount: channel.epgCount,
    featureDisplayOrder: channel.featureDisplayOrder,
    forceLoginWatchDuration: channel.forceLoginWatchDuration,
    genreIds: channel.genreIds,
    genres: channel.genres,
    isDisplayOnPartnerApp: channel.isDisplayOnPartnerApp,
    isDisplayOnRunnApp: channel.isDisplayOnRunnApp,
    isFeatured: channel.isFeatured,
    isForceLogin: channel.isForceLogin,
    isKidsSafe: channel.isKidsSafe,
    isPartnerChannel: channel.isPartnerChannel,
    isStartOverEnabled: channel.isStartOverEnabled,
    isWatchListEnabled: channel.isWatchListEnabled,
    languageIds: channel.languageIds,
    languages: channel.languages.map(language => language.name),
    schedules: channel.schedules,
    setupDate: channel.setupDate,
    startAt: channel.startAt,
    theme: channel.theme.map(themeItem => themeItem.name),
    vastCsaiTag: channel.vastCsaiTag,
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
export function setChannelIndex(list){
  return list.map((channel, index) => ({ 
    ...channel,
    previousChannel: index === 0 ? null : list[index - 1],
    previousChannelIndex: index === 0 ? null : index - 1, // Correctly fetch the previous channel
    nextChannel: index === list.length - 1 ? null : list[index + 1], // Fetch the next channel, if it exists
    nextChannelIndex: index === list.length - 1 ? null : index + 1
  }));
}