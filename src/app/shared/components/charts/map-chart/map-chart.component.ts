import { Component, Input, OnInit, Inject, NgZone, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { MapChartDataPoint } from 'src/app/features/dashboard/interfaces/MapChartDataPoint';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5themes_Kelly from '@amcharts/amcharts5/themes/Kelly';
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";

@Component({
  selector: 'app-map-chart',
  templateUrl: './map-chart.component.html',
  styleUrls: ['./map-chart.component.scss']
})

export class MapChartComponent {
  @Input() private data: MapChartDataPoint[];
  private root!: am5.Root;
  private bubbleSeries: am5map.MapPointSeries;
  private colors: am5.ColorSet;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private zone: NgZone) {}

  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      let root = am5.Root.new("accessmapchart");

      root.setThemes([
        am5themes_Animated.new(root),
        am5themes_Kelly.new(root)
      ]);

      var chart = root.container.children.push(
        am5map.MapChart.new(root, {
          homeZoomLevel: 1.7,
          panX: "translateX",
          panY: "translateY",
          projection:
          am5map.geoMercator(),
        })

      );

      var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
      backgroundSeries.mapPolygons.template.setAll({
        fill: root.interfaceColors.get("alternativeBackground"),
        fillOpacity: 0,
        strokeOpacity: 0
      });

      var polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow,
          exclude: ["AQ"]
        })
      );

      // Make chart respect homeZoomLevel
      polygonSeries.events.on("datavalidated", function() {
        chart.goHome();
      });

      polygonSeries.mapPolygons.template.setAll({
        fill: root.interfaceColors.get("alternativeBackground"),
        fillOpacity: 0.15,
        strokeWidth: 0.5,
        stroke: root.interfaceColors.get("background")
      });

      const circleTemplate = <am5.Template<am5.Circle>> am5.Template.new({
        tooltipText: "{countryName}: {value} requests"
      });

      this.bubbleSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {
          calculateAggregates: true,
          valueField: "hitsCount",
          polygonIdField: "countryIso"
        })
      );

      this.colors = am5.ColorSet.new(root, {});

      let thisColors = this.colors;
      this.bubbleSeries.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(
            root,
            {
              fill: thisColors.next(),
              radius: 10,
              strokeOpacity: 0.5,
              strokeWidth: 2,
              stroke: root.interfaceColors.get("background"),
              templateField: "circleTemplate"
            },
            <am5.Template<am5.Circle>> circleTemplate)
        });
      });

      this.bubbleSeries.set("heatRules", [{
        target: circleTemplate,
        min: 8,
        max: 20,
        key: "radius",
        dataField: "value"
      }]);

      chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

      let exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {})
      });

      let component = this
      exporting.get("menu").set("items", [
        // Not yet available in amcharts5
        // {
        //   type: "format",
        //   format: "svg",
        //   label: "Download SVG"
        // },
        {
          type: "format",
          format: "png",
          label: "Download PNG"
        },
        // Custom CSV download option
        {
          type: "custom",
          label: "Download CSV",
          callback: function() {
            component.downloadCsv()
          }
        },
      ]);

      // Make stuff animate on load
      chart.appear(1000, 100);

      this.root = root;
    });
  }

  downloadCsv() {
    const header = "Country Code,Country,Hits\n"
    let content = "data:text/csv;charset=utf-8,"+header
    for (const dataPoint of this.data) {
      content=content+`${dataPoint.countryIso},"${dataPoint.countryName}",${dataPoint.hitsCount}\n`
    }
    let encodedUri = encodeURI(content);
    let hiddenLink = document.createElement("a");
    hiddenLink.setAttribute("href", encodedUri);
    hiddenLink.setAttribute("download", "map-data.csv");
    document.body.appendChild(hiddenLink); // Required for FF
    hiddenLink.click();
  }

  ngOnChanges() {
    if (this.bubbleSeries) {
      this.colors.reset();
      this.bubbleSeries.data.setAll(this.data);
    }
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.root) {
        this.root.dispose();
      }
    });
  }

}
