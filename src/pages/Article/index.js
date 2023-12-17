import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Tag, Space, Popconfirm } from 'antd'
// import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useChannel } from '@/hooks/useChannel'
import img404 from '@/assets/error.png'
import { useEffect } from 'react'
import { getArticleAPI, deleteArticleAPI } from '@/apis/article';
import { useState } from 'react'
import { Pagination } from 'antd';
import { useNavigate } from 'react-router-dom'

const { RangePicker } = DatePicker

const Article = () => {
  const { channelList } = useChannel();
  const status = {
    1: <Tag color="warning">待审核</Tag>,
    2: <Tag color="success">审核通过</Tag>
  }
  const navigate = useNavigate();
  const handleDelete = async (data) => {
   await deleteArticleAPI(data)
   setParams({...params})
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => status[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>navigate(`/publish?id=${data.id}`)}/>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={()=>handleDelete(data.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]
  const [params, setParams] = useState({
    status: '',
    channel_id: '',
    begin_pubdata: '',
    end_pubdate: '',
    page: 1,
    per_page: 4,
  })
  const onFinish = (values) => {
    setParams({
      ...params,
      status: values.status,
      channel_id: values.channel_id || '',
      begin_pubdata: values.date && values.date[0].format('YYYY-MM-DD'),
      end_pubdate: values.date && values.date[1].format('YYYY-MM-DD'),
    })
  }
  const [list, setList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const onChange = (page, pageSize) => {
    setParams({
      ...params,
      page: page,
      per_page: pageSize,
    })
  }
  useEffect(() => {
    async function getList() {
      const res = await getArticleAPI(params)
      setList(res.data.results)
      setTotalCount(res.data.total_count)
    }
    getList()
  }, [params])
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">" items={[{ title: '首页', href: '/', }, { title: '内容管理' }]}>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form onFinish={onFinish} initialValues={params}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={'0'}>草稿</Radio>
              <Radio value={'1'}>待审核</Radio>
              <Radio value={'2'}>审核通过</Radio>
              <Radio value={'3'}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
              options={channelList}
              fieldNames={{ label: 'name', value: 'id' }}
            >
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${totalCount} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={list} />
        <Pagination defaultCurrent={1} total={totalCount} onChange={onChange} defaultPageSize='4' />;
      </Card>
    </div>
  )
}

export default Article