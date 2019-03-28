import React from "react";
import { Drawer, Form, Button, Col, Row, Input } from "antd";
import './index.less';

class DrawerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placement: "left"
    };
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { addDataSourceVisible, addDataSourceClose } = this.props;
    return (
      <div>
        <Drawer
          title="创建数据源"
          width={720}
          onClose={() => addDataSourceClose(false, this.props.form)}
          visible={addDataSourceVisible}
          placement={this.state.placement}
          className="drawer"
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Name">
                  {getFieldDecorator("name", {
                    rules: [
                      { required: true, message: "Please enter user name" }
                    ]
                  })(<Input placeholder="Please enter user name" />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="发送间隔: (ms)">
                  {getFieldDecorator("sendTime", {
                    rules: [
                      {
                        required: true,
                        pattern: new RegExp(/^[1-9]\d*$/, "g"),
                        message: "Please enter Number"
                      }
                    ],
                    getValueFromEvent: event => {
                      return event.target.value.replace(/\D/g, "");
                    },
                    initialValue: "1"
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="Please enter timeout"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            className="drawer-div"
          >
            <Button
              onClick={() => addDataSourceClose(false, this.props.form)}
              style={{ marginRight: 8 }}
            >
              关闭
            </Button>
            <Button
              onClick={() => addDataSourceClose(true, this.props.form)}
              type="primary"
            >
              提交
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const App = Form.create()(DrawerForm);

export default App;
