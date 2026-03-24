import "./globals.css";

export const metadata = {
  title: {
    default: "Michael Umoize | Full Stack Developer",
    template: "%s | Michael Umoize",
  },
  description:
    "Full-stack developer passionate about creating innovative and efficient web solutions.",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Michael Umoize" }],
  creator: "Michael Umoize",
  openGraph: {
    title: "Michael Umoize | Full Stack Developer",
    description:
      "Full-stack developer passionate about creating innovative and efficient web solutions.",
    url: "https://michael-portfolio-dev.vercel.app",
    siteName: "Michael Umoize Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Michael Umoize - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Umoize | Full Stack Developer",
    description:
      "Full-stack developer passionate about creating innovative and efficient web solutions.",
    images: ["/og-image.png"],
    creator: "@miketech_90",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
