import React from 'react';
import { connect } from 'dva';
import { Layout as LayoutAntd } from 'antd';
import { Header, Sider, Footer, styles } from '../components/Layout';

const { Content } = LayoutAntd;

const App = ({ children }) => {
  return (
    <div>
      <LayoutAntd className={styles.layout}>
        <Header />
        <LayoutAntd className={styles.container}>
          <Sider />
          <Content className={styles.main}>
            {children}
          </Content>
        </LayoutAntd>
      </LayoutAntd>
      <Footer />
    </div>
  );
};

export default connect()(App);
