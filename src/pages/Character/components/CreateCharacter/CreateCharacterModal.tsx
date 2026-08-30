import React, { useState } from 'react';
import { Col, Divider, Flex, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import type {
  CharacterAvatarInput,
  CreateCharacterInput,
  CreateCharacterRequest,
} from '@/types/character.ts';
import { CharacterUploader } from '@/pages/Character/components/CreateCharacter/CharacterUploader.tsx';

const { Title, Text } = Typography;

type CreateCharacterFormValues = Pick<
  CreateCharacterRequest,
  'characterName' | 'characterCode' | 'tags'
>;

interface CreateCharacterModalProps {
  open: boolean;
  onCreate: (input: CreateCharacterInput) => void | Promise<void>;
  onCancel: () => void;
}

const toAvatarInput = async (file?: File): Promise<CharacterAvatarInput | undefined> => {
  if (!file) return undefined;

  if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
    throw new Error(`Unsupported avatar type: ${file.type}`);
  }

  return {
    bytes: Array.from(new Uint8Array(await file.arrayBuffer())),
    mimeType: file.type,
  };
};

export const CreateCharacterModal: React.FC<CreateCharacterModalProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm<CreateCharacterFormValues>();
  const [avatarFile, setAvatarFile] = useState<File>();
  const [submitting, setSubmitting] = useState(false);

  const handleFinish = async (values: CreateCharacterFormValues) => {
    setSubmitting(true);

    try {
      await onCreate({
        ...values,
        tags: values.tags ?? [],
        avatar: await toAvatarInput(avatarFile),
      });
    } catch {
      // The caller displays the command error; keep the modal open for correction and retry.
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    form.resetFields();
    setAvatarFile(undefined);
  };

  return (
    <Modal
      width={680}
      title={<ModalHeader />}
      open={open}
      okText="创建角色"
      cancelText="取消"
      confirmLoading={submitting}
      destroyOnHidden
      onOk={() => form.submit()}
      onCancel={onCancel}
      afterClose={reset}
    >
      <Form<CreateCharacterFormValues>
        form={form}
        layout="vertical"
        initialValues={{ tags: [] }}
        onFinish={(values) => void handleFinish(values)}
      >
        <Row gutter={24}>
          <Col span={7}>
            <CharacterUploader onChange={setAvatarFile} />
          </Col>
          <Col span={17}>
            <CreateCharacterForm />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

const ModalHeader: React.FC = () => (
  <Flex align="center" gap={8}>
    <TeamOutlined style={{ fontSize: 18 }} />

    <Title level={5} style={{ margin: 0 }}>
      新建角色
    </Title>
  </Flex>
);

const CreateCharacterForm: React.FC = () => (
  <Flex gap={10} vertical>
    <Flex vertical>
      <Text strong>基本信息</Text>
      <Text type="secondary" style={{ fontSize: 12 }}>
        设置角色的基础表示与显示信息，方便在项目中标识与使用
      </Text>
    </Flex>

    <Divider style={{ margin: 0 }} />

    <Row gutter={24}>
      <Col span={12}>
        <Form.Item<CreateCharacterFormValues>
          label="角色名称"
          name="characterName"
          rules={[{ required: true, message: '请输入角色名称' }]}
          style={{ marginBottom: 8 }}
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item<CreateCharacterFormValues>
          label="角色 Code"
          name="characterCode"
          rules={[
            { required: true, message: '请输入角色 Code' },
            {
              pattern: /^[a-z][a-z0-9_]*$/,
              message: '请使用小写字母、数字和下划线，并以字母开头',
            },
          ]}
          style={{ marginBottom: 8 }}
        >
          <Input placeholder="例如：lin_yue" />
        </Form.Item>
      </Col>
    </Row>

    <Form.Item<CreateCharacterFormValues> label="标签" name="tags">
      <Select
        mode="tags"
        placeholder="例如：主角、可攻略、妹妹"
        options={[]}
        maxCount={5}
        open={false}
      />
    </Form.Item>
  </Flex>
);
