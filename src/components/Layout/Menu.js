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
  console.log(menu);
  return (
    <Menu mode="inline" onClick={handleClickNavMenu}>
      {menuItems}
    </Menu>
  );
};

export default Menus;
