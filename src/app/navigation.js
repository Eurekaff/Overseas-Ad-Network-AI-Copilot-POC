import { Activity, Bot, ClipboardCheck, Target, Video } from "lucide-react";

export function makeNavigation(t) {
  return [
    ["overview", t.nav.overview, Activity],
    ["advertiser", t.nav.advertiser, Target],
    ["developer", t.nav.developer, Video],
    ["copilot", t.nav.copilot, Bot],
    ["followup", t.nav.followup, ClipboardCheck]
  ];
}
