import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const pretendardR = localFont({
  src: "./fonts/Pretendard-Regular.woff", // 실제 넣으신 파일명으로 바꾸세요
  variable: "--font-pretendard-r",
});

export const metadata: Metadata = {
  title: "StuDash",
  description: "Study Dashboard",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${pretendardR.variable} ${pretendardR.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* <Topbar /> */}
        {children}
      </body>
    </html>
  );
}
