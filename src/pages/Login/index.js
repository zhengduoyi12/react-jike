import './index.scss'
import { Card, Form, Input, Button } from 'antd'
import logo from '@/assets/logo.png'

const Login = () => {
  const onFinish = (values)=>{
    console.log(values)
  }
  return (
    <div className='login'>
      <Card className='login-container'>
        <img className='login-logo' src={logo} alt=''></img>
        <Form onFinish={onFinish}>
          <Form.Item name='phone' rules={[{
            required:true,
            message: 'please input your phone number'
          }]}>
            <Input size="large" placeholder='phone number' />
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