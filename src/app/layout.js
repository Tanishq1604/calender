import { Bruno_Ace, Geist, Montserrat } from 'next/font/google';
import "./globals.css";


const Bruno = Bruno_Ace({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bruno',
});

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});



export const metadata = {
  title: "Nagar Nigam Calendar",
  description: "Official Calender of Nagar Nigam Moradabad.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${Bruno.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
