import { NbaStatsPage } from './app.po';

describe('nba-stats App', () => {
  let page: NbaStatsPage;

  beforeEach(() => {
    page = new NbaStatsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
