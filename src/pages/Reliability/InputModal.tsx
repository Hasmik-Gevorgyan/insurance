import React from 'react';

import {
    ComposedModal,
    ModalHeader,
    ModalBody,
    NumberInput,
    ModalFooter,
    Button
  } from 'carbon-components-react';
  import styled from 'styled-components';
  import { themes } from '../../styling';
import { TextInput } from 'carbon-components-react';

const StyledModal = styled.div`
   .bx--modal-content{ padding-right: ${themes.spacing.spacing04};
}
`;

const StyledItem = styled.div`
    padding: 0;
    border: 1px solid;
`;

const StyledHeader = styled.div`
    background: #e5e5e5;
    padding: ${themes.spacing.spacing02};
`;

const StyledHeaderItem = styled.div`
    font-size: ${themes.spacing.spacing04};
`;

const StyledCaramelsItem = styled.div`
    margin-top: ${themes.spacing.spacing03};
`;

const Caramels = ["C","A","R","A","M","E","L","S"];


interface IImputModalProps {
    open: boolean;
    onClose(): void;
    onSave(data: number[][],models: number[]): void;
}

interface IImputModalState {
    imputData: any[][];
    numberOfEx: number;
    currentEx: number;
    currentArray: number[] | null[];
    caramelsValues: number[];
}

class ImputModal extends React.PureComponent<IImputModalProps,IImputModalState> {

    constructor (props:IImputModalProps) {
        super(props);
        this.state = {
            imputData: [],
            numberOfEx: 0,
            currentEx: -1,
            currentArray: [],
            caramelsValues: [1,1,1,1,1,1,1,1],
        }

        this.onSave = this.onSave.bind(this);
        this.inputCurrentArray = this.inputCurrentArray.bind(this);
        this.inputCaramelsValues = this.inputCaramelsValues.bind(this);
    }
    
    componentDidMount() {
        let currentArray = Caramels.map(item => (
            null
        ));

        this.setState({
            currentArray,
        })
    }
    
    public inputnumberOfEx = (count: number)=> {
        this.setState({
            numberOfEx: count
        })
    }

    inputCurrentArray(score: number,index: number) {
        let {currentArray} = this.state;
        currentArray[index] = score;
        this.setState({
            currentArray
        })
    }

    inputCaramelsValues(score: number,index: number) {
        let {caramelsValues} = this.state;
        caramelsValues[index] = score;
        this.setState({
            caramelsValues
        })
    }

    onSave () {
        if(this.state.currentEx === -1){
                if(this.state.numberOfEx > 0) {
                this.setState({
                    currentEx: this.state.currentEx + 1
                })
            }
        } else {
            let {currentArray} = this.state;
            let isNull = false;
            for(let i = 0; i < currentArray.length; i++) {
                if(currentArray[i] === null){
                    isNull= true;
                }
            }

            if(this.state.currentEx + 1 > this.state.numberOfEx) {

                this.props.onSave(this.state.imputData, this.state.caramelsValues);
                this.props.onClose();
                
            } else {
               
                if(!isNull) {
                    let addArr = this.state.imputData;
                    addArr.push(currentArray);

                    let newcurrentArray = Caramels.map(item => (
                        null
                    ));
                    
                    this.setState({
                        imputData: addArr,
                        currentEx: this.state.currentEx + 1,
                        currentArray: newcurrentArray,
                    })
                }
            }
        }
    }


  render() {
    return (
        <StyledModal>
      <ComposedModal open={this.props.open} 
      onClose={this.props.onClose}
      >
        <ModalHeader title="Հուսալիություն" />
        <ModalBody >    
            {this.state.currentEx === -1 ? 
          <><label className="bx--label">Փորձագետների քանակ</label>
          <NumberInput
            key = "couunt"
            min={0}
            onChange={(event: any) => {
                this.inputnumberOfEx(Number(event.imaginaryTarget.value));
            }}
          />
          </>
          :
          this.state.currentEx < this.state.numberOfEx ?
          <>
          <label className="bx--label">Փորձագետ {this.state.currentEx + 1}</label>

            <StyledHeader className = "bx--row">
                {Caramels.map(item => (
                    <StyledHeaderItem key = {Math.random()} className = "bx--col">
                        {item}
                    </StyledHeaderItem>
                ))}
            </StyledHeader>
            <div className = "bx--row">
                {Caramels.map((item,index) => (
                    <StyledItem key = {Math.random()} className = "bx--col">
                        <TextInput
                            min={0}
                            type = "number"
                            onChange={(event: any) => {
                                this.inputCurrentArray(Number(event.target.value),index);
                            }}
                        />
                    </StyledItem>
                ))}
            </div>
            </>
            :
            <>
            <label className="bx--label">Գնահատել յուրաքանչյուր տարրը (1-5 սանդղակով)</label>
                <div className = "bx--row">
                    {Caramels.map((item,index) => (
                        <StyledCaramelsItem className = "bx--col" key = {index}>
                            <StyledHeaderItem key = {Math.random()}>
                                {item}
                            </StyledHeaderItem>
                            <NumberInput
                                min={1}
                                max={5}
                                onChange={(event: any) => {
                                    this.inputCaramelsValues(Number(event.imaginaryTarget.value),index);
                                }}
                            />
                        </StyledCaramelsItem>
                    ))}
                </div>
              </>
            }
        </ModalBody>
        <ModalFooter>
          <Button
            kind="secondary"
            onClick={this.props.onClose}
          >
            Չեղարկել
          </Button>
          <Button
            kind="primary"
            onClick={() => {
              this.onSave();
              }
            }
          >
              {this.state.currentEx  >= this.state.numberOfEx ? "Հաշվել": "Հաջորդը"}
          </Button>
        </ModalFooter>
      </ComposedModal>
      </StyledModal>
    );
    }   
}
  
  export default ImputModal;
  