import areaData from "@/components/worldmap/areaData";
import * as L from "leaflet";

export default L.layerGroup(
  areaData.map((b) => {
    var poly = L.polygon(b.coords, {
      color: b.color || "#fcc77f",
      weight: 2,
      fill: false,
    });
    poly
      .bindTooltip(b.name, { permanent: true, direction: "center" })
      .openTooltip();
    return poly;
  }),
);
