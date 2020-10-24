export class Repository{
  name: string;
  language: string
  html_url: string
  constructor(
    name: string,
    language: string,
    html_url: string
  ) {
    this.name = name;
    this.language = language;
    this.html_url = html_url
  }
}
