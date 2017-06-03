import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';

import { menu } from '../../utils';

function getMenus(menuArray, parentPath = '/') {
  return menuArray.map((item) => {
    return (
      <Menu.Item key={item.key}>
        <Link to={`${parentPath}${item.key}`}>
          {
            item.icon
              ? <Icon type={item.icon} />
              : ''
          }
          {item.name}
        </Link>
      </Menu.Item>
    );
  }
  );
}

const Menus = ({ handleClickNavMenu }) => {
  const menuItems = getMenus(menu);
  return (
    <Menu theme="dark" mode="inline" onClick={handleClickNavMenu} style={{ height: '100% - 40px' }}>
      {menuItems}
    </Menu>
  );
};

export default Menus;
