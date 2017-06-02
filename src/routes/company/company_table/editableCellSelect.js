import React from 'react';
import { Icon, Select, Badge } from 'antd';

const Option = Select.Option;

class EditableCellSelect extends React.Component {

  state = {
    value: this.props.value,
    editable: false,
  };

  handleSelect = (value) => {
    this.setState({
      value,
    });
  }

  edit = () => {
    this.setState({
      editable: true,
    });
    this.props.onAddUser();
  }
  check = () => {
    this.setState({
      editable: false,
    });
    const newStatus = this.state.value;
    if (newStatus === this.props.value) return;
    this.props.saveStatus(newStatus);
  }

  render = () => {
    const { value, editable } = this.state;
    const { options } = this.props;
    return (
      <div>
        {
          editable ?
            <div>
              <Select
                defaultValue={value}
                onSelect={this.handleSelect}
                style={{ width: '80px' }}
              >
                {
                  options.map((option, idx) => <Option key={idx} value={option.name}>{option.display_name}</Option>)
                }
              </Select>
              <Icon
                style={{ marginLeft: '10px', cursor: 'pointer', color: '#108ee9' }}
                type="check"
                onClick={this.check}
              />
            </div>
            :
            <div>
              <Badge
                status={value === 'active' ? 'success' : 'default'}
                text={value === 'active' ? 'Activo' : 'Inactivo'}
              />
              <Icon
                style={{ marginLeft: '10px', cursor: 'pointer', color: '#108ee9' }}
                type="edit"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}
// TIP: this could be used in different ways, depent of the props we could show a badge or only a span
export default EditableCellSelect;
