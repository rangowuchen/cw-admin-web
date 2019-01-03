<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed ? 'logo-collapse-width' : 'logo-width'">
                {{ collapsed ? '' : sysName }}
            </el-col>
            <el-col :span="6">
                <div class="tools" @click.prevent="collapse">
                    <img src="@/assets/logo.png" alt="">
                    <span>管理系统</span>
                </div>
            </el-col>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-lick userinfo-inner">
                            <img src="@/assets/avatar.jpg" />
                            {{ sysUserName }}
                        </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            我的消息
                        </el-dropdown-item>
                        <el-dropdown-item>
                            设置
                        </el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">
                            退出登录
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside :class="collapsed ? 'menu-collapsed' : 'menu-expanded'">
                <!--导航菜单-->
                <el-menu :default-active="currentMenu" class="el-menu-vertical-demo" background-color="#001529" active-text-color="#1e90ff" text-color="#fff" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router v-if="!collapsed">
                    <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
                    <el-submenu :index="index+''" v-if="!item.leaf">
                      <template slot="title">
                        <i :class="item.iconCls"></i>
                        {{ item.name }}
</template>
              <el-menu-item
                v-for="child in item.children"
                :index="child.path"
                v-if="!child.hidden"
                :key="child.path"
              >
                {{ child.name }}
              </el-menu-item>
            </el-submenu>
            <el-menu-item
              v-if="item.leaf && item.children.length"
              :index="item.children[0].path"
            >
              <i :class="item.iconCls"></i>
              {{ item.children[0].name }}
            </el-menu-item>
          </template>
        </el-menu>

        <!--导航菜单-折叠后-->
        <ul
          class="el-menu el-menu-vertical-demo collapsed"
          v-if="collapsed"
          ref="menuCollapsed"
        >
          <li
            v-for="(item, index) in $router.options.routes"
            v-if="!item.hidden"
            class="el-submenu item"
            :key="index"
          >
<template v-if="!item.leaf">
    <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
        <i :class="item.iconCls"></i>
    </div>
    <ul class="el-menu submenu" :class="'submenu-hook-' + index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
        <li v-for="(child, index) in item.children" v-if="!child.hidden" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)" :key="index">
            {{ child.name }}
        </li>
    </ul>
</template>
<template v-else>
    <li class="el-submenu">
        <div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path == item.children[0].path ? 'is-active' : ''" @click="$router.push(item.children[0].path)">
            <i :class="item.iconCls"></i>
        </div>
    </li>
</template>
</li>
</ul>
</aside>
<section class="content-container">
  <div class="grid-content bg-purple-light">
    <el-col>
      <breadcrumb></breadcrumb>
    </el-col>
    <el-col
      :span="24"
      class="content-wrapper"
    >
      <div>
        <el-tabs
          v-model="activeIndex"
          type="card"
          closable
          v-if="openTab.length"
          @tab-click='tabClick'
          @tab-remove='tabRemove'
        >
          <el-tab-pane
            :key="item.name"
            v-for="(item, index) in openTab"
            :label="item.name"
            :name="item.route"
          >
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="content-wrap">
        <router-view />
      </div>
    </el-col>
  </div>
