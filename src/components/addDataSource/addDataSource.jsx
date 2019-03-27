import React from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
} from "antd";


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
          style={{
            overflow: "auto",
            height: "calc(100% - 108px)",
            paddingBottom: "108px"
          }}
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
                <Form.Item label="发送间隔: ">
                  {getFieldDecorator("sendTime", {
                    rules: [{ required: true, message: "Please enter url" }]
                  })(
                    <Input
                      style={{ width: "100%" }}
                      placeholder="Please enter url"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
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
            <Button onClick={() => addDataSourceClose(false, this.props.form)} style={{ marginRight: 8 }}>
              关闭
            </Button>
            <Button onClick={() => addDataSourceClose(true, this.props.form)} type="primary">
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
