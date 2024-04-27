import { Dayjs } from "dayjs";
import { ref } from "vue"; /*
{
    "2024-02-26": {
        "21": {
            "01": [
                {
                    "lat": -188.751,
                    "lng": -18.3837,
                    "offline": false,
                    "last_update": "2024-02-26T20:55:00+01:00",
                    "player": "4711Jenny"
                },
 */

type Date = string;
type Hour = string;
type Minute = string;
type PlayerName = string;

export interface DataEntry {
  lat: number;
  lng: number;
  offline: boolean;
  last_update: Dayjs;
  player: string;
}

type File = Record<
  Date,
  Record<Hour, Record<Minute, Record<PlayerName, DataEntry>>>
>;

const file = ref<File>();

async function load(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  // For whatever fucking browser/js reason, gzip is automatically decompressed... ???
  return response.json();
}

load("positions_hierarchical.json")
  .then((r) => (file.value = r))
  .catch((r) => {
    console.log(r);
    alert(r);
  });

export function getStuff(timestamp: Dayjs): DataEntry[] | undefined {
  let f = file.value;
  if (f) {
    let day = f[timestamp.format("YYYY-MM-DD")];
    if (day) {
      const hour = day[timestamp.hour()];
      if (hour) {
        const minute = hour[timestamp.minute()];
        if (minute) {
          return minute;
        }
      }
    }
  }
  return undefined;
}