</section>
</el-col>
</el-row>
</template>
<script>
    import breadcrumb from './components/breadcrumb'
    export default {
        data() {
            return {
                currentMenu: window.location.href.split("#")[1],
                sysName: "cw-admin-web",
                collapsed: false,
                sysUserName: "简&单",
                sysUserAvatar: "",
                form: {
                    name: "",
                    region: "",
                    date1: "",
                    date2: "",
                    delivery: false,
                    type: [],
                    resource: "",
                    desc: ""
                }
            };
        },
        components: {
            breadcrumb
        },
        methods: {
            onSubmit() {
                console.log("submit!");
            },
            handleopen() {
                //console.log('handleopen');
            },
            handleclose() {
                //console.log('handleclose');
            },
            handleselect: function(a, b) {},
            // 退出登录
            logout() {
                var _this = this;
                this.$confirm("确认退出吗?", "提示", {})
                    .then(() => {
                        sessionStorage.removeItem("user");
                        _this.$router.push("/login");
                        this.$store.commit("delete_tabs", "/dashBoard");
                    })
                    .catch(() => {});
            },
            // 折叠导航栏
            collapse() {
                this.collapsed = !this.collapsed;
                if (this.collapsed) {
                    document.getElementsByClassName(
                        "el-menu-vertical-demo"
                    )[0].style.width = "230px";
                }
            },
            showMenu(i, status) {
                this.$refs.menuCollapsed.getElementsByClassName(
                    "submenu-hook-" + i
                )[0].style.display = status ? "block" : "none";
            },
            //tab标签点击时，切换相应的路由
            tabClick(tab) {
                console.log("tab", tab);
                console.log("active", this.activeIndex);
                this.$router.push({
                    path: this.activeIndex
                });
            },
            //移除tab标签
            tabRemove(targetName) {
                console.log("tabRemove", targetName);
                //首页不删
                if (targetName == "/dashBoard") {
                    return;
                }
                this.$store.commit("delete_tabs", targetName);
                if (this.activeIndex === targetName) {
                    // 设置当前激活的路由
                    if (this.openTab && this.openTab.length >= 1) {
                        console.log(
                            "=============",
                            this.openTab[this.openTab.length - 1].route
                        );
                        this.$store.commit(
                            "set_active_index",
                            this.openTab[this.openTab.length - 1].route
                        );
                        this.$router.push({
                            path: this.activeIndex
                        });
                    } else {
                        this.$router.push({
                            path: "/dashBoard"
                        });
                    }
                }
            }
        },
        mounted() {
            var user = sessionStorage.getItem("user");
            // console.log("user",user);
            if (user) {
                user = JSON.parse(user);
                this.sysUserName = user.name || "";
                this.sysUserAvatar = user.avatar || "";
            }
            // 刷新时以当前路由做为tab加入tabs
            // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
            // 当当前路由是首页时，添加首页到store，并设置激活状态
            if (this.$route.path !== "/" && this.$route.path !== "/dashBoard") {
                console.log("1");
                this.$store.commit("add_tabs", {
                    route: "/dashBoard",
                    name: "仪表盘"
                });
                this.$store.commit("add_tabs", {
                    route: this.$route.path,
                    name: this.$route.name
                });
                this.$store.commit("set_active_index", this.$route.path);
            } else {
                console.log("2");
                this.$store.commit("add_tabs", {
                    route: "/dashBoard",
                    name: "仪表盘"
                });
                this.$store.commit("set_active_index", "/dashBoard");
                this.$router.push("/");
            }
        },
        computed: {
            openTab() {
                return this.$store.state.openTab;
            },
            activeIndex: {
                get() {
                    return this.$store.state.activeIndex;
                },
                set(val) {
                    this.$store.commit("set_active_index", val);
                }
            }
        },
        watch: {
            $route(to, from) {
                this.currentMenu = to.fullPath;
                console.log("currentMenu", this.currentMenu);
                //判断路由是否已经打开
                //已经打开的 ，将其置为active
                //未打开的，将其放入队列里
                let flag = false;
                for (let item of this.openTab) {
                    console.log("item.name", item.name);
                    console.log("t0.name", to.name);
                    if (item.name === to.name) {
                        console.log("to.fullPath", to.fullPath);
                        this.$store.commit("set_active_index", to.fullPath);
                        flag = true;
                        break;
                    }
                }
                if (!flag) {
                    console.log("to.fullPath", to.fullPath);
                    this.$store.commit("add_tabs", {
                        route: to.fullPath,
                        name: to.name
                    });
                    this.$store.commit("set_active_index", to.fullPath);
                }
            }
        }
    };
</script>
<style scoped lang="scss">
    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        .header {
            height: 60px;
            line-height: 60px;
            background: #fff;
            color: #fff;
            .userinfo {
                text-align: right;
                padding-right: 35px;
                float: right;
                .userinfo-inner {
                    cursor: pointer;
                    color: #333;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin: 10px 0px 10px 10px;
                        float: right;
                    }
                }
            }
            .logo {
                //width:230px;
                height: 60px;
                font-size: 22px;
                padding-left: 20px;
                padding-right: 20px;
                border-color: rgba(238, 241, 146, 0.3);
                border-right-width: 1px;
                border-right-style: solid;
                background: rgb(0, 21, 41);
                img {
                    width: 40px;
                    float: left;
                    margin: 10px 10px 10px 18px;
                }
                .txt {
                    color: #fff;
                }
            }
            .logo-width {
                width: 230px;
            }
            .logo-collapse-width {
                width: 60px;
                background-color: #fff;
                background: url("../../assets/avatar.jpg") no-repeat;
                background-size: 50px 40px;
                background-position: 5px center;
                padding: 0;
            }
            .tools {
                padding: 0px 23px;
                width: 200px;
                height: 60px;
                line-height: 60px;
                cursor: pointer;
                color: #0e2754;
                img {
                    vertical-align: middle;
                    width: 33px;
                    height: 33px;
                }
                span {
                    margin-left: 10px;
                    font-size: 18px;
                    font-weight: bold;
                }
            }
        }
        .main {
            display: flex; // background: #324057;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;
            aside {
                flex: 0 0 230px;
                width: 230px;
                .el-menu {
                    height: 100%;
                }
                .collapsed {
                    width: 60px;
                    .item {
                        position: relative;
                    }
                    .submenu {
                        position: absolute;
                        top: 0px;
                        left: 60px;
                        z-index: 99999;
                        height: auto;
                        display: none;
                    }
                }
            }
            .menu-collapsed {
                flex: 0 0 60px;
                width: 60px;
            }
            .menu-expanded {
                flex: 0 0 230px;
                width: 230px;
                text-align: left;
            }
            .content-container {
                flex: 1;
                overflow-y: scroll;
                padding: 0px 20px 20px 20px;
                background: #f4f8fb;
                .breadcrumb-container {
                    height: 40px;
                    line-height: 40px;
                    font-size: 18px;
                    .title {
                        width: 200px;
                        float: left;
                        color: #475669;
                    }
                    .breadcrumb-inner {
                        height: 30px;
                        line-height: 30px;
                    }
                }
                .content-wrapper {
                    box-sizing: border-box;
                    padding: 0px 20px 20px 20px;
                }
            }
        }
    }
</style>

<style lang="scss">
    .el-tabs.el-tabs--border-card {
        box-shadow: none;
        border-bottom: none;
    }
    .el-tabs__item.is-active {
        color: #fff;
        background-color: #409eff;
    }
    .el-tabs__item {
        height: 30px;
        line-height: 30px;
        font-size: 12px;
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
        line-height: 30px;
    }
</style>
