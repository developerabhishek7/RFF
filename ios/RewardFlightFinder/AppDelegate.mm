#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <Firebase.h>
#import <RNBranch/RNBranch.h>
#import <React/RCTLinkingManager.h>
#import <GoogleMaps/GoogleMaps.h>
#import <AuthenticationServices/AuthenticationServices.h>
#import <SafariServices/SafariServices.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>

@implementation AppDelegate
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
 // add this line using the api key obtained from Google Console
  [GMSServices provideAPIKey:@"AIzaSyBYRcO3WTvSbNLhK4nCqlJI1o-0coavH6k"];

   [FIRApp configure];
  self.moduleName = @"RewardFlightFinder";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];

  [RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES];
}

// func application(_ app: UIApplication, open url: URL, options: [UIApplicationOpenURLOptionsKey : Any] = [:]) -> Bool {
//   return RNBranch.application(app, open:url, options:options)
// }

// func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([Any]?) -> Void) -> Bool {
//   return RNBranch.continue(userActivity)
// }

// -------------------------OR---------------------

- (BOOL)application:(UIApplication *)app openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

  if([[FBSDKApplicationDelegate sharedInstance]application:app
                                                       openURL:url
                                                       options:options]){
                                                        return YES;
                                                       }
  [[Branch getInstance] application:app openURL:url options:options];
  return YES;
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  // handler for Push Notifications
  [[Branch getInstance] handlePushNotification:userInfo];
}


- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler {
  // handler for Universal Links
  [[Branch getInstance] continueUserActivity:userActivity];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                         openURL:url
                                               sourceApplication:sourceApplication
                                                      annotation:annotation];
}

// - (BOOL)application:(UIApplication *)application
//    openURL:(NSURL *)url
//    options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
// {
//   NSString *fbScheme = [NSString stringWithFormat:@"fb%@", NSBundle.mainBundle.infoDictionary[@"FacebookAppID"]];
//   if ([[url scheme] isEqualToString:fbScheme]) {
//       return [super application:application openURL:url options:options];
//   }
//   return [RCTLinkingManager application:application openURL:url options:options];
// }

@end
