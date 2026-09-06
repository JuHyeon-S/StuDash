import StatRow from "../../components/StatRow";
import ThreatActivityChart from "../../components/ThreatActivityChart";
import ThreatCategoriesChart from "../../components/ThreatCategoriesChart";
import TopTargetedServersChart from "../../components/TopTargetedServersChart";
import AttackOriginsMap from "../../components/AttackOriginsMap";
import RecentEventsTable from "../../components/RecentEventsTable";
import ServerStatusGrid from "../../components/ServerStatusGrid";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 flex-1 w-full p-6">
      <StatRow />
      <div className="flex w-full gap-4 h-1/4">
        <div className="w-5/7">
          <ThreatActivityChart></ThreatActivityChart>
        </div>
        <div className="w-2/7">
          <ThreatCategoriesChart></ThreatCategoriesChart>
        </div>
      </div>
      <div className="flex w-full gap-4 h-1/4">
        <div className="w-3/7">
          <TopTargetedServersChart></TopTargetedServersChart>
        </div>
        <div className="w-4/7">
          <AttackOriginsMap></AttackOriginsMap>
        </div>
      </div>
      <div className="flex w-full gap-4 h-1/4">
        <div className="w-4/7">
          <RecentEventsTable />
        </div>
        <div className="w-3/7">
          <ServerStatusGrid></ServerStatusGrid>
        </div>
      </div>
    </div>
  );
}
