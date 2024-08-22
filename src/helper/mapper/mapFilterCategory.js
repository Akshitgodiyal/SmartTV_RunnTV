export function mapFilterCategory(response) {
  return response.map((data) => ({
    id: data.categoryId,
    code: data.code,
    name: data.name,
    description: data.description,
    shortDescription: data.shortDescription,
    isActive: data.active,
    isObsolete: data.obsolete,
    displayOnHome: data.displayOnHome,
    displayOnDiscover: data.displayOnDiscover,
    order: data.orderId,
    images: {
      poster: data.posterImagePath,
      enabledIcon: data.enableIconImagePath,
      disabledIcon: data.disableIconImagePath,
    }
    // id: channel.id,
    // title: channel.title,
    // playUrl: channel.playUrl,
    // description: channel.description,
    // image: channel.images,
    // baseSourceLocation: channel.baseSourceLocation,
    // categories: channel.categories.map(category => category.name),
    // schedules: channel.schedules
  }));
}
