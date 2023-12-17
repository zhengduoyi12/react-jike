import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Outlet, useNavigate,useLocation } from 'react-router-dom'
import { fetchUserInfo , resetUserInfo} from '@/store/modules/user'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
const { Header, Sider } = Layout
const items = [
    {   
        label:'首页',
        key:'/',
        icon:<HomeOutlined />
    },
    {   
        label:'文章管理',
        key:'/article',
        icon:<DiffOutlined />
    },
    {   
        label:'创建文章',
        key:'/publish',
        icon:<EditOutlined />
    },
]
const GeekLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const onMenuClick=(route)=>{
        navigate(route.key)
    }
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchUserInfo())  
    },[dispatch])
    const userInfo = useSelector(state=>state.user.userInfo)
    
    const logout = ()=>{
         dispatch(resetUserInfo())
        navigate('/login')
    }
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userInfo.name||''}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={logout}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[location.pathname]}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
            onClick={onMenuClick}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
            <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default GeekLayout