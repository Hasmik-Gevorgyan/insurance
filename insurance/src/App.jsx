import React , {Component} from "react";
import Search20 from "@carbon/icons-react/lib/search/20";
import Notification20 from "@carbon/icons-react/lib/notification/20";
import AppSwitcher20 from "@carbon/icons-react/lib/app-switcher/20";
import HeaderContainer from "carbon-components-react/lib/components/UIShell/HeaderContainer";
import {
    Content,
    Header,
    HeaderMenuButton,
    HeaderName,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SkipToContent,
    SideNav,
    SideNavItems,
    SideNavLink,
    SideNavMenu,
    SideNavMenuItem
  } from "carbon-components-react/lib/components/UIShell";


class App extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    // async onSubmit(event) {
    //     event.preventDefault()
    //     const registered = {
    //         name: "Fixed assets",
    //         value: 900000 + Math.floor(Math.random() * 1500000),
    //         date: "2021-04-08T12:48:40.632+00:00",
    //     }

    //     const request = await fetch('http://localhost:4000/app/insurance/active',{
    //         method: 'POST',
    //         mode: 'cors',
    //         cache: 'no-cache', 
    //         credentials: 'same-origin', 
    //         headers: {
    //         'Content-Type': 'application/json'
    //         // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         body: JSON.stringify(registered)
    //     }).then(response => {
    //         console.log(response); 
    //       });
 
    // }

    render() {
        return(
            <div className="container">
                <HeaderContainer
                render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                    <>
                    <Header aria-label="Insurance">
                        <SkipToContent />
                        <HeaderMenuButton
                        aria-label="Open menu"
                        onClick={onClickSideNavExpand}
                        isActive={isSideNavExpanded}
                        />
                        <HeaderName href="#" prefix="Insurance" />
                        
                        <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                        <SideNavItems>
                            <SideNavMenu renderIcon={"Fade16"} title="Category title">
                            <SideNavMenuItem href="javascript:void(0)">
                                Link
                            </SideNavMenuItem>
                            <SideNavMenuItem
                                aria-current="page"
                                href="javascript:void(0)"
                            >
                                Link
                            </SideNavMenuItem>
                            <SideNavMenuItem href="javascript:void(0)">
                                Link
                            </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavMenu renderIcon={"Fade16"} title="Category title">
                            <SideNavMenuItem href="javascript:void(0)">
                                Link
                            </SideNavMenuItem>
                            <SideNavMenuItem
                                aria-current="page"
                                href="javascript:void(0)"
                            >
                                Link
                            </SideNavMenuItem>
                            <SideNavMenuItem href="javascript:void(0)">
                                Link
                            </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavMenu renderIcon={"Fade16"} title="Category title">
                            <SideNavMenuItem href="javascript:void(0)">
                                Link
                            </SideNavMenuItem>
                            <SideNavMenuItem
                                aria-current="page"
                                href="javascript:void(0)"
                            >
                                Link
                            </SideNavMenuItem>
                            <SideNavMenuItem href="javascript:void(0)">
                                Link
                            </SideNavMenuItem>
                            </SideNavMenu>
                            <SideNavLink renderIcon={"Fade16"} href="javascript:void(0)">
                            Link
                            </SideNavLink>
                            <SideNavLink renderIcon={"Fade16"} href="javascript:void(0)">
                            Link
                            </SideNavLink>
                        </SideNavItems>
                        </SideNav>
                    </Header>
                    </>
                )}
                />
            </div>
        )
    }
 }


 export default App;