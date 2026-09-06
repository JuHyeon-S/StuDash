import Topbar from "../Topbar";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Topbar liveBadge />
      {children}
    </>
  );
}
