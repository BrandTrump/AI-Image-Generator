import Header from "@/components/Header";
import "./globals.css";
import PromptInput from "@/components/PromptInput";

export const metadata = {
  title: "DALL·E 2.0",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <PromptInput />
        {children}
      </body>
    </html>
  );
}
