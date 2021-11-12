/*
 * @Author: wangyi
 * @Description:
 * @Date: 2021-11-11 18:06:12
 * @LastEditTime: 2021-11-11 18:20:15
 */
const systemRouter = {
  path: "/system",
  name: "system",
  redirect: "/system/user",
  meta: {
    icon: "Setting",
    title: "message.hssysManagement",
    showLink: true,
    rank: 6
  },
  children: [
    {
      path: "/system/user",
      name: "user",
      meta: {
        title: "message.hsBaseinfo",
        showLink: true
      }
    },
    {
      path: "/system/dict",
      name: "dict",
      meta: {
        title: "message.hsDict",
        showLink: true
      }
    }
  ]
};

const permissionRouter = {
  path: "/permission",
  name: "permission",
  redirect: "/permission/page",
  meta: {
    title: "message.permission",
    icon: "Lollipop",
    showLink: true,
    rank: 3
  },
  children: [
    {
      path: "/permission/page",
      name: "permissionPage",
      meta: {
        title: "message.permissionPage",
        showLink: true
      }
    },
    {
      path: "/permission/button",
      name: "permissionButton",
      meta: {
        title: "message.permissionButton",
        showLink: true,
        authority: []
      }
    }
  ]
};
function setDifAuthority(authority, routes) {
  routes.children[1].meta.authority = [authority];
  return routes;
}


export default {
  'GET /api/getAsyncRoutes':(req, res) => {
    const {name} = req.body;
    if(name === 'admin'){
      res.status(200).send({
        code: 0,
        info: [systemRouter, setDifAuthority("v-admin", permissionRouter)]
      });
    } else {
      res.status(200).send({
        code: 0,
        info: [systemRouter, setDifAuthority("v-test", permissionRouter)]
      });
    }
  }
}
