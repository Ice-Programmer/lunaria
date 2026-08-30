import React from 'react';
import { Button, Col, Divider, Flex, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import { CreateCharacterRequest } from '@/types/character.ts';
import { CharacterUploader } from '@/pages/Character/components/CreateCharacter/CharacterUploader.tsx';

const { Title, Text } = Typography;

interface CreateCharacterModalProps {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export const CreateCharacterModal: React.FC<CreateCharacterModalProps> = ({
  open,
  handleOk,
  handleCancel,
}) => {
  return (
    <Modal
      width={680}
      title={<ModalHeader />}
      open={open}
      destroyOnHidden
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          创建角色
        </Button>,
      ]}
    >
      <Row gutter={24}>
        <Col span={7}>
          <CharacterUploader />
        </Col>
        <Col span={17}>
          <CreateCharacterForm />
        </Col>
      </Row>
    </Modal>
  );
};

const ModalHeader: React.FC = () => {
  return (
    <Flex align="center" gap={8}>
      <TeamOutlined style={{ fontSize: 18 }} />

      <Title level={5} style={{ margin: 0 }}>
        新建角色
      </Title>
    </Flex>
  );
};

const CreateCharacterForm: React.FC = () => {
  const [form] = Form.useForm<CreateCharacterRequest>();

  return (
    <Flex gap={10} vertical>
      <Flex>
        <Flex vertical>
          <Text strong>基本信息</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            设置角色的基础表示与显示信息，方便在项目中标识与使用
          </Text>
        </Flex>
      </Flex>

      <Divider style={{ margin: 0 }} />

      <Form<CreateCharacterRequest> form={form} layout="vertical">
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item<CreateCharacterRequest>
              label="角色名称"
              name="characterName"
              style={{ marginBottom: 8 }}
            >
              <Input placeholder="请输入角色名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<CreateCharacterRequest>
              label="角色 Code"
              name="characterCode"
              style={{ marginBottom: 8 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<CreateCharacterRequest> label="标签" name="tags">
          <Select
            mode="tags"
            placeholder="例如：主角、可攻略、妹妹"
            options={[]}
            maxCount={5}
            open={false}
          />
        </Form.Item>
      </Form>
    </Flex>
  );
};
