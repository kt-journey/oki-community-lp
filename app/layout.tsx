import type { Metadata } from "next";
import Script from "next/script";
import { Zen_Kaku_Gothic_New, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const zenKaku = Zen_Kaku_Gothic_New({
  variable: "--font-zen",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Okey-Dokey | 隠岐の島町 UIターン者コミュニティ",
  description: "隠岐の島町に暮らす20〜50代のIターン・Uターン者のための、職場でもご近所でもない第3の居場所。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html
      lang="ja"
      className={`${zenKaku.variable} ${plusJakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {gtmId ? (
          <Script id="gtm-base" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}
        {metaPixelId ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');`}
          </Script>
        ) : null}
      </head>
      <body className="min-h-full flex flex-col bg-[#0d9488] text-white">
        {/* Fixed Background Video Layer (Bright Emerald-Teal Shift) */}
        <video
          className="fixed top-0 left-0 w-screen h-screen object-cover -z-20 pointer-events-none [filter:hue-rotate(-38deg)_brightness(1.15)_saturate(1.05)]"
          src="/video/background.webm"
          loop
          autoPlay
          muted
          playsInline
        />
        {/* Light Emerald Overlay (海士町と差別化した明るいエメラルドティール) */}
        <div className="fixed top-0 left-0 w-screen h-screen -z-10 bg-gradient-to-b from-[#14b8a6]/20 via-[#10b981]/15 to-[#0d9488]/25 backdrop-brightness-125 pointer-events-none" />
        
        {children}
      </body>
    </html>
  );
}
