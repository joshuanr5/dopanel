import React from 'react';
import { connect } from 'dva';
import { Layout as LayoutAntd } from 'antd';
import { Header, Sider, Footer, styles } from '../components/Layout';

const { Content } = LayoutAntd;

const App = ({ children }) => {
  return (
    <LayoutAntd className={styles.layout}>
      <Header />
      <LayoutAntd className={styles.container}>
        <Sider />
        <Content className={styles.main}>
          {children}
        </Content>
      </LayoutAntd>
      <Footer />
    </LayoutAntd>
  );
};

export default connect()(App);
