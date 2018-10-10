import Head from 'next/head'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import '../../../asserts/styles.less'

export default ({ children }) =>
  <div>
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta charSet='utf-8' />
      <link rel='stylesheet' href='/_next/static/style.css' />
    </Head>


    <Layout>
      <style jsx>{`
        #components-layout-demo-top-side-2 .logo {
          width: 120px;
          height: 31px;
          background: #333;
          border-radius: 6px;
          margin: 16px 28px 16px 0;
          float: left;
        }
      `}</style>

      <Header className="header">
        <div className="logo" />
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
            >
          <Menu.Item key="1">具体项目功能</Menu.Item>
          <Menu.Item key="2">用户与权限管理</Menu.Item>
          <Menu.Item key="3">配置</Menu.Item>
          <Menu.Item key="4">当前项目代码自动化</Menu.Item>
          <Menu.Item key="5">代码自动化</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              >
            <SubMenu key="sub1" title={<span><Icon type="user" />项目</span>}>
              <Menu.Item key="1">项目管理</Menu.Item>
              <Menu.Item key="2">项目模块管理</Menu.Item>
              <Menu.Item key="3">菜单管理</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="laptop" />数据与表</span>}>
              <Menu.Item key="5">表管理</Menu.Item>
              <Menu.Item key="6">字典表</Menu.Item>
              <Menu.Item key="7">分类管理</Menu.Item>
              <Menu.Item key="8">标签管理</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="notification" />页面管理</span>}>
              <Menu.Item key="9">组件模板</Menu.Item>
              <Menu.Item key="10">页面模板</Menu.Item>
              <Menu.Item key="11">接口</Menu.Item>

            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="notification" />基本配置</span>}>
                <Menu.Item key="16">主题管理</Menu.Item>
                <Menu.Item key="17">当前主题</Menu.Item>
                <Menu.Item key="18">其它</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '12px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>

