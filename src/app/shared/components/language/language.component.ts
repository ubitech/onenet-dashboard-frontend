import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  languages: string[] = [];
  selectedLanguage: string;

  constructor(public translate: TranslateService
  ) {
    this.languages = this.translate.getLangs();
  }

  ngOnInit(): void {
    this.languageSetup();
  }

  languageSetup(): void {
    this.translate.onLangChange.subscribe(
      res => {
        this.selectedLanguage = res.lang;
        if (this.languages.length === 0) {
          this.languages = this.translate.getLangs();
        }
      }
    );
    this.selectedLanguage = this.translate.currentLang;
  }

  switchLang(lang: string): void {
    this.translate.use(lang);
  }

}
