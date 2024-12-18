package com.getcapacitor.community.admob.open

import com.getcapacitor.community.admob.models.LoadPluginEventNames

object OpenAdPluginPluginEvent: LoadPluginEventNames {
    const val Loaded = "openAdLoaded"
    const val FailedToLoad = "openAdFailedToLoad"
    override val Showed = "openAdShown"
    override val FailedToShow = "openAdFailedToShow"
    override val Dismissed = "openAdDismissed"
}
