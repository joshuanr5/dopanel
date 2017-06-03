import React from 'react';
import { Layout } from 'antd';
import Menu from './Menu.js';

import './layout.less';

const SiderAntd = Layout.Sider;

const Sider = () => {
  return (
    <SiderAntd
      width={200} style={{ background: '#fff', marginLeft: '24px' }}
    >
      <div className="logo"></div>
      <Menu />
    </SiderAntd>
  );
};

Sider.__ANT_LAYOUT_SIDER = true;

export default Sider;
