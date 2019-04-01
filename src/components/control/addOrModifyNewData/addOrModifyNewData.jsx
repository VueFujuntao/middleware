import React from "react";
import PropTypes from "prop-types";
import { Drawer, Form, Button, Col, Row, Input, Select } from "antd";
import SelectWithHiddenSelectedOptions from "./selectedOptions/selectedOptions.jsx";
import "./index.less";

const { Option } = Select;
const InputGroup = Input.Group;

class DrawerForm extends React.Component {
  static propTypes = {
    // 薪增数据 修改数据
    addOrModifyNewDataVisible: PropTypes.bool,
    v: PropTypes.bool,
    parentData: PropTypes.array,
    // 关闭弹框
    onClose: PropTypes.func
  };

  static defaultProps = {
    // 薪增数据 修改数据
    addOrModifyNewDataVisible: false,
    parentData: [],
    v: false
  };

  constructor(props) {
    super(props);
    this.state = {
      functionVis: 1,
      v: false
    };
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      onClose,
      addOrModifyNewDataVisible,
      parentData,
      selectedItems,
      v
    } = this.props;

    return (
      <Drawer
        title="创建新数据"
        width={720}
        onClose={() => onClose(false, this.props.form)}
        visible={addOrModifyNewDataVisible}
        className="drawer-add"
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="VALUE">
                {getFieldDecorator("value", {
                  rules: [
                    {
                      required: true,
                      pattern: new RegExp(/^[1-9]\d*$/, "g"),
                      message: "Please enter user value"
                    }
                  ],
                  getValueFromEvent: event => {
                    return event.target.value.replace(/\D/g, "");
                  },
                  initialValue: ""
                })(<Input placeholder="Please enter user value" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="类型">
                {getFieldDecorator("isParentData", {
                  initialValue: "0",
                  rules: [{ required: true, message: "Please choose the type" }]
                })(
                  <Select
                    placeholder="Please choose the type"
                    onChange={this.bindParentDataInput}
                  >
                    <Option value="0">一般</Option>
                    <Option value="1">子数据</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              {v === false ? (
                <Form.Item label="变化时间">
                  {getFieldDecorator("changeTime", {
                    initialValue: "1000",
                    rules: [
                      { required: true, message: "Please select an owner" }
                    ]
                  })(
                    <Select placeholder="Please select an owner">
                      <Option value="1000">1秒</Option>
                      <Option value="5000">5秒</Option>
                      <Option value="10000">10秒</Option>
                      <Option value="30000">30秒</Option>
                      <Option value="60000">1分钟</Option>
                      <Option value="300000">5分钟</Option>
                      <Option value="900000">15分钟</Option>
                      <Option value="1800000">30分钟</Option>
                      <Option value="3600000">1小时</Option>
                      <Option value="10800000">3小时</Option>
                      <Option value="32400000">6小时</Option>
                      <Option value="64800000">12小时</Option>
                      <Option value="129600000">24小时</Option>
                    </Select>
                  )}
                </Form.Item>
              ) : null}
            </Col>
            <Col span={12}>
              {v === false ? (
                <Form.Item label="变化函数">
                  {getFieldDecorator("methodId", {
                    initialValue: "1",
                    rules: [
                      { required: true, message: "Please choose the approver" }
                    ]
                  })(
                    <Select
                      placeholder="Please choose the type"
                      onChange={this.handleChangeSelectFunction}
                    >
                      <Option value="1">无</Option>
                      <Option value="2">折线周期函数</Option>
                      <Option value="3">波动取值函数</Option>
                      <Option value="4">随机取值函数</Option>
                      <Option value="5">类正弦函数</Option>
                    </Select>
                  )}
                </Form.Item>
              ) : (
                <Form.Item label="变化函数">
                  {getFieldDecorator("methodId", {
                    initialValue: "1",
                    rules: [
                      { required: true, message: "Please choose the approver" }
                    ]
                  })(
                    <Select
                      placeholder="Please choose the type"
                      onChange={this.handleChangeSelectFunction}
                    >
                      <Option value="1">无</Option>
                    </Select>
                  )}
                </Form.Item>
              )}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="关联事件">
                {getFieldDecorator("importantAlarmId", {
                  initialValue: "1",
                  rules: [
                    {
                      required: true,
                      message: "Please choose the importantAlarmId"
                    }
                  ]
                })(
                  <Select placeholder="Please choose the importantAlarmId">
                    <Option value="1">无</Option>
                    <Option value="2">火灾</Option>
                    <Option value="3">漏水</Option>
                    <Option value="4">闯入</Option>
                    <Option value="5">UPS温度过高</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              {v ? (
                <Form.Item label="关联一般">
                  {getFieldDecorator("parentId", {
                    rules: [
                      {
                        required: true,
                        messsage: "plese"
                      }
                    ]
                  })(
                    <SelectWithHiddenSelectedOptions
                      selectedItems={selectedItems}
                      parentData={parentData}
                      handleChange={this.props.handleChange}
                    />
                  )}
                </Form.Item>
              ) : null}
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="是否影响报警">
                {getFieldDecorator("isChangeStatus", {
                  initialValue: "1",
                  rules: [
                    {
                      required: true,
                      message: "Please choose the isChangeStatus"
                    }
                  ]
                })(
                  <Select placeholder="Please choose the isChangeStatus">
                    <Option value="1">否</Option>
                    <Option value="0">是</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="设备前缀(ID)">
                {getFieldDecorator("id", {
                  rules: [
                    {
                      required: true,
                      pattern: new RegExp(/^[1-9]\d*$/, "g"),
                      message: "Please enter the ID",
                      type: "number",
                      transform(value) {
                        if (value) {
                          return Number(value);
                        }
                      }
                    }
                  ],
                  getValueFromEvent: event => {
                    if (event.target.value.length > 5) return;
                    return event.target.value.replace(/\D/g, "");
                  }
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="描述">
                {getFieldDecorator("detailsDes", {
                  rules: [
                    {
                      required: true,
                      message: "please enter detailsDes"
                    }
                  ]
                })(
                  <Input.TextArea
                    rows={4}
                    placeholder="please enter detailsDes"
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
          {this.state.functionVis !== 1 ? (
            <div>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="最大值">
                    {getFieldDecorator("maxValue", {
                      rules: [
                        {
                          required: true,
                          pattern: new RegExp(/^[1-9]\d*$/, "g"),
                          message: "Please choose the type"
                        }
                      ],
                      getValueFromEvent: event => {
                        return event.target.value.replace(/\D/g, "");
                      },
                      initialValue: "0"
                    })(<Input placeholder="Please enter user value" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="最小值">
                    {getFieldDecorator("minValue", {
                      rules: [
                        {
                          required: true,
                          pattern: new RegExp(/^[1-9]\d*$/, "g"),
                          message: "Please choose the type"
                        }
                      ],
                      getValueFromEvent: event => {
                        return event.target.value.replace(/\D/g, "");
                      },
                      initialValue: "0"
                    })(<Input placeholder="Please enter user value" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <InputGroup compact>
                    <Form.Item label="预警阈值最小值">
                      {getFieldDecorator("minAlarmValue", {
                        rules: [
                          {
                            required: true,
                            pattern: new RegExp(/^[1-9]\d*$/, "g"),
                            message: "Please choose the type"
                          }
                        ],
                        getValueFromEvent: event => {
                          return event.target.value.replace(/\D/g, "");
                        },
                        initialValue: "0"
                      })(
                        <Input
                          style={{ width: 100, textAlign: "center" }}
                          placeholder="Please choose the type"
                        />
                      )}
                    </Form.Item>
                    <Form.Item label="预警阈值最大值">
                      {getFieldDecorator("maxAlarmValue", {
                        rules: [
                          {
                            required: true,
                            pattern: new RegExp(/^[1-9]\d*$/, "g"),
                            message: "Please choose the type"
                          }
                        ],
                        getValueFromEvent: event => {
                          return event.target.value.replace(/\D/g, "");
                        },
                        initialValue: "0"
                      })(
                        <Input
                          className="input-center-border"
                          placeholder="Maximum"
                        />
                      )}
                    </Form.Item>
                  </InputGroup>
                </Col>
                {this.state.functionVis === 5 ||
                this.state.functionVis === 2 ? (
                  <Col span={12}>
                    <Form.Item label="波动差值">
                      {getFieldDecorator("dValue", {
                        rules: [
                          {
                            required: true,
                            pattern: new RegExp(/^[1-9]\d*$/, "g"),
                            message: "Please choose the type"
                          }
                        ],
                        getValueFromEvent: event => {
                          return event.target.value.replace(/\D/g, "");
                        },
                        initialValue: "0"
                      })(<Input placeholder="Please enter user value" />)}
                    </Form.Item>
                  </Col>
                ) : null}
                {this.state.functionVis === 3 ? (
                  <Col span={12}>
                    <InputGroup compact>
                      <Form.Item label="波动差值最小值">
                        {getFieldDecorator("subValue", {
                          rules: [
                            {
                              required: true,
                              pattern: new RegExp(/^[1-9]\d*$/, "g"),
                              message: "Please choose the type"
                            }
                          ],
                          getValueFromEvent: event => {
                            return event.target.value.replace(/\D/g, "");
                          },
                          initialValue: "0"
                        })(
                          <Input
                            className="input-center"
                            placeholder="Minimum"
                          />
                        )}
                      </Form.Item>
                      <Form.Item label="波动差值最大值">
                        {getFieldDecorator("addValue", {
                          rules: [
                            {
                              required: true,
                              pattern: new RegExp(/^[1-9]\d*$/, "g"),
                              message: "Please choose the type"
                            }
                          ],
                          getValueFromEvent: event => {
                            return event.target.value.replace(/\D/g, "");
                          },
                          initialValue: "0"
                        })(
                          <Input
                            className="input-center-border"
                            placeholder="Maximum"
                          />
                        )}
                      </Form.Item>
                    </InputGroup>
                  </Col>
                ) : null}
              </Row>
            </div>
          ) : null}
        </Form>
        <div className="add-div-data">
          <Button
            onClick={() => onClose(false, this.props.form)}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>
          <Button onClick={() => onClose(true, this.props.form)} type="primary">
            Submit
          </Button>
        </div>
      </Drawer>
    );
  }
  // 选择 函数 对应显示 输入框
  handleChangeSelectFunction = e => {
    this.setState({
      functionVis: Number(e)
    });
  };

  // 打开 关闭 关联 父数据 input 框
  bindParentDataInput = e => {
    if (e === "1") {
      this.props.chnageV(true)
      const { bindParentData, sourceId } = this.props;
      bindParentData({ id: sourceId });
    } else if (e === "0") {
      this.props.chnageV(false)
    }
  };
}

const App = Form.create()(DrawerForm);

export default App;
