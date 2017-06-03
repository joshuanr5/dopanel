import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import './Header.less';

const SubMenu = Menu.SubMenu;
const HeaderAntd = Layout.Header;

const Header = () => {
  const handleClickMenu = (e) => {
    console.log(e.key);
  };

  return (
    <HeaderAntd>
      <div />
      <Menu theme="dark" mode="horizontal" onClick={handleClickMenu}>
        <SubMenu
          style={{
            float: 'right',
          }}
          title={<span><Icon type="user" />{'Admin'} </span>}
        >
          <Menu.Item key="logout">
            Sign out
            </Menu.Item>
        </SubMenu>
      </Menu>
    </HeaderAntd>
  );
};

export default Header;
