import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { localeController } from './LocaleController';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  languageFlagPath
  languageFlagPathList
  isVisibleLanguageFlag
  @ViewChild('languageSelector') languageSelector: ElementRef


  constructor(private translate: TranslateService) {
    this.languageFlagPath = 'assets/img/global_americaFlag.png';
    this.languageFlagPathList = {
      'ko': 'assets/img/global_koreaFlag.png',
      'en': 'assets/img/global_americaFlag.png',
      'ja': 'assets/img/global_japanFlag.png',
      'cn': 'assets/img/global_chinaFlag.png',
    };
    this.isVisibleLanguageFlag = false;

    this.languageSelector;
  }

  ngOnInit() {
    this.languageSelector.nativeElement.style.display = 'none';
    this.changeLang(localeController.getLocale());
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    this.languageFlagPath = this.languageFlagPathList[lang];
    localeController.setLocale(lang);
    this.invisibleSelector();
  }

  onClickFlag() {
    if(this.isVisibleLanguageFlag) {
      this.invisibleSelector();
    } else {
      this.visibleSelector();
    }
  }

  visibleSelector() {
    this.languageSelector.nativeElement.style.display = 'block';
    this.isVisibleLanguageFlag = true;
  }

  invisibleSelector() {
    this.languageSelector.nativeElement.style.display = 'none';
    this.isVisibleLanguageFlag = false;
  }
}
