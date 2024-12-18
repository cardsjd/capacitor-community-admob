// This enum should be keep in sync with their native equivalents with the same name
export enum OpenAdPluginEvents {
  /**
   * Emits after trying to prepare an open ad, when it is loaded and ready to be show
   */
  Loaded = 'openAdLoaded',
  /**
   * Emits after trying to prepare an open ad, when it could not be loaded
   */
  FailedToLoad = 'openAdFailedToLoad',
  /**
   * Emits when the open ad is visible to the user
   */
  Showed = 'openAdShown',
  /**
   * Emits when the open ad is failed to show
   */
  FailedToShow = 'openAdFailedToShow',
  /**
   * Emits when the open ad is not visible to the user anymore.
   */
  Dismissed = 'openAdDismissed',
}
