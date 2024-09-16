import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "fr", "hi", "id", "de", "ko", "ar", "sw"],

  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
    // Match only internationalized pathnames
    // matcher: ['/((?!api|_next|.*\\..*).*)'],
    matcher: ['/', '/payment', '/clients', '/invoice', '/report', '/settings', '/notifications', '/(en|fr|hi|id|de|ko|ar|sw)/:path*']
};