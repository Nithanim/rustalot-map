import * as L from "leaflet";
import { byTwitchName } from "@/components/worldmap/playerStaticData";
import type { Ref } from "vue";
import { ref, watch } from "vue";
import { Dayjs } from "dayjs";
import { getStuff } from "@/components/worldmap/positions/storage";

let iconSize = [35, 35];
const BaseIcon = L.Icon.extend({
  options: {
    iconUrl: "streamers/TO-BE-FILLED-IN.webp",
    // shadowUrl: 'leaf-shadow.png',
    iconSize: iconSize,
    shadowSize: [50, 64],
    iconAnchor: iconSize.map((e) => e / 2),
    //shadowAnchor: [4, 62],
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
  },
});

const layerGroup = L.layerGroup([]);

const positionsByTwitch = new Map<string, Ref<[number, number] | undefined>>();

const markersByTwitch = new Map<string, L.Icon>();

let defaultIconUri =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70"><text x="35" y="35" fill="black" style="font: bold 60px sans-serif; dominant-baseline: middle; text-anchor: middle;">?</text></svg>';

function getIconUrl(twitch: string) {
  switch (twitch) {
    case "smeggo_":
      return defaultIconUri;
    default:
      return `streamers/${twitch}.webp`;
  }
}

byTwitchName.forEach((e) => {
  const icon = new BaseIcon({ iconUrl: getIconUrl(e.twitch) }); //.bindPopup(e.player);
  const marker = L.marker([0, 0], { icon });

  const pos = ref();
  positionsByTwitch.set(e.twitch.toLowerCase(), pos);
  watch(pos, (newValue, oldValue) => {
    if (newValue) {
      marker.setLatLng(newValue);
    }
    if (newValue && !oldValue) {
      marker.addTo(layerGroup);
    }
    if (!newValue && oldValue) {
      layerGroup.removeLayer(marker);
    }
  });

  markersByTwitch.set(e.twitch, marker);
});

export function setToTime(t: Dayjs) {
  const utc = t.utc();
  // file is "2024-02-26T20:01:00+00:00"
  //let key = utc.format("YYYY-MM-DDTHH:mm:ss[+00:00]");

  //const u = dataEntries[key];
  //if(u) {
  const stuff = getStuff(t);
  if (stuff) {
    // would be cool, but data is currently not indexed by player
    /*
    positionsByTwitch.forEach((v, k) => {
      v.value = stuff[k]
    })
    */

    // So we do this instead :(
    // Aaaand of course the twitch names are not normalized :(
    const seenPlayer = new Set<string>();
    stuff.forEach((e) => {
      // let key = posPlayerNameToTwitchName(e.player);
      let key = e.twitch;
      let resolvedPlayerPosRef = positionsByTwitch.get(key);
      if (resolvedPlayerPosRef) {
        resolvedPlayerPosRef.value = [e.lat, e.lng];
        seenPlayer.add(key);
      } else {
        console.log("Missing player for position markers: {}", key);
      }
    });
    positionsByTwitch.forEach((v, k) => {
      if (!seenPlayer.has(k.toLowerCase())) {
        v.value = undefined;
      }
    });
  } else {
    positionsByTwitch.forEach((v, k) => {
      v.value = undefined;
    });
  }
}

export const layerGroupPlayerPositions = layerGroup;
