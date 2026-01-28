import { Devvit } from '@devvit/public-api';

Devvit.configure({ redis: true });

Devvit.addCustomPostType({
  name: 'Globally Chopped',
  height: 'tall',
  render: () => {
    return (
      <webview
        id="game-view"
        url="splash.html"
      />
    );
  },
});

export default Devvit;
