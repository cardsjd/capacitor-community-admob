import type { PluginListenerHandle } from '@capacitor/core';

import type { ValidateAllEventsEnumAreImplemented } from '../private/validate-all-events-implemented.type';
import type { AdLoadInfo, AdMobError, AdOptions } from '../shared';

import type { OpenAdPluginEvents } from './open-ad-plugin-events.enum';

// This is just to validate that we do not forget to implement any event name
export type OpenDefinitionsHasAllEvents = ValidateAllEventsEnumAreImplemented<OpenAdPluginEvents, OpenDefinitions>;

export interface OpenDefinitions {
  /**
   * Prepare Open banner
   *
   * @group Open
   * @param options AdOptions
   * @since 1.1.2
   */
  prepareOpen(options: AdOptions): Promise<AdLoadInfo>;

  /**
   * Show Open ad when it’s ready
   *
   * @group Open
   * @since 1.1.2
   */
  showOpen(): Promise<void>;

  addListener(
    eventName: OpenAdPluginEvents.FailedToLoad,
    listenerFunc: (error: AdMobError) => void,
  ): Promise<PluginListenerHandle>;

  addListener(
    eventName: OpenAdPluginEvents.Loaded,
    listenerFunc: (info: AdLoadInfo) => void,
  ): Promise<PluginListenerHandle>;

  addListener(eventName: OpenAdPluginEvents.Dismissed, listenerFunc: () => void): Promise<PluginListenerHandle>;

  addListener(
    eventName: OpenAdPluginEvents.FailedToShow,
    listenerFunc: (error: AdMobError) => void,
  ): Promise<PluginListenerHandle>;

  addListener(eventName: OpenAdPluginEvents.Showed, listenerFunc: () => void): Promise<PluginListenerHandle>;
}
