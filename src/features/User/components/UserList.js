import React, { Component } from 'react';
import { Avatar, Col, Row } from "antd";
import helpers from "@ultis/helpers";
import { Link, withRouter } from "react-router-dom";
import BadgeImageDefault from "@images/recipe-default.jpg";
import { UserOutlined } from "@ant-design/icons";
import { DataEmpty, FollowTag } from '@src/layouts';
import { Loading } from "@layouts";
import { RecipeCard } from "@features/Home/components/HomePage/components";

class UserList extends Component {
    render() {
        const {
            callBackRefresh,
            users,
            loading,
        } = this.props

        const authUserId = helpers.getAuthUserId();
        let dataUsers = users.users ?? []
        return (
            <div className="user-list">
                <Row gutter={48}>
                    {
                        loading ? <Loading /> : null
                    }
                    {
                        loading === false && dataUsers.length === 0 ? <DataEmpty title="Không có người dùng nào." /> : null
                    }
                    {
                        dataUsers.length > 0 ? dataUsers.map((user, idx) => {
                            return (
                                <Col span={12} key={idx}>
                                    <div className="user-block">
                                        <div className="label-user">
                                            <div className="user-information">
                                                <div className="left">
                                                    {
                                                        helpers.generateFullImage(user.avatar) ?
                                                            <Avatar
                                                                size={60}
                                                                src={<img
                                                                    src={helpers.generateFullImage(user.avatar)}
                                                                    alt="" />}
                                                            /> : <Avatar
                                                                size={60}
                                                                icon={<UserOutlined />}
                                                            />
                                                    }
                                                </div>
                                                <div className="right">
                                                    <div className="name">
                                                        <Link to={`/user/${user.userId}`}
                                                            className="label">{user.fullName}</Link>
                                                        {
                                                            authUserId !== user.userId ?
                                                                <FollowTag
                                                                    id={user.userId}
                                                                    isFollow={user.isFollow}
                                                                    callBackRefresh={callBackRefresh}
                                                                /> : null
                                                        }
                                                    </div>
                                                    <div className="email">{user.email}</div>
                                                    {
                                                        user.introduce ? <div className="introduce">
                                                            {user.introduce}
                                                        </div> : null
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>

                            )
                        }) : null
                    }
                </Row>

            </div>
        )
    }
}

export default withRouter(UserList)