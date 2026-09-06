import React, { useState } from 'react';
import { Button, Col, Divider, Flex, Form, Input, Modal, Row, Select, Typography } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import type { CreateCharacterSpriteRequest, SpriteSetDTO } from '@/types/character_sprite.ts';
import { useCharacterSpriteStore } from '@/pages/Character/components/CharacterContent/store/CharacterSpriteStore.ts';
import { ImageCropUploader } from '@/components/ImageCropUploader';
import { useCreateSprite } from '@/pages/Character/hooks/useCreateSprite.ts';
import { toImageInput } from '@/types/image.ts';

const { Text, Title } = Typography;

interface CreateSpriteBtnProps {
  spriteSet: SpriteSetDTO;
}

export const CreateSpriteBtn: React.FC<CreateSpriteBtnProps> = ({ spriteSet }) => {
  const [open, setOpen] = useState(false);
  const { handleCreateSprite } = useCreateSprite({
    onSuccess: async () => {
      setOpen(false);
    },
  });
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
        onCreate={handleCreateSprite}
      />
    </>
  );
};

interface CreateSpriteSpriteModelProps {
  open: boolean;
  onCancel: () => void;
  onCreate: (input: CreateCharacterSpriteRequest) => void | Promise<void>;
  spriteSet: SpriteSetDTO;
}

const CreateCharacterSpriteModal: React.FC<CreateSpriteSpriteModelProps> = ({
  open,
  onCancel,
  onCreate,
  spriteSet,
}: CreateSpriteSpriteModelProps) => {
  const [form] = Form.useForm<CreateCharacterSpriteRequest>();
  const [imageFile, setImageFile] = useState<File>();
  const [submitting, setSubmitting] = useState(false);

  const handleFinish = async (request: CreateCharacterSpriteRequest) => {
    setSubmitting(true);

    try {
      await onCreate({
        ...request,
        image: await toImageInput(imageFile),
      });
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    form.resetFields();
    setImageFile(undefined);
  };

  return (
    <Modal
      destroyOnHidden
      title={
        <Title level={5} style={{ margin: 0, marginBottom: '1rem' }}>
          新建差分
        </Title>
      }
      afterClose={reset}
      open={open}
      onCancel={onCancel}
      okText='创建差分'
      confirmLoading={submitting}
      onOk={() => form.submit()}
      afterOpenChange={(visible) => {
        if (visible) {
          form.setFieldsValue({ spriteSetId: spriteSet.spriteSetId });
        }
      }}
    >
      <Form<CreateCharacterSpriteRequest>
        form={form}
        layout="vertical"
        onFinish={(values) => void handleFinish(values)}
      >
        <Row gutter={24}>
          <Col span={10}>
            <ImageCropUploader
              content={
                <Flex vertical align="center" gap={8}>
                  <UserOutlined style={{ fontSize: 30 }} />

                  <Text strong style={{ fontSize: 12 }}>
                    添加差分
                  </Text>
                </Flex>
              }
              aspectRatio={3 / 5}
              enableCrop={false}
              onChange={setImageFile}
            />
          </Col>

          <Col span={14}>
            <CreateCharacterSpriteForm spriteSet={spriteSet} />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

interface CreateCharacterSpriteFormProps {
  spriteSet: SpriteSetDTO;
}

const CreateCharacterSpriteForm: React.FC<CreateCharacterSpriteFormProps> = ({ spriteSet }) => {
  const spriteSetList = useCharacterSpriteStore((state) => state.spriteSetList);
  return (
    <Flex vertical gap="small">
      <Flex vertical>
        <Text strong>差分信息</Text>
        <Text type="secondary" style={{ fontSize: 12 }}>
          设置角色差分信息，方便在剧情演出中选择和切换
        </Text>
      </Flex>

      <Divider style={{ margin: 0 }} />

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
  );
};
