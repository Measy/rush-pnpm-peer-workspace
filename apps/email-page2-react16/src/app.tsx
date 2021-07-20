import React from "react";
import { CardGroup } from 'email-libs'
import { Layout } from "antd";

const { Header, Footer, Sider, Content } = Layout;

export default (): JSX.Element => {
  return (
    <>
      <Layout>
        <Header>Header</Header>
        <CardGroup title="email-libs test peerdenpencies">
          <Content>Content</Content>
        </CardGroup>
        <Footer>Footer</Footer>
      </Layout>
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>Content</Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Content>Content</Content>
          <Sider>Sider</Sider>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
      <Layout>
        <Sider>Sider</Sider>
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      </Layout>
    </>
  );
};
