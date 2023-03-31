import { followUser, unfollowUser } from '@src/features/User/redux/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AntButton } from "@layouts";
import helpers from '@src/ultis/helpers';

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uuid: helpers.makeUUID()
        }
    }
    
    onClickFollow = () => {
        this.props.followUser(this.state.uuid, this.props.id)
    }

    onClickUnfollow = () => {
        this.props.unfollowUser(this.state.uuid, this.props.id)
    }

    componentDidUpdate(prevProps) {
        let {
            id,
            callBackRefresh
        } = this.props

        let isClickFollow = this.props.user.follow.uuid === this.state.uuid;
        let isClickUnfollow = this.props.user.unfollow.uuid === this.state.uuid;

        let currentFollow = this.props.user.follow
        let prevFollow = prevProps.user.follow

        let currentUnfollow = this.props.user.unfollow
        let prevUnfollow = prevProps.user.unfollow

        if ((currentFollow.data !== prevFollow.data) && isClickFollow) {
            if (callBackRefresh) {
                callBackRefresh(id)
            }
        }

        if ((currentUnfollow.data !== prevUnfollow.data) && isClickUnfollow) {
            if (callBackRefresh) {
                callBackRefresh(id)
            }
        }
    }

    render() {
        let {
            user,
            isFollow,
        } = this.props

        let stateId = this.state.uuid
        let followLoading = user.follow.loading && user.follow.uuid === stateId
        let unfollowLoading = user.unfollow.loading && user.unfollow.uuid === stateId
        return (
            <span className="follow-tag">
                {
                    isFollow ?
                        <AntButton
                            loading={unfollowLoading}
                            //type="dashed"
                            onClick={this.onClickUnfollow}
                        >
                            Bỏ theo dõi
                        </AntButton>
                        : <AntButton
                            loading={followLoading}
                            //type="dashed"
                            onClick={this.onClickFollow}
                        >
                            Theo dõi
                        </AntButton>
                }
            </span>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        followUser: (uuid, id) => {
            dispatch(followUser(uuid, id));
        },

        unfollowUser: (uuid, id) => {
            dispatch(unfollowUser(uuid, id));
        },
    };
}

function mapStateToProps(state) {
    return {
        router: state.router,
        auth: state.auth,
        common: state.common,
        user: state.user,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)