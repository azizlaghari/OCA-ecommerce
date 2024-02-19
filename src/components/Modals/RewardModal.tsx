import React, { useState } from "react";
import { Button, Col, Form, Input, Modal, notification } from "antd";

import PropTypes from "prop-types";

import rewardshare from "../../assets/images/rewardShare.svg";

import { useAppSelector } from "../../store/hooks";
import { ShareRewardsType } from "../../store/interfaces/Rewards";
import { shareRewards } from "../../store/services/rewards";
interface RewardModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const RewardModal: React.FC<RewardModalProps> = ({ isVisible, onClose }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: ShareRewardsType) => {
    if (user?.points && values.points <= user?.points) {
      setLoading(true);
      const res = await shareRewards(values);
      if (res) {
        clear();
      }
      setLoading(false);
    } else {
      notification.error({
        message: `You don't have enough points. Your current point total is ${user?.points}.`,
      });
    }
  };

  const clear = () => {
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      open={isVisible}
      onCancel={() => clear()}
      footer={null}
      className="REWARD_MODAL"
      centered
    >
      <div className="shareReward">
        <img src={rewardshare} alt="" />
      </div>
      <div className="rewardTextDiv">
        <h4>Reward sharing</h4>
        <p>
          You can share you reward amount with your friends and make them happy
          as you are
        </p>
      </div>
      <Form
        form={form}
        layout="vertical"
        className="rewardForm"
        requiredMark={false}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Col>
          <Form.Item
            label="Amount"
            name="points"
            rules={[
              {
                required: true,
                message: "Required",
              },
            ]}
          >
            <Input
              placeholder="Enter Amount"
              className="REWARD_MODAL_INPUT"
              type="number"
              addonAfter={
                <Button
                  type="primary"
                  className="primaryButton"
                  style={{ height: "100%" }}
                  onClick={() => form.setFieldValue("points", user?.points)}
                >
                  Max
                </Button>
              }
            />
          </Form.Item>
        </Col>
        <Col style={{ marginTop: "40px" }}>
          <Form.Item
            label="Enter friend email address"
            name="email"
            rules={[
              {
                required: true,
                message: "Required",
              },
              {
                type: "email",
                message: "Invalid email address",
              },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>
        </Col>
        <div className="shareBtn">
          <Button
            loading={loading}
            type="primary"
            className="primaryButton"
            style={{ width: "100%", height: "50px" }}
            htmlType="submit"
          >
            Send
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

RewardModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default RewardModal;
