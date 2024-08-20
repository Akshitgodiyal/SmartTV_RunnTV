export function mapChannelEpg(response) {
    return response.map(channel => ({
      id: channel.id,
      title: channel.title,
      playUrl: channel.playUrl,
      description: channel.description,
      image: channel.images,
      baseSourceLocation: channel.baseSourceLocation,
      categories: channel.categories.map(category => category.name),
      schedules: channel.schedules,
      layout: "horizontal"
    }));
  }