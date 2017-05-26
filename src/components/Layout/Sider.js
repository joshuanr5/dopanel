import React from 'react';
import { Layout } from 'antd';
import Menu from './Menu.js';

const SiderAntd = Layout.Sider;

const Sider = () => {
  return (
    <SiderAntd
      style={{ background: '#fff', marginTop: '25px' }}
    >
      <Menu />
    </SiderAntd>
  );
};

Sider.__ANT_LAYOUT_SIDER = true;

export default Sider;
