import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatDialogRef } from "@angular/material/dialog";
import { NavComponent } from "./components/nav/nav.component";
import { NavContentComponent } from "./components/nav/nav-content/nav-content.component";
import { ExpandedFilterComponent } from "./components/filters/expanded-filter/expanded-filter.component";
import { DeleteModalComponent } from "./components/modal/delete-modal/delete-modal.component";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "../core/core.module";

import { ActionsTooltipComponent } from "./components/actions-tooltip/actions-tooltip.component";
import { FormModalComponent } from "./components/modal/form-modal/form-modal.component";
import { NavToolbarComponent } from "./components/nav/nav-toolbar/nav-toolbar.component";
import { PaginatorComponent } from "./components/paginator/paginator.component";
import { ErrorContainerComponent } from "./components/error-container/error-container.component";
import { NavTooltipComponent } from "./components/nav/nav-tooltip/nav-tooltip.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { PieChartComponent } from "./components/charts/pie-chart/pie-chart.component";
import { NgApexchartsModule } from "ng-apexcharts";
import { AreaChartComponent } from "./components/charts/area-chart/area-chart.component";
import { SquareCardComponent } from "./components/cards/square-card/square-card.component";
import { AngularMaterialModule } from "../core/angular-material/angular-material";
import { ExpantedCardComponent } from "./components/cards/expanted-card/expanted-card.component";
import { SimpleSearchFilterComponent } from "./components/filters/simple-search-filter/simple-search-filter.component";
import { PageTitleComponent } from "./components/page-title/page-title.component";
import { PagePathComponent } from "./components/page-path/page-path.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { BackButtonComponent } from "./components/forms/back-button/back-button.component";
import { ModalSkeletonComponent } from "./components/modal/modal-skeleton/modal-skeleton.component";
import { TranslateModule } from "@ngx-translate/core";
import { LanguageComponent } from "./components/language/language.component";
import { SearchInputComponent } from "./components/forms/search-input/search-input.component";
import { TextInputComponent } from "./components/forms/text-input/text-input.component";
import { DropdownInputComponent } from "./components/forms/dropdown-input/dropdown-input.component";
import { DatepickerInputComponent } from "./components/forms/datepicker-input/datepicker-input.component";
import { TextAreaComponent } from "./components/forms/text-area/text-area.component";
import { PasswordInputComponent } from "./components/forms/password-input/password-input.component";
import { RadioButtonComponent } from "./components/forms/radio-button/radio-button.component";
import { InfoComponent } from "./components/info/info.component";
import { SlideToggleComponent } from "./components/forms/slide-toggle/slide-toggle.component";
import { FilesModalComponent } from "./components/modal/files-modal/files-modal.component";
import { BuildingDropdownComponent } from "./components/building-dropdown/building-dropdown.component";
import { ClusteringFiltersComponent } from "./components/clustering-filters/clustering-filters.component";
import { ClusteringFilterPillComponent } from "./components/clustering-filters/clustering-filter-pill/clustering-filter-pill.component";
import { BarChartComponent } from "./components/charts/bar-chart/bar-chart.component";
import { StackedBarChartComponent } from "./components/charts/stacked-bar-chart/stacked-bar-chart.component";
import { RadialBarChartComponent } from './components/charts/radial-bar-chart/radial-bar-chart.component';
import { MapChartComponent } from './components/charts/map-chart/map-chart.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    NavComponent,
    NavTooltipComponent,
    NavContentComponent,
    ExpandedFilterComponent,
    ActionsTooltipComponent,
    FormModalComponent,
    NavToolbarComponent,
    DeleteModalComponent,
    ErrorContainerComponent,
    PaginatorComponent,
    InfoComponent,
    CheckboxComponent,
    PieChartComponent,
    AreaChartComponent,
    SquareCardComponent,
    ExpantedCardComponent,
    SimpleSearchFilterComponent,
    PageTitleComponent,
    PagePathComponent,
    SpinnerComponent,
    BackButtonComponent,
    ModalSkeletonComponent,
    LanguageComponent,
    SearchInputComponent,
    TextInputComponent,
    DropdownInputComponent,
    DatepickerInputComponent,
    TextAreaComponent,
    PasswordInputComponent,
    RadioButtonComponent,
    SlideToggleComponent,
    FilesModalComponent,
    BuildingDropdownComponent,
    ClusteringFiltersComponent,
    ClusteringFilterPillComponent,
    BarChartComponent,
    StackedBarChartComponent,
    RadialBarChartComponent,
    MapChartComponent,
    FooterComponent,
  ],
  exports: [
    FooterComponent,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgApexchartsModule,
    NavComponent,
    ExpandedFilterComponent,
    ActionsTooltipComponent,
    FormModalComponent,
    DeleteModalComponent,
    ErrorContainerComponent,
    PaginatorComponent,
    CheckboxComponent,
    PieChartComponent,
    AreaChartComponent,
    SquareCardComponent,
    AngularMaterialModule,
    ExpantedCardComponent,
    SimpleSearchFilterComponent,
    PageTitleComponent,
    PagePathComponent,
    SpinnerComponent,
    BackButtonComponent,
    LanguageComponent,
    TranslateModule,
    TextInputComponent,
    DropdownInputComponent,
    DatepickerInputComponent,
    TextAreaComponent,
    PasswordInputComponent,
    RadioButtonComponent,
    InfoComponent,
    SlideToggleComponent,
    BuildingDropdownComponent,
    ClusteringFiltersComponent,
    ClusteringFilterPillComponent,
    BarChartComponent,
    StackedBarChartComponent,
    RadialBarChartComponent,
    MapChartComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    CoreModule,
    ReactiveFormsModule,
    RouterModule,
    NgApexchartsModule,
    AngularMaterialModule,
    TranslateModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class SharedModule {}
