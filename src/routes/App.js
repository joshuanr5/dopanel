import React from 'react';
import { connect } from 'dva';
import { Layout as LayoutAntd } from 'antd';
import { Header, Sider, Footer, styles } from '../components/Layout';

const { Content } = LayoutAntd;

const App = ({ children }) => {
  return (
    <LayoutAntd className={styles.layout} style={{ height: screen.height - 25 }}>
      <LayoutAntd className={styles.container}>
        <Sider />
        <LayoutAntd style={{ padding: '0 24px 0px 0px' }}>
          <Header />
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            {children}
          </Content>
        </LayoutAntd>
      </LayoutAntd>
      <Footer />
    </LayoutAntd>
  );
};

export default connect()(App);
