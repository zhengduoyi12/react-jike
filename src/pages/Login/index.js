import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'
import { useDispatch } from 'react-redux'
import { fetchLogin } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
const Login =  () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values)=>{
    await dispatch(fetchLogin(values))
    navigate('/')
  }
  return (
    <div className='login'>
      <Card className='login-container'>
        <img className='login-logo' src={logo} alt=''></img>
        <Form onFinish={onFinish}>
          <Form.Item name='mobile' rules={[{
            required:true,
            message: 'please input your phone number'
          }]}>
            <Input size="large" placeholder='phone number' maxLength='11'/>
          </Form.Item>

          <Form.Item name='code' rules={[{
            required:true,
            message: 'please input your code'
          }]}>
            <Input size="large" placeholder='code' />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType='submit' size="large" block> login</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default Login