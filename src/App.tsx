import React from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router-dom';
import {
  Content,
  Header,
  HeaderMenuButton,
  HeaderName,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  HeaderContainer,
} from 'carbon-components-react/lib/components/UIShell';
import { Finance16,DataFormat16,CropHealth16 } from '@carbon/icons-react';
import Actives from './pages/Actives';
import Optimisation from './pages/Optimisation';
import Reliability from './pages/Reliability';

import './declare_modules.d.ts';
import './index.scss';

type IAppOwnProps = IAppProps & RouteComponentProps<any>;
type pages = 'actives' | 'optimisation'| 'reliability';

interface IAppProps {
}

interface IControlComponentState {
  currentPage: pages;
}

class App extends React.PureComponent<IAppOwnProps, IControlComponentState> {
  constructor(props: IAppOwnProps) {
    super(props);
    this.state = {
      currentPage: 'actives',
    };
  }

  componentDidMount() {
    if (this.props.location?.pathname.slice(1).split('/')[0] !== '') {
      this.setState({
        currentPage: this.props.location?.pathname.slice(1).split('/')[0] as any,
      });
    }
  }

  changePage = (page: pages) => {
    this.setState({
      currentPage: page,
    });
  };

  render() {  
    return (
      <>
        <HeaderContainer
          render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <>
              <Header aria-label="Insurance">
                <SkipToContent />
                <HeaderMenuButton aria-label="Open menu" onClick={onClickSideNavExpand} isActive={isSideNavExpanded} />
                <HeaderName children={''} href="" prefix="Insurance" />

                <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                  <SideNavItems>
                    <SideNavLink
                      renderIcon={Finance16}
                      aria-current={'page'}
                      onClick={() => {
                        this.changePage('actives');
                        this.props?.history.push('/actives');
                      }}
                    >
                      Ակտիվներ
                    </SideNavLink>
                    <SideNavLink
                      onClick={() => {
                        this.changePage('optimisation');
                        this.props?.history.push('/optimisation');
                      }}
                    >
                      Պորտֆել
                    </SideNavLink>

                  </SideNavItems>
                </SideNav>
              </Header>
            </>
          )}
        />
        <SideNav aria-label="Side navigation" expanded={window.screen.width > 1055} style = {{background:'#eaeef1'}}>
          <SideNavItems>
            <SideNavLink
              renderIcon={Finance16}
              aria-current={this.state.currentPage === 'actives' && 'page'}
              onClick={() => {
                this.changePage('actives');
                this.props?.history.push('/actives');
              }}
            >
              Ակտիվներ
            </SideNavLink>
            <SideNavLink
              renderIcon = {DataFormat16}
              aria-current={this.state.currentPage === 'optimisation' && 'page'}
              onClick={() => {
                this.changePage('optimisation');

                this.props?.history.push('/optimisation');
              }}
            >
              Պորտֆել
            </SideNavLink>
            <SideNavLink
              renderIcon = {CropHealth16}
              aria-current={this.state.currentPage === 'reliability' && 'page'}
              onClick={() => {
                this.changePage('reliability');

                this.props?.history.push('/reliability');
              }}
            >
              Հուասալիություն
            </SideNavLink>            
          </SideNavItems>
        </SideNav>
        <Content style={{ marginLeft: window.screen.width < 1055 && '0' }}>
          <Switch>
            <Route path="/actives">
              <Actives />
            </Route>
            <Route path="/optimisation">
              <Optimisation />
            </Route>
            <Route path="/reliability">
              <Reliability />
            </Route>
            <Route path="/">
              {/* <Home /> */}
              <Actives />
            </Route>
          </Switch>
        </Content>
      </>
    );
  }
}

export default App;
