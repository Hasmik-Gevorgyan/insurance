import React from 'react';
import { ContentSwitcher, Button, Switch } from 'carbon-components-react';

import styled from 'styled-components';
import { themes } from '../styling';
import { kindOfSwitches } from '../pages/Actives/options';

interface IHeaderProps {
  switches: kindOfSwitches[];
  buttonName: string;
  onClick(): void;
  onChange(name: string): void;
  changeKind(): void;
}

const StyledHeader = styled.div`
  padding-bottom: ${themes.spacing.spacing05};
  border-bottom: ${themes.spacing.spacing01} solid ${themes.colors.border01};
`;

const StyledButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const HeaderComponent = (props: IHeaderProps) => {
  const { switches, buttonName, onClick, onChange,changeKind } = props;

  return (
    <StyledHeader className="bx--row">
      <ContentSwitcher
        onChange={(e: any) => {
          onChange(e.name);
        }}
        className="bx--col-lg-9 bx--col-md-5"
      >
        {switches.map(item => {
          return <Switch name={item} text={item} />;
        })}
      </ContentSwitcher>
      <StyledButton className="bx--col-lg-7 bx--col-md-3">
        {buttonName !== "" && 
        <Button size="field" onClick={()=>{onClick();changeKind()}}>
          {buttonName}
        </Button>
        }
      </StyledButton>
    </StyledHeader>
  );
};

export default HeaderComponent;
