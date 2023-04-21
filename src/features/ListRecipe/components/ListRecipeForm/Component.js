import React, { Component } from 'react';
import { connect } from "react-redux";
import { Divider, Form, message, Popconfirm, Upload } from "antd";
import { Link } from "react-router-dom";
import {
    AntButton,
    AntFormItem,
    AntInput,
} from "@layouts";
import { PlusOutlined } from "@ant-design/icons";
import helpers from "@ultis/helpers";

class CustomComponent extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            confirmLoading: false,
            selectedFileList: []
        }
    }

    showPopconfirm = () => {
        this.setOpen(true);
    };

    setOpen = (value) => {
        this.setState({
            ...this.state,
            open: value,
        });
    };

    setConfirmLoading = (value) => {
        this.setState({
            ...this.state,
            confirmLoading: value,
        });
    };

    handleOkDelete = (id) => {
        this.setConfirmLoading(true);
        setTimeout(() => {
            this.props.onDelete(id)
            this.setOpen(false);
            this.setConfirmLoading(false);
        }, 500);
    };

    handleCancelDelete = () => {
        this.setOpen(false)
    };

    onSubmit = (data) => {
        this.props.onSubmit({
            id: data.id ?? null,
            name: data.name ?? null,
        })
    }

    componentDidUpdate(prevProps) {
        let prevDetail = prevProps.listRecipe.detail;
        let currentDetail = this.props.listRecipe.detail;
        let prevDetailRecipe = prevDetail.data.listRecipe ?? {}
        let currentDetailRecipe = currentDetail.data.listRecipe ?? {}

        if (prevDetailRecipe.recipeId !== currentDetailRecipe.recipeId) {
            let formData = {
                id: currentDetailRecipe.recipeId ?? null,
                name: currentDetailRecipe.recipeName ?? "",
            }

            if (this.formRef.current) {
                this.formRef.current.setFieldsValue(formData)
            }
        }

        // Load detail portfolio form
        /*const currentDetail = this.props.portfolioConfigs.detail.data ?? {};
        const prevDetail    = prevProps.portfolioConfigs.detail.data ?? {}
        if (currentDetail !== prevDetail) {
            let {logoUrl, name} = currentDetail

            // Check is valid url
            if (logoUrl) {
                // Need init file
                let initFile = {
                    uid   : '-1',
                    name  : name,
                    status: 'done',
                    url   : logoUrl,
                };
                this.setState({
                    ...this.state,
                    selectedFileList: [initFile]
                })
            }
        }*/
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
            id,
        } = this.props

        const { selectedFileList, previewVisible, previewImage, previewTitle } = this.state

        // Response data
        const updateLoading = false;
        const createLoading = false;

        return (
            <Form
                className="form-center form-custom recipe-form"
                onFinish={(data => this.onSubmit(data))}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
                ref={this.formRef}
                initialValues={initValues}
                style={{ padding: 24 }}
            >
                <AntFormItem
                    hidden={true}
                    name="id"
                >
                    <AntInput />
                </AntFormItem>
                <AntFormItem
                    label="Ảnh bìa"
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
                        {selectedFileList.length >= 1 ? null : <UploadButton />}
                    </Upload>
                </AntFormItem>
                <AntFormItem
                    required={true}
                    label="Tên danh sách"
                    name="name"
                >
                    <AntInput placeholder="Nhập tên danh sách" />
                </AntFormItem>
                <Divider style={{ marginBlock: 24 }} />
                <div className="text-center group-button">
                    {
                        id ?
                            <AntButton
                                className="btn-primary"
                                htmlType="submit"
                                loading={updateLoading}
                            >
                                Update
                            </AntButton> :
                            <AntButton
                                className="btn-success"
                                htmlType="submit"
                                loading={createLoading}
                            >
                                Save
                            </AntButton>
                    }
                    {
                        id ?
                            <Popconfirm
                                title="Xác nhận xoá ?"
                                open={this.state.open}
                                onConfirm={() => {
                                    this.handleOkDelete(id)
                                }}
                                okButtonProps={{
                                    loading: this.state.confirmLoading,
                                }}
                                onCancel={this.handleCancelDelete}
                            >
                                <AntButton
                                    type="danger"
                                    value={id}
                                    onClick={this.showPopconfirm}
                                >
                                    Xoá
                                </AntButton>
                            </Popconfirm>
                            : null
                    }
                    <Link to={'/profile'}>
                        <AntButton>
                            Quay lại
                        </AntButton>
                    </Link>
                </div>
            </Form>
        )
    }

    handleChange = ({ fileList: newFileList }) => {
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
    customRequest = ({ onSuccess, onError, file }) => {
        let { selectedFileList } = this.state
        try {
            let currentFile = selectedFileList.find((item) => {
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

    handleCancel = () => {
        this.setState({
            ...this.state,
            previewVisible: false
        })
    };

    handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await helpers.getBase64(file.originFileObj)
        }

        this.setState({
            ...this.state,
            previewVisible: true,
            previewImage: file.url || file.preview,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        })
    };
}

function mapStateToProps(state) {
    return {
        listRecipe: state.listRecipe,
        home: state.home,
    }
}

export default connect(mapStateToProps, {})(CustomComponent)

const initValues = {
    id: null,
    name: "",
}

const UploadButton = () => (
    <div>
        <PlusOutlined />
        <div
            style={{
                marginTop: 8,
            }}
        >
            Upload
        </div>
    </div>
);