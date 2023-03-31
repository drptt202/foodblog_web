import React, {Component} from 'react';
import {Form, Input} from "antd";
import {UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {AntButton, AntFormItem} from "@layouts";

class President extends Component {
    render() {
        const register = this.props.register;
        console.log(register)
        return (
            <div className="feature-auth-login">
                <div className="form-header">
                    ĐĂNG KÝ
                </div>
                <Form className="ant-form ant-form-vertical"
                      onFinish={(data => this.props.handleRegister(data))}
                >
                    <AntFormItem name="fullName">
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder="Họ và tên"
                        />
                    </AntFormItem>
                    <AntFormItem name="email">
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon"/>}
                            placeholder="Email"
                        />
                    </AntFormItem>
                    <AntFormItem name="accountName">
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder="Tài khoản"
                        />
                    </AntFormItem>

                    <AntFormItem name="password">
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Mật khẩu"
                        />
                    </AntFormItem>
                    <AntFormItem name="password2">
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                        />
                    </AntFormItem>
                    <AntButton
                        className="btn-main-primary"
                        type="primary"
                        htmlType="submit"
                        block={true}
                        loading={register.loading}
                    >
                        Đăng ký
                    </AntButton>
                </Form>
                <div className="form-option">
                    or <Link to={'/login'}>Đăng nhập</Link>
                </div>
            </div>
        )
    }
}

export default President;