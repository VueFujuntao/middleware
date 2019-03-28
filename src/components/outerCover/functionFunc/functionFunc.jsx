import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Col, Row, Input } from "antd";

const InputGroup = Input.Group;
class DrawerForm extends React.Component {
  static propTypes = {
    functionNum: PropTypes.number,
    functionVis: PropTypes.bool,
    handleOk: PropTypes.func
  };

  static defaultProps = {
    functionVis: false,
    functionNum: 1
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { functionVis, handleOk, functionNum, form, itemId } = this.props;
    return (
      <Modal
        visible={functionVis}
        onOk={() => handleOk(true, form, functionNum, itemId)}
        onCancel={() => handleOk(false, form, functionNum, itemId)}
      >
        <InputGroup size="small">
          <Row gutter={4}>
            <Col span={12}>
              <Form.Item label="最大值">
                {getFieldDecorator("maxValue", {
                  rules: [
                    {
                      required: true,
                      pattern: new RegExp(/^[1-9]\d*$/, "g"),
                      message: "Please enter the number"
                    }
                  ],
                  getValueFromEvent: event => {
                    return event.target.value.replace(/\D/g, "");
                  },
                  initialValue: ""
                })(<Input placeholder="Please enter user Maximum" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="最小值">
                {getFieldDecorator("minValue", {
                  rules: [
                    {
                      required: true,
                      pattern: new RegExp(/^[1-9]\d*$/, "g"),
                      message: "Please enter the number"
                    }
                  ],
                  getValueFromEvent: event => {
                    return event.target.value.replace(/\D/g, "");
                  },
                  initialValue: ""
                })(<Input placeholder="Please enter user Minimum value" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={12}>
              <Form.Item label="预警阈值最小值">
                {getFieldDecorator("minAlarmValue", {
                  rules: [
                    {
                      required: true,
                      pattern: new RegExp(/^[1-9]\d*$/, "g"),
                      message: "Please enter the number"
                    }
                  ],
                  getValueFromEvent: event => {
                    return event.target.value.replace(/\D/g, "");
                  },
                  initialValue: ""
                })(
                  <Input placeholder="Please enter user Early warning threshold" />
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="预警阈值最大值">
                {getFieldDecorator("maxAlarmValue", {
                  rules: [
                    {
                      required: true,
                      pattern: new RegExp(/^[1-9]\d*$/, "g"),
                      message: "Please enter the number"
                    }
                  ],
                  getValueFromEvent: event => {
                    return event.target.value.replace(/\D/g, "");
                  },
                  initialValue: ""
                })(
                  <Input placeholder="Please enter user Early warning threshold" />
                )}
              </Form.Item>
            </Col>
          </Row>
          {functionNum === 3 ? (
            <Row gutter={4}>
              <Col span={12}>
                <Form.Item label="波动差值最小值">
                  {getFieldDecorator("subValue", {
                    rules: [
                      {
                        required: true,
                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                        message: "Please enter the number"
                      }
                    ],
                    getValueFromEvent: event => {
                      return event.target.value.replace(/\D/g, "");
                    },
                    initialValue: ""
                  })(
                    <Input placeholder="Please enter user Minimum value of fluctuation" />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="波动差值最大值">
                  {getFieldDecorator("addValue", {
                    rules: [
                      {
                        required: true,
                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                        message: "Please enter the number"
                      }
                    ],
                    getValueFromEvent: event => {
                      return event.target.value.replace(/\D/g, "");
                    },
                    initialValue: ""
                  })(
                    <Input placeholder="Please enter user Maximum fluctuation difference" />
                  )}
                </Form.Item>
              </Col>
            </Row>
          ) : null}
          {functionNum === 2 || functionNum === 5 ? (
            <Row gutter={4}>
              <Col span={12}>
                <Form.Item label="波动差值">
                  {getFieldDecorator("dValue", {
                    rules: [
                      {
                        required: true,
                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                        message: "Please enter the number"
                      }
                    ],
                    getValueFromEvent: event => {
                      return event.target.value.replace(/\D/g, "");
                    },
                    initialValue: ""
                  })(
                    <Input placeholder="Please enter user Fluctuation difference" />
                  )}
                </Form.Item>
              </Col>
            </Row>
          ) : null}
        </InputGroup>
      </Modal>
    );
  }
}

const App = Form.create()(DrawerForm);

export default App;
