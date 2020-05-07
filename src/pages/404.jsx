import React from 'react';
import { Page, Navbar, Block } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Halaman Dalam Pengembangan" backLink="Back" />
    <Block strong>
      <p>Maaf</p>
      <p>Halaman yang Anda maksud sedang dalam pengembangan</p>
    </Block>
  </Page>
);
