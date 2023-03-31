import React, {Component} from 'react';
import {connect} from "react-redux";
import {message, Divider, Form, DatePicker, Upload} from "antd";
import {
    AntButton,
    AntFormItem,
    AntInput,
    AntInputTextArea,
} from "@layouts";
import {PlusOutlined} from "@ant-design/icons";
import helpers from "@ultis/helpers";

class President extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            selectedFileList: [],
            previewVisible  : false,
            previewImage    : '',
            previewTitle    : '',
        }
    }

    componentDidUpdate(prevProps) {
        let prevAuthUser    = prevProps.auth.authUser;
        let currentAuthUser = this.props.auth.authUser;

        if (prevAuthUser !== currentAuthUser) {
            if (this.formRef.current) {
                this.formRef.current.setFieldsValue({
                    id         : currentAuthUser.id,
                    fullName   : currentAuthUser.fullName ?? "",
                    email      : currentAuthUser.email ?? "",
                    address    : currentAuthUser.address ?? "",
                    introduce  : currentAuthUser.introduce ?? "",
                    dateOfBirth: currentAuthUser.dateOfBirth ?? "",
                })
            }

            // Check is valid url
            let avatar = currentAuthUser.avatar ?? null
            if (avatar) {
                // Need init file
                let initFile = {
                    uid   : '-1',
                    name  : avatar,
                    status: 'done',
                    url   : helpers.generateFullImage(avatar),
                };
                this.setState({
                    ...this.state,
                    selectedFileList: [initFile]
                })
            }
        }
    }

    onCloseRule = () => {
        this.resetForm();
        this.props.onCloseRule();
    }

    resetForm = () => {
        if (this.formRef.current) {
            this.formRef.current.setFieldsValue({
                ...initValues
            })
        }
    }

    render() {
        let {
                onUpdateAccount
            } = this.props

        const {selectedFileList} = this.state
        const updateLoading      = this.props.auth.update.loading || this.props.auth.authUser.loading;

        return (
            <Form
                className="form-center form-custom recipe-form"
                onFinish={(data => onUpdateAccount(data))}
                labelCol={{span: 4}}
                wrapperCol={{span: 20}}
                ref={this.formRef}
                initialValues={initValues}
                style={{padding: 24}}
            >
                <AntFormItem
                    label="Ảnh đại diện"
                    name="image"
                >
                    <Upload
                        fileList={selectedFileList}
                        listType="picture-card"
                        beforeUpload={this.beforeUpload}
                        onChange={this.handleChange}
                        customRequest={this.customRequest}
                        onPreview={this.handlePreview}
                    >
                        {selectedFileList.length >= 1 ? null : <UploadButton/>}
                    </Upload>
                </AntFormItem>
                <AntFormItem
                    required={true}
                    label="Tên đầy đủ"
                    name="fullName"
                >
                    <AntInput placeholder="Nhập tên đầy đủ"/>
                </AntFormItem>
                <AntFormItem
                    required={true}
                    label="Ngày sinh"
                    name="dateOfBirth"
                >
                    <DatePicker
                        style={{
                            width: '100%',
                        }}
                    />
                </AntFormItem>
                <AntFormItem
                    required={true}
                    label="Email"
                    name="email"
                >
                    <AntInput placeholder="Nhập email"/>
                </AntFormItem>
                <AntFormItem
                    required={true}
                    label="Địa chỉ"
                    name="address"
                >
                    <AntInput placeholder="Nhập địa chỉ"/>
                </AntFormItem>
                <AntFormItem
                    label="Giới thiệu"
                    name="introduce"
                >
                    <AntInputTextArea rows={5} placeholder="Nhập giới thiệu"/>
                </AntFormItem>
                <Divider style={{marginBlock: 24}}/>
                <div className="text-center group-button">
                    <AntButton
                        className="btn-primary"
                        htmlType="submit"
                        loading={updateLoading}
                    >
                        Update
                    </AntButton>
                </div>
            </Form>
        )
    }

    handleChange = ({fileList: newFileList}) => {
        this.setState({
            ...this.state,
            selectedFileList: newFileList
        })
    };

    /**
     * Custom handel upload
     * @param onSuccess
     * @param onError
     * @param file
     */
    customRequest = ({onSuccess, onError, file}) => {
        let {selectedFileList} = this.state
        try {
            let currentFile    = selectedFileList.find((item) => {
                return item.uid = file.uid
            });
            currentFile.status = "done";
            this.setState({
                ...this.state,
                selectedFileList: selectedFileList
            })
        } catch (e) {
            console.log(e)
        }
    };

    /**
     * Validate image
     * @param file
     * @returns {boolean}
     */
    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }

        return isJpgOrPng && isLt2M;
    };

    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await helpers.getBase64(file.originFileObj)
        }

        this.setState({
            ...this.state,
            previewVisible: true,
            previewImage  : file.url || file.preview,
            previewTitle  : file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        })
    };
}

function mapStateToProps(state) {
    return {
        user: state.user,
        auth: state.auth,
    }
}

export default connect(mapStateToProps, {})(President)

const initValues = {
    fullName   : "",
    email      : "",
    address    : "",
    introduce  : "",
    dateOfBirth: "",
}

const UploadButton = () => (
    <div>
        <PlusOutlined/>
        <div
            style={{
                marginTop: 8,
            }}
        >
            Upload
        </div>
    </div>
);