import React, { useState } from 'react';
import { Button, Col, Flex, Form, Input, Modal, Row, Typography } from 'antd';
import { CreateCharacterSpriteSetRequest } from '@/types/character_sprite_set.ts';
import { PlusOutlined, UserAddOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
interface CreateSpriteButtonProps {
  characterId: number;
}

export const CreateSpriteButton: React.FC<CreateSpriteButtonProps> = ({ characterId }) => {
  const [open, setOpen] = useState(false);
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
        characterId={characterId}
        open={open}
        onCancel={() => setOpen(false)}
        onCreate={() => {}}
      />
    </>
  );
};

interface CreateSpriteModalProps {
  open: boolean;
  characterId: number;
  onCreate: () => void;
  onCancel: () => void;
}

const CreateSpriteModal: React.FC<CreateSpriteModalProps> = ({
  open,
  characterId,
  onCreate,
  onCancel,
}: CreateSpriteModalProps) => {
  return (
    <Modal
      title={<ModalHeader />}
      destroyOnHidden
      okText="创建立绘"
      open={open}
      cancelText="取消"
      onCancel={onCancel}
    >
      <Form<CreateCharacterSpriteSetRequest> layout="vertical">
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item<CreateCharacterSpriteSetRequest>
              label="角色名称"
              name="spriteSetName"
              rules={[{ required: true, message: '请输入立绘名称' }]}
              style={{ marginBottom: 8 }}
            >
              <Input placeholder="例如：日常服" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item<CreateCharacterSpriteSetRequest>
              label="立绘组 Code"
              name="spriteSetName"
              rules={[
                { required: true, message: '请输入立绘 Code' },
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
      <UserAddOutlined />

      <Title level={5} style={{ margin: 0 }}>
        新建立绘
      </Title>
    </Flex>
  );
};
