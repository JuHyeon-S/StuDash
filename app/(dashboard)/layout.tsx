import Topbar from "../Topbar";

export default function DashboardGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Topbar liveBadge />
      {children}
    </>
  );
}
