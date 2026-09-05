"use client";

import { useEffect, useRef } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import Panel from "./Panel";

am4core.useTheme(am4themes_animated);
const data = [
  {
    name: "web-01.prod",
    value: 30,
    color: am4core.color("#38bdf8"),
    children: [
      {
        name: "185.220.101.47",
        value: 12,
        color: am4core.color("#f87171"),
        linkWith: ["api-03.prod"],
      },
      { name: "198.51.100.23", value: 9, color: am4core.color("#f87171") },
      { name: "91.242.68.3", value: 6, color: am4core.color("#f87171") },
      { name: "172.104.22.9", value: 4, color: am4core.color("#f87171") },
      { name: "203.0.113.55", value: 3, color: am4core.color("#f87171") },
    ],
  },
  {
    name: "api-03.prod",
    value: 26,
    color: am4core.color("#38bdf8"),
    children: [
      {
        name: "45.155.204.88",
        value: 14,
        color: am4core.color("#f87171"),
        linkWith: ["db-02.prod"],
      },
      { name: "103.45.12.9", value: 8, color: am4core.color("#f87171") },
      { name: "185.147.23.4", value: 5, color: am4core.color("#f87171") },
      { name: "77.83.36.19", value: 3, color: am4core.color("#f87171") },
    ],
  },
  {
    name: "db-02.prod",
    value: 24,
    color: am4core.color("#38bdf8"),
    children: [
      { name: "194.26.29.156", value: 11, color: am4core.color("#f87171") },
      { name: "89.248.165.74", value: 7, color: am4core.color("#f87171") },
      { name: "45.146.164.110", value: 5, color: am4core.color("#f87171") },
      { name: "5.188.206.18", value: 4, color: am4core.color("#f87171") },
      { name: "141.98.11.87", value: 3, color: am4core.color("#f87171") },
    ],
  },
];
export default function AttackOriginsNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = am4core.create(
      containerRef.current,
      am4plugins_forceDirected.ForceDirectedTree,
    );
    const series = chart.series.push(
      new am4plugins_forceDirected.ForceDirectedSeries(),
    );
    series.data = data;

    series.dataFields.value = "value";
    series.dataFields.name = "name";
    series.dataFields.children = "children";
    series.dataFields.id = "name";
    series.dataFields.linkWith = "linkWith";
    series.dataFields.color = "color";

    series.nodes.template.label.text = "{name}";
    series.nodes.template.label.fill = am4core.color("#e5e7eb");
    series.nodes.template.fillOpacity = 1;

    // 색은 자동 배정에 맡기고, 테두리만 두껍게+밝게
    series.nodes.template.circle.strokeWidth = 0;
    series.nodes.template.circle.stroke = am4core.color("#ffffff");
    series.nodes.template.circle.strokeOpacity = 0.6;

    series.links.template.stroke = am4core.color("#94a3b8"); // 밝은 회색
    series.links.template.strokeOpacity = 0.4;
    series.links.template.strokeWidth = 1.5; // 지난번 얘기한 두께

    series.minRadius = 12;
    series.maxRadius = 28;
    series.fontSize = 11;

    series.manyBodyStrength = -30; // 노드끼리 밀어내는 힘 (기본값 -15 정도) — 더 음수로 갈수록 더 벌어짐
    series.centerStrength = 0.3; // 중심으로 끌어당기는 힘 — 낮출수록 중앙에 안 뭉치고 퍼짐
    series.links.template.distance = 1.6; // 링크로 연결된 노드 사이 "이상적인 거리" — 키울수록 더 멀어짐

    return () => {
      chart.dispose();
    };
  }, []);

  return (
    <Panel className="flex flex-col gap-3 h-65">
      <div className="text-white">GLOBAL ATTACK ORIGINS — NETWORK</div>
      <div ref={containerRef} className="flex-1" />
    </Panel>
  );
}
