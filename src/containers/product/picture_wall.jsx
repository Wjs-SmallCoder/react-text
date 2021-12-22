import {Component} from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {BASE_URL} from '../../config'
import {reqRemovePic} from '../../api'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  // 上传(提交)的时候将图片名称保存为图片数组
  getimgsArr = () => {
    let result = []
    this.state.fileList.forEach((item) => {
      result.push(item.name) 
    })
    return result
  }

  // 从服务器拿到图片名称
  setimgsArr = (imgArr) => {
    let fileList = []
    imgArr.forEach((item,index) => {
      fileList.push({uid: -index, name: item.name, url: `${BASE_URL}/upload/${item}`})
    })
    this.setState({fileList})
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  // 上传图片状态改变触发(上传中，完成，失败总共三次) (值由file,fileList,event)
  handleChange = async({ file,fileList }) => {
    if (file.status === 'done') {
      // 将上传后的图片路径添加在file 中
      file.url = file.response.data.url
      file.name = file.response.data.name // 防止重名
      // console.log(file)
    }
    // 删除触发(与服务器交互通过图片名称来删除)
    if (file.status === 'removed') {
      // console.log('删除')  
      let result = await reqRemovePic(file.name)
      const {status,msg} = result
      if (status === '0') message.success('删除成功',1)
      else message.error(msg,1) 
    }
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action={`${BASE_URL}/manage/img/upload`}
          methid="post"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}