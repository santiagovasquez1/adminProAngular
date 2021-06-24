import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  public linkTheme: Element = document.querySelector('#theme');
  public links: NodeListOf<Element>;

  constructor(private settingService: SettingsService) { }

  ngOnInit(): void {
    this.settingService.loadLinkTheme(document.querySelectorAll(".selector"));
    this.settingService.checkCurrentTheme();
  }

  changeTheme(theme: string) {
    this.settingService.changeTheme(theme);
    this.settingService.checkCurrentTheme();
  }



}
