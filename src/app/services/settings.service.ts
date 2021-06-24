import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme: Element = document.querySelector('#theme');
  private links: NodeListOf<Element>;

  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme.setAttribute('href', url);
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', url);
    localStorage.setItem('theme', url);
  }

  loadLinkTheme(querySelector: NodeListOf<Element>) {
    this.links = querySelector;
  }

  checkCurrentTheme() {
    if (this.links != null) {
      this.links.forEach(element => {
        element.classList.remove('working');
        const btnTheme = element.getAttribute('data-theme');
        const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
        const currentTheme = this.linkTheme.getAttribute('href');

        if (btnThemeUrl === currentTheme) {
          element.classList.add("working");
        }

      });
    }
  }


}
