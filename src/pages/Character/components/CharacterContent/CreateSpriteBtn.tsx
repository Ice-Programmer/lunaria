import React, { useState } from 'react';
import { Button, Col, Flex, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import type { CreateCharacterSpriteRequest, SpriteSetDTO } from '@/types/character_sprite.ts';
import { useCharacterSpriteStore } from '@/pages/Character/components/CharacterContent/store/CharacterSpriteStore.ts';

const { Text, Title } = Typography;

interface CreateSpriteBtnProps {
  spriteSet: SpriteSetDTO;
}

export const CreateSpriteBtn: React.FC<CreateSpriteBtnProps> = ({ spriteSet }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="dashed"
        style={{
          width: 'clamp(110px, 15%, 135px)',
          aspectRatio: '3 / 5',
          height: 'auto',
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <Flex vertical align="center" justify="center" gap={10}>
          <PlusOutlined style={{ color: '#8b8b8c' }} />
          <Text type="secondary">添加差分</Text>
        </Flex>
      </Button>

      <CreateCharacterSpriteModal
        open={open}
        onCancel={() => setOpen(false)}
        spriteSet={spriteSet}
      />
    </>
  );
};

interface CreateSpriteSpriteModelProps {
  open: boolean;
  onCancel: () => void;
  spriteSet: SpriteSetDTO;
}

const CreateCharacterSpriteModal: React.FC<CreateSpriteSpriteModelProps> = ({
  open,
  onCancel,
  spriteSet,
}: CreateSpriteSpriteModelProps) => {
  const [form] = Form.useForm<CreateCharacterSpriteRequest>();
  const spriteSetList = useCharacterSpriteStore((state) => state.spriteSetList);
  return (
    <Modal
      destroyOnHidden
      title={
        <Title level={5} style={{ margin: 0 }}>
          新建立绘
        </Title>
      }
      open={open}
      onCancel={onCancel}
      afterOpenChange={(visible) => {
        if (visible) {
          form.setFieldsValue({ spriteSetId: spriteSet.spriteSetId });
        }
      }}
    >
      <Form<CreateCharacterSpriteRequest> form={form} layout="vertical">
        <Row gutter={24}>
          <Col span={10}></Col>

          <Col span={14}>
            <Flex vertical gap="small">
              <Form.Item<CreateCharacterSpriteRequest>
                label="差分名称"
                name="spriteName"
                rules={[{ required: true, message: '请输入差分名称' }]}
                style={{ marginBottom: 8 }}
              >
                <Input placeholder="例如：微笑" />
              </Form.Item>
              <Form.Item<CreateCharacterSpriteRequest>
                label="差分 Key"
                name="spriteCode"
                rules={[
                  { required: true, message: '请输入差分 Key' },
                  {
                    pattern: /^[a-z][a-z0-9_]*$/,
                    message: '请使用小写字母、数字和下划线，并以字母开头',
                  },
                ]}
                style={{ marginBottom: 8 }}
              >
                <Input
                  placeholder="例如：smail"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  autoComplete="off"
                />
              </Form.Item>

              <Form.Item<CreateCharacterSpriteRequest>
                label="立绘组"
                name="spriteSetId"
                initialValue={spriteSet.spriteSetId}
                rules={[{ required: true, message: '请选择立绘组' }]}
              >
                <Select
                  options={spriteSetList?.map((spriteSet) => {
                    return {
                      label: spriteSet.spriteSetName,
                      value: spriteSet.spriteSetId,
                    };
                  })}
                />
              </Form.Item>
            </Flex>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
