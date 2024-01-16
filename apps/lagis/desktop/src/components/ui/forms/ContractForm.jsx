import React, { useEffect, useState } from "react";
import { Col, Form, Input, Row, Divider } from "antd";
const { TextArea } = Input;
const ContractForm = ({ activeRow, setShowButton, setModalOpen }) => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [form] = Form.useForm();
  const customGutter = 24;
  const dividerStyles = { margin: "0" };
  const inputStile = "mt-4 mb-4 text-xs";
  const handleValuesChange = (changedValues, allValues) => {
    setShowButton(true);
  };
  useEffect(() => {
    form.setFieldsValue({
      voreigentümer: activeRow?.voreigentümer ? activeRow.voreigentümer : "",
      auflassung: activeRow?.auflassung ? activeRow.auflassung : "",
      eintragung: activeRow?.eintragung ? activeRow.eintragung : "",
      bemerkung: activeRow?.bemerkung ? activeRow.bemerkung : "",
    });
  }, [activeRow, form]);
  return (
    <div className="overflow-auto">
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        style={{ padding: "0 12px" }}
        onValuesChange={handleValuesChange}
        disabled={componentDisabled}
      >
        <Row gutter={customGutter}>
          <Col span={12}>
            <Form.Item
              name="voreigentümer"
              label={
                <span style={{ fontSize: "14px", marginBottom: "8px" }}>
                  Voreigentümer
                </span>
              }
              className={inputStile}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="auflassung"
              label={
                <span style={{ fontSize: "14px", marginBottom: "8px" }}>
                  Auflassung
                </span>
              }
              className={inputStile}
            >
              <Input />
            </Form.Item>
          </Col>
          <Divider style={dividerStyles} />
        </Row>
        <Row gutter={customGutter}>
          <Col span={24}>
            <Form.Item
              name="eintragung"
              label={
                <span style={{ fontSize: "14px", marginBottom: "8px" }}>
                  Eintragung
                </span>
              }
              className={inputStile}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Divider style={dividerStyles} />
          </Col>
        </Row>
        <Row gutter={customGutter}>
          <Col span={24}>
            <Form.Item
              name="bemerkung"
              label={
                <span style={{ fontSize: "14px", marginBottom: "8px" }}>
                  Bemerkung
                </span>
              }
              className={inputStile}
            >
              <TextArea rows={5} />
            </Form.Item>
          </Col>
          <Col span={24}>{/* <Divider style={dividerStyles} /> */}</Col>
        </Row>
      </Form>
    </div>
  );
};

export default ContractForm;
