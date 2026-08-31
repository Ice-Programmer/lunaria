import React, { useState } from 'react';
import { Button, Col, Flex, Form, Input, Modal, Row, Typography } from 'antd';
import type { CreateCharacterSpriteSetInput } from '@/types/character_sprite_set.ts';
import { FolderOutlined, PlusOutlined } from '@ant-design/icons';
import { useCreateSpriteSet } from '@/pages/Character/hooks/useCreateSpriteSet.ts';

const { Title, Text } = Typography;
interface CreateSpriteButtonProps {
  characterId: number;
}

export const CreateSpriteButton: React.FC<CreateSpriteButtonProps> = ({ characterId }) => {
  const [open, setOpen] = useState(false);
  const { handleCreateSpriteSet } = useCreateSpriteSet({
    characterId,
    onSuccess: () => setOpen(false),
  });

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setOpen(true);
        }}
      >
        新建立绘
      </Button>

      <CreateSpriteModal
        open={open}
        onCancel={() => setOpen(false)}
        onCreate={handleCreateSpriteSet}
      />
    </>
  );
};

interface CreateSpriteModalProps {
  open: boolean;
  onCreate: (input: CreateCharacterSpriteSetInput) => void | Promise<void>;
  onCancel: () => void;
}

const CreateSpriteModal: React.FC<CreateSpriteModalProps> = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm<CreateCharacterSpriteSetInput>();
  const [submitting, setSubmitting] = useState(false);

  const handleFinish = async (values: CreateCharacterSpriteSetInput) => {
    setSubmitting(true);

    try {
      await onCreate(values);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={<ModalHeader />}
      destroyOnHidden
      okText="创建立绘"
      open={open}
      cancelText="取消"
      confirmLoading={submitting}
      onOk={() => form.submit()}
      onCancel={onCancel}
      afterClose={() => form.resetFields()}
    >
      <Form<CreateCharacterSpriteSetInput>
        form={form}
        layout="vertical"
        onFinish={(values) => void handleFinish(values)}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item<CreateCharacterSpriteSetInput>
              label="立绘名称"
              name="spriteSetName"
              rules={[{ required: true, message: '请输入立绘名称' }]}
              style={{ marginBottom: 8 }}
            >
              <Input placeholder="例如：日常服" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<CreateCharacterSpriteSetInput>
              label="立绘 Key"
              name="spriteSetCode"
              rules={[
                { required: true, message: '请输入立绘 Key' },
                {
                  pattern: /^[a-z][a-z0-9_]*$/,
                  message: '请使用小写字母、数字和下划线，并以字母开头',
                },
              ]}
              style={{ marginBottom: 8 }}
            >
              <Input placeholder="例如：daily" />
            </Form.Item>
          </Col>
        </Row>

        <Text type="secondary" style={{ fontSize: 12 }}>
          名称用于编辑器显示，Key 用于剧情引用
        </Text>
      </Form>
    </Modal>
  );
};

const ModalHeader: React.FC = () => {
  return (
    <Flex align="center" gap={8}>
      <FolderOutlined />

      <Title level={5} style={{ margin: 0 }}>
        新建立绘
      </Title>
    </Flex>
  );
};
