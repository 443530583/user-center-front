import { DefaultFooter } from '@ant-design/pro-layout';
import {GitlabOutlined} from "@ant-design/icons";

const Footer: React.FC = () => {
  const defaultMessage = '用户中心';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: '百度',
          href: 'https://www.baidu.com',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <><GitlabOutlined/>郑向旺 Github</>,
          href: 'https://github.com/443530583',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
