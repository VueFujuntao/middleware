import React from "react";
import PropTypes from "prop-types";
import { Drawer, Form, Button, Col, Row, Input, Select } from "antd";
import SelectWithHiddenSelectedOptions from "../selectedOptions/selectedOptions.jsx";

const { Option } = Select;
const InputGroup = Input.Group;
class DrawerForm extends React.Component {
  static propTypes = {
    // 薪增数据 修改数据
    addOrModifyNewDataVisible: PropTypes.bool,
    // 关闭弹框
    onClose: PropTypes.func
  };

  static defaultProps = {
    // 薪增数据 修改数据
    addOrModifyNewDataVisible: false
  };

  constructor(props) {
    super(props);
    this.state = {
      functionVis: 1
    };
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return !fromJS(nextProps).equals(fromJS(this.props))
  // }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { onClose, addOrModifyNewDataVisible } = this.props;
    return (
      <Drawer
        title="创建新数据"
        width={720}
        onClose={onClose}
        visible={addOrModifyNewDataVisible}
        style={{
          overflow: "auto",
          height: "calc(100% - 108px)",
          paddingBottom: "108px"
        }}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="VALUE">
                {getFieldDecorator("value", {
                  rules: [
                    { required: true, message: "Please enter user value" }
                  ]
                })(<Input placeholder="Please enter user value" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="变化函数">
                {getFieldDecorator("methodId", {
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
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="变化时间">
                {getFieldDecorator("changeTime", {
                  rules: [{ required: true, message: "Please select an owner" }]
                })(
                  <Select placeholder="Please select an owner">
                    <Option value="1">1秒</Option>
                    <Option value="5">5秒</Option>
                    <Option value="10">10秒</Option>
                    <Option value="30">30秒</Option>
                    <Option value="60">1分钟</Option>
                    <Option value="300">5分钟</Option>
                    <Option value="900">15分钟</Option>
                    <Option value="1800">30分钟</Option>
                    <Option value="3600">1小时</Option>
                    <Option value="10800">3小时</Option>
                    <Option value="32400">6小时</Option>
                    <Option value="64800">12小时</Option>
                    <Option value="129600">24小时</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="类型">
                {getFieldDecorator("isParentData", {
                  rules: [{ required: true, message: "Please choose the type" }]
                })(
                  <Select placeholder="Please choose the type">
                    <Option value="0">一般</Option>
                    <Option value="1">子数据</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="关联事件">
                {getFieldDecorator("importantAlarmId", {
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
              <SelectWithHiddenSelectedOptions />
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
                        { required: true, message: "Please choose the type" }
                      ]
                    })(<Input placeholder="Please enter user value" />)}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="最小值">
                    {getFieldDecorator("minValue", {
                      rules: [
                        { required: true, message: "Please choose the type" }
                      ]
                    })(<Input placeholder="Please enter user value" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <InputGroup compact>
                    <Form.Item label="预警阈值">
                      {getFieldDecorator("minAlarmValue", {
                        rules: [
                          { required: true, message: "Please choose the type" }
                        ]
                      })(
                        <Input
                          style={{ width: 100, textAlign: "center" }}
                          placeholder="Please choose the type"
                        />
                      )}
                    </Form.Item>
                    <Form.Item label="预警阈值">
                      {getFieldDecorator("maxAlarmValue", {
                        rules: [
                          { required: true, message: "Please choose the type" }
                        ]
                      })(
                        <Input
                          style={{
                            width: 100,
                            textAlign: "center",
                            borderLeft: 0
                          }}
                          placeholder="Maximum"
                        />
                      )}
                    </Form.Item>
                  </InputGroup>
                </Col>
                {this.state.functionVis === 5 ? (
                  <Col span={12}>
                    <Form.Item label="波动差值">
                      {getFieldDecorator("dValue", {
                        rules: [
                          { required: true, message: "Please choose the type" }
                        ]
                      })(<Input placeholder="Please enter user value" />)}
                    </Form.Item>
                  </Col>
                ) : null}
                {this.state.functionVis === 3 ? (
                  <Col span={12}>
                    <InputGroup compact>
                      <Form.Item label="波动差值">
                        {getFieldDecorator("subValue", {
                          rules: [
                            {
                              required: true,
                              message: "Please choose the type"
                            }
                          ]
                        })(
                          <Input
                            style={{ width: 100, textAlign: "center" }}
                            placeholder="Minimum"
                          />
                        )}
                      </Form.Item>
                      <Form.Item label="波动差值">
                        {getFieldDecorator("addValue", {
                          rules: [
                            {
                              required: true,
                              message: "Please choose the type"
                            }
                          ]
                        })(
                          <Input
                            style={{
                              width: 100,
                              textAlign: "center",
                              borderLeft: 0
                            }}
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
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            borderTop: "1px solid #e9e9e9",
            padding: "10px 16px",
            background: "#fff",
            textAlign: "right"
          }}
        >
          <Button onClick={() => onClose(false)} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={() => onClose(this.props.form)} type="primary">
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
}

const App = Form.create()(DrawerForm);

export default App;
