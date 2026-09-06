import Topbar from "../Topbar";
import Sidebar from "../components/Sidebar";

export default function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Topbar />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </>
  );
}
