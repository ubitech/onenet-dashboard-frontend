import { ApexDataLabels, ApexFill, ApexPlotOptions, ApexResponsive, ApexTitleSubtitle, ApexTooltip, ApexXAxis, ApexYAxis } from "ng-apexcharts";

export type BarChartOptions = {
    dataLabels?: ApexDataLabels;
    yaxis?: ApexYAxis;
    fill?: ApexFill;
    title?: ApexTitleSubtitle;
    tooltip?: ApexTooltip;
    responsive?: ApexResponsive[];
  };