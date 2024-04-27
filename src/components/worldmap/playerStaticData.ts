export interface StaticPlayerData {
    type: "Spieler" | "Burgwache",
    player: string,
    group: string,
    role: string,
    twitch: string,
    username: string,
    has_twitch: boolean,
}

import raw from "@/misc/merged_static_data.json";

const raaw = raw as StaticPlayerData[];



const byTwitchName_ = new Map<string, StaticPlayerData>();
raaw.forEach(e => byTwitchName_.set(e.twitch, e));

export const byTwitchName = byTwitchName_;


