import ChatApp from "../../components/chat/chat";
import ProgramList from "../../components/programs/programs";

const privateRoutes = [
  {
    path: '/chat',
    title: 'Govorilnia chat',
    component: () => <ChatApp title="Govorilnia" />,
  },
  {
    path: '/programs',
    title: 'Programs',
    component: () => <ProgramList title="Programs" />,
  }
  // {
  //   path: '/avatar',
  //   title: 'Avatar',
  //   component: () => <Avatar />,
  // },
  // {
  //   path: '/progress',
  //   title: 'Progress',
  //   component: () => <Progress title="Progress" />,
  //   exact: true,
  // },
  // {
  //   path: '/reviews',
  //   title: 'Reviews',
  //   component: () => <Reviews title="Reviews" />,
  //   exact: true,
  // },
  // {
  //   path: '/reviewed',
  //   title: 'Reviewed',
  //   component: () => <Reviewed title="Reviewed" />,
  //   exact: true,
  // },
  // {
  //   path: '/Reader',
  //   title: 'Reader',
  //   component: () => <News title="Reader" />,
  //   exact: true,
  // },
];

export default privateRoutes;
