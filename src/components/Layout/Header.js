import React from 'react';
import { Menu, Icon } from 'antd';
import styles from './Header.less';

const SubMenu = Menu.SubMenu;


const Header = () => {
  const handleClickMenu = (e) => {
    console.log(e.key);
  };

  return (
    <div>
      <div className={styles.rightWarpper}>
        <Menu mode="horizontal" onClick={handleClickMenu}>
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
      </div>
    </div>
  );
};

export default Header;
