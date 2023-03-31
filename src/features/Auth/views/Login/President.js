import React, {Component} from 'react';
import {Form, Input} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {AntButton, AntFormItem,} from "@layouts";
import {Link} from "react-router-dom";

class President extends Component {
    render() {
        const {errors} = this.props.crud;

        return (
            <div className="feature-auth-login">
                <div className="form-header">
                    ĐĂNG NHẬP
                </div>
                <Form
                    className="ant-form ant-form-vertical"
                    onFinish={(data => this.props.handleLogin(data))}
                >
                    <AntFormItem
                        errors={errors.accountName}
                        name="accountName"
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder="Tài khoản"
                        />
                    </AntFormItem>
                    <AntFormItem
                        errors={errors.password}
                        name="password"
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </AntFormItem>
                    <AntButton
                        className="btn-main-primary"
                        type="primary"
                               htmlType="submit"
                               block={true}
                               loading={this.props.loading}
                    >
                        Đăng nhập
                    </AntButton>
                </Form>
                <div className="form-option">
                    Bạn chưa có tài khoản ? <Link to={'/register'}>Đăng ký</Link>
                </div>
            </div>
        )
    }
}

export default President;