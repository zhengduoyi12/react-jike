import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState, useRef, useEffect } from 'react'
import { handlePublishAPI , getArticleDetailAPI} from '@/apis/article';
import { useChannel } from '@/hooks/useChannel'
import { useSearchParams } from 'react-router-dom'


const Publish = () => {
  const { channelList } = useChannel();
  const onFinish = async (values) => {
    await handlePublishAPI({
      ...values,
      cover: {
        type: values.type,
        images: fileList.map(item => item.response.data.url)
      }
    })

  }

  const [fileList, setFileList] = useState([])
  const fileListRef = useRef([])
  // 上传成功回调

  const onUploadChange = info => {
    const fileList = info.fileList.map(file => {
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      return file
    })
    setFileList(fileList)
    fileListRef.current = fileList
  }


  const [imgCount, setImgCount] = useState(1)

  const changeType = e => {
    const count = e.target.value
    setImgCount(count)

    if (count === 1) {
      // 单图，只展示第一张
      const firstImg = fileListRef.current[0]
      setFileList(!firstImg ? [] : [firstImg])
    } else if (count === 3) {
      // 三图，展示所有图片
      setFileList(fileListRef.current)
    }
  }
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get('id');
  useEffect(()=>{
    async function handleArticleDetail(){
      const res = await getArticleDetailAPI(articleId);
      form.setFieldsValue({...res.data,type:res.data.cover.type})
      setImgCount(res.data.cover.type);
      setFileList(res.data.cover.images.map(url=> {return {url}}))
    }
    if(articleId){
      handleArticleDetail();
    }
  },[articleId,form])
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">" items={[{ title: '首页',href: '/', },{title:articleId?'编辑文章':'发布文章'}]}>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }} options={channelList} fieldNames={{ label: 'name', value: 'id' }}>
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                maxCount={imgCount}
                multiple={imgCount > 1}
                fileList={fileList}
                onChange={onUploadChange}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />

          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish