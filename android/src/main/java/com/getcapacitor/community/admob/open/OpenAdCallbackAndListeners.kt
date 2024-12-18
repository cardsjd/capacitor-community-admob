package com.getcapacitor.community.admob.open

import com.getcapacitor.JSObject
import com.getcapacitor.PluginCall
import com.getcapacitor.community.admob.helpers.FullscreenPluginCallback
import com.getcapacitor.community.admob.models.AdMobPluginError
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.appopen.AppOpenAd;
import com.google.android.gms.ads.appopen.AppOpenAd.AppOpenAdLoadCallback;
import com.google.android.gms.common.util.BiConsumer

object OpenAdCallbackAndListeners {

    fun getOpenAdLoadCallback(call: PluginCall,
                                      notifyListenersFunction: BiConsumer<String, JSObject>,
    ): AppOpenAdLoadCallback {
        return object : AppOpenAdLoadCallback() {
            override fun onAdLoaded(ad: AppOpenAd) {
                ad.fullScreenContentCallback = FullscreenPluginCallback(OpenAdPluginPluginEvent, notifyListenersFunction)

                AdOpenExecutor.ad = ad

                val adInfo = JSObject()
                adInfo.put("adUnitId", ad.adUnitId)
                call.resolve(adInfo)

                notifyListenersFunction.accept(OpenAdPluginPluginEvent.Loaded, adInfo)
            }

            override fun onAdFailedToLoad(adError: LoadAdError) {
                val adMobError = AdMobPluginError(adError)

                notifyListenersFunction.accept(OpenAdPluginPluginEvent.FailedToLoad, adMobError)
                call.reject(adError.message)
            }
        }
    }
}
