import React from 'react';
// import math from "math";
// import regression from 'regression';
// const { regression } = require("../dist/index");
// import {
//     inv
//   } from 'mathjs';

import MLR from 'ml-regression-multivariate-linear';

// import SimpleSimplex from 'simple-simplex';

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

import { Finance16 } from '@carbon/icons-react';
import Actives from './pages/Actives';
import Optimisation from './pages/Optimisation';
import './declare_modules.d.ts';
import './index.scss';

import { regression } from './functional/allPossibleRegressions/index';

const SimpleSimplex = require('simple-simplex');

type IAppOwnProps = IAppProps & RouteComponentProps<any>;
type pages = 'actives' | 'optimisation';
interface IAppProps {
  // hhhh: string;
  // kk: number;
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
    // const SimpleSimplex = require('simple-simplex');

    // initialize a solver
    const solver = new SimpleSimplex({
      objective: {
        a: 70,
        b: 210,
        c: 140,
      },
      constraints: [
        {
          namedVector: { a: 1, b: 1, c: 1 },
          constraint: '>=',
          constant: 100,
        },
        {
          namedVector: { a: 5, b: 4, c: 4 },
          constraint: '<=',
          constant: 480,
        },
        {
          namedVector: { a: 40, b: 20, c: 30 },
          constraint: '<=',
          constant: 3200,
        },
      ],
      optimizationType: 'max',
    });

    // call the solve method with a method name
    const result = solver.solve({
      methodName: 'simplex',
    });

    // see the solution and meta data
    console.log({
      solution: result.solution,
      isOptimal: result.details.isOptimal,
    });
    const result1 = regression([
      [40, 27, 89, 21, 42],
      [40, 27, 88, 25, 37],
      [37.5, 25, 90, 26, 37],
      [31, 24, 87, 30, 28],
      [31, 22, 87, 18, 18],
      [31, 23, 87, 25, 18],
      [31, 24, 93, 26, 19],
      [31, 24, 93, 28, 20],
      [29, 23, 87, 15, 15],
      [29, 18, 80, 16, 14],
      [29, 18, 89, 30, 14],
      [29, 17, 88, 18, 13],
      [29, 18, 82, 19, 11],
      [29, 19, 93, 25, 12],
      [25, 18, 89, 32, 8],
      [25, 18, 86, 16, 7],
      [25, 19, 72, 20, 8],
      [25, 19, 79, 21, 9],
      [25, 20, 80, 25, 1],
      [28, 20, 82, 28, 15],
      [35, 35, 91, 20, 15],
      [40, 40, 89, 12, 42],
      [40, 27, 88, 18, 37],
      [37.5, 25, 90, 16, 37],
    ]);

    console.log(result1, this.props.location?.pathname.slice(1).split('/')[0]);
    if (this.props.location?.pathname.slice(1).split('/')[0] !== '') {
      this.setState({
        currentPage: this.props.location?.pathname.slice(1).split('/')[0] as any,
      });
    }
  }

  async onSubmit() {
    let date = new Date('2017-01-06T15:09:23.294+00:00');

    // for (let index = 0; index < 221; index++) {
    date = new Date(date.setDate(date.getDate() + 7));

    await fetch('http://localhost:4000/app/insurance/activeType', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // body: JSON.stringify({
      //     value: Math.floor(Math.random()*1200000 + 900000),
      //     name: "Government securities",
      //     profit: Math.floor(Math.random()*1100000 + 900000),
      //     date: date,
      // })
    }).then(response => {
      response.json().then(data => {
        console.log(data);
      });
      console.log(response);
    });

    // }

    // console.log(date)
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
        <SideNav aria-label="Side navigation" expanded={window.screen.width > 1055}>
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
              aria-current={this.state.currentPage === 'optimisation' && 'page'}
              onClick={() => {
                this.changePage('optimisation');

                this.props?.history.push('/optimisation');
              }}
            >
              Պորտֆել
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
