import Foundation
import Capacitor
import GoogleMobileAds

class AdOpenExecutor: NSObject, GADFullScreenContentDelegate {
    weak var plugin: AdMobPlugin?
    var openad: GADAppOpenAd!

    func prepareOpen(_ call: CAPPluginCall, _ request: GADRequest, _ adUnitID: String) {
		GADAppOpenAd.load(
            withAdUnitID: adUnitID,
            request: request,
            completionHandler: { (ad, error) in
                if let error = error {
                    NSLog("Open ad failed to load with error: \(error.localizedDescription)")
                    self.plugin?.notifyListeners(OpenAdPluginEvents.FailedToLoad.rawValue, data: [
                        "code": 0,
                        "message": error.localizedDescription
                    ])
                    call.reject("Loading failed")
                    return
                }

                self.openad = ad
                self.openad.fullScreenContentDelegate = self
                self.plugin?.notifyListeners(OpenAdPluginEvents.Loaded.rawValue, data: [
                    "adUnitId": adUnitID
                ])
                call.resolve([
                    "adUnitId": adUnitID
                ])
            }
        )
    }

    func showOpen(_ call: CAPPluginCall) {
        if let rootViewController = plugin?.getRootVC() {
            if let ad = self.openad {
                ad.present(fromRootViewController: rootViewController)
                call.resolve([:])
            } else {
                NSLog("Ad wasn't ready")
                call.reject("Ad wasn't ready")
            }
        }
    }

    func ad(_ ad: GADFullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        NSLog("c Ad failed to present full screen content with error \(error.localizedDescription).")
        self.plugin?.notifyListeners(OpenAdPluginEvents.FailedToShow.rawValue, data: [
            "code": 0,
            "message": error.localizedDescription
        ])
    }

    func adWillPresentFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        NSLog("openad Ad did present full screen content.")
        self.plugin?.notifyListeners(OpenAdPluginEvents.Showed.rawValue, data: [:])
    }

    func adDidDismissFullScreenContent(_ ad: GADFullScreenPresentingAd) {
        NSLog("openad Ad did dismiss full screen content.")
        self.plugin?.notifyListeners(OpenAdPluginEvents.Dismissed.rawValue, data: [:])
    }
}
