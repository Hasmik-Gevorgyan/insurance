import React,{Component} from 'react';
import styled from 'styled-components';
import { themes } from '../../styling';
import {Anmijakan} from '../../functional/ExpertAssessments/Anmijakan';
import { Button } from 'carbon-components-react';
import ImputModal from './InputModal';


const modelDecision = [
    {
        value: 'Ուժեղ',
        max: 5,
        min: 4.5,
        description: 'Այս գնահատականը տրվում է, երբ ապահովագրական ընկերությունն արդյունավետ է կառավարում բոլոր տիպերի հիմնական ռիսկերը` ներառյալ նոր ծառայություններով եւ շուկայում տեղի ունեցող փոփոխություններով պայմանավորված ռիսկերը եւ համարժեք է արձագանքում փոփոխվող պայմաններին:'
    },
    {
        value: 'Լավ',
        max: 4.4,
        min: 3.5,
        description: 'Այս գնահատականը ցույց է տալիս, որ ապահովագրական ընկերության ռիսկերի կառավարումը հիմնականում արդյունավետ է, սակայն նկատվում է նրա չնչին վատթարացում եւ այս դեպքում թերի են ռիսկերի վաղ կանխարգելման մեխանիզմները եւ համակարգերը, ինչը թուլացնում է ռիսկերին դիմակայելու ներուժը եւ դրանց հետեւանքների իսպառ չեզոքացման հնարավորությունները:'
    },
    {
        value: 'Բավարար',
        max: 3.4,
        min: 2.5,
        description: 'Այս գնահատականը տրվում է ԱԸ-երին, որոնց ռիսկերի վերահսկման ընթացակարգերը բարելավման կարիք ունեն, որպեսզի ղեկավարման օղակը կարողանա հայտնաբերել, հսկել եւ համարժեք կերպով կառավարել առաջացող ռիսկերը:'
    },
    {
        value: 'Սահմանային',
        max: 2.4,
        min: 1.5,
        description: 'Այս գնահատականն ստացող ԱԸ-երին չի հաջողվում գտնել, հսկել եւ կառավարել կարեւորագույն ռիսկերը, որի պատճառով նրանք կարող են կրել զգալի նյութական վնասներ: Այս իրավիճակը պահանջում է շտապ շտկման գործողություններ ղեկավարության կողմից:'
    },
    {
        value: 'Անբավարար',
        max: 1.4,
        min: 1,
        description: 'Այս գնահատականը ցույց է տալիս ԱԸ-ի կողմից ռիսկերը հայտնաբերելու, հսկելու եւ կառավարելու արդյունավետ մեխանիզմի հիմնովին բացակայությունը: Այս ԱԸ-երը խոր ճգնաժամի մեջ են գտնվում եւ պետք է անմիջապես իրականացնել համակարգված միջամտություն, որպես կանոն, արտաքին ռեսուրսների և ներգրավմամբ և մասնակցությամբ։'
    },
]

const StyledHeader = styled.div`
    font-size:  ${themes.spacing.spacing04};
    font-weight: bold;
    box-shadow: 0 0 0 ${themes.spacing.spacing02} #e5e5e5;
    border-radius: ${themes.spacing.spacing01};
    padding: ${themes.spacing.spacing03};
    background: #e5e5e5;
    margin-bottom: ${themes.spacing.spacing04};
    margin-left: -12px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > button {
        padding-right: ${themes.spacing.spacing04};
    }

`;

const StyledTable = styled.div`
padding-left: 16px;
`;

const StyledTableHeader = styled.div`
    background: #e5e5e5;
    padding: ${themes.spacing.spacing04};

`;

const StyledTableHeaderItem = styled.div`
    font-size: ${themes.spacing.spacing04};
    font-weight: bold;
`;

const StyledTableRow = styled.div`
    padding: ${themes.spacing.spacing03};
    border: ${themes.spacing.spacing01} solid #e5e5e5;
    cursor: pointer;
    
    :hover {
        background: #e5e5e5;
    }

`;

const StyledSolutionItem = styled.div`
    padding: ${themes.spacing.spacing04};
    background: #e5e5e5;
    margin-bottom: ${themes.spacing.spacing03};
    color: #0f62fe;
    font-size: ${themes.spacing.spacing04};
`;

interface IReliabilityProps {
    
}

interface IReliabilityState {
    caramelsData: number[][];
    solution: any;
    isOpen: boolean;
    modelValuesArray: number[];
    model: number;
}

class Reliability extends Component<IReliabilityProps,IReliabilityState> {
    constructor(props: IReliabilityProps) { 
        super(props);
        this.state = {
            caramelsData: [
                [9,6,3,4,9,8,6,6],
                [8,6,3,4,10,8,6,6],
                [9,6,3,3,9,8,4,5],
                [8,5,3,4,10,8,3,5],
                [9,5,4,4,10,7,3,5],
                [9,6,4,3,9,8,6,6],
                [10,7,4,4,10,7,4,6],
                [9,5,3,3,9,7,4,6],
                [10,7,3,4,9,8,3,6],
                [8,6,4,4,10,7,3,4]
            ],
            solution: {W: 0},
            isOpen: false,
            modelValuesArray: [5,1,2,4,1,3,4,1],
            model: 0,
        };

        this.getInputData = this.getInputData.bind(this);
    }

    componentDidMount() {
        const arrCopy = JSON.parse(JSON.stringify(this.state.caramelsData))
        const anmijakan = Anmijakan(arrCopy);
        let model = this.getModelValue( anmijakan.weightFactors,this.state.modelValuesArray);
       
        this.setState({
            solution: anmijakan,
            model
        })
    }

    getModelValue(w: number[],mV: number[]){
        let model = 0;
        for(let i = 0; i< w.length; i++) {
            model += w[i] * mV[i];
        }

        return model;
    }

    getDegreeOfAgreement(W: number) {
        if(W >= 0 && W <= 0.1) {
            return "Համաձայնեցվածություն չկա"
        } else if(W >= 0.1 && W <= 0.3) {
            return "Համաձայնեցվածությունը շատ թույլ է"
        } else if(W >= 0.3 && W <= 0.5) {
            return "Համաձայնեցվածությունը թույլ է"
        } else if(W >= 0.5 && W <= 0.7) {
            return "Համաձայնեցվածությունը չափավոր է"
        } else if(W >= 0.7 && W <= 0.9) {
            return "Համաձայնեցվածությունը բարձր է"
        } else if(W >= 0.9 && W <= 1) {
            return "Համաձայնեցվածությունը շատ բարձր է"
        }

        return "Գործակիցը սխալ է հաշվարկված";
    }


    toggleModal=()=>{
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    getInputData (data: number[][], models: number[]) {
        const arrCopy = JSON.parse(JSON.stringify(data))
        const solution = Anmijakan(arrCopy);
        const model = this.getModelValue(solution.weightFactors, models);
        this.setState({
            caramelsData: data,
            solution: solution,
            modelValuesArray: models,
            model
        })
    }

    

    render () {
        const {caramelsData, solution,model} = this.state;
        const Caramels = ["C","A","R","A","M","E","L","S"];
        const modelDescr = modelDecision.find(m => model >= m.min && model <= m.max );

        return (
            <div>
                <StyledHeader>
                    CARAMELS
                    <Button size = "field" 
                    onClick = {this.toggleModal}>
                        Ներմուծել նոր տվյալներ
                    </Button>
                </StyledHeader>
                <div className = "bx--row">
                    <StyledTable className = "bx--col-lg-9">
                        <StyledTableHeader className = "bx--row">
                            <div className = "bx--col-lg-4">

                            </div>
                            {Caramels.map(item=>(
                                <StyledTableHeaderItem key = {Math.random() + item} className = "bx--col">
                                        {item}
                                </StyledTableHeaderItem>
                            ))}
                        </StyledTableHeader>
                        {caramelsData.map((row: number[], index: number) =>(                      
                            
                            <StyledTableRow key = {Math.random()} className = "bx--row">
                                <div className = "bx--col-lg-4">
                                    Փորձագետ {index+ 1}
                                </div>
                                {row.map(cell=>(
                                    <div key = {Math.random() + cell} className= "bx--col">
                                        {cell}
                                    </div>
                                ))}
                            </StyledTableRow>                        
                        ))}
                    </StyledTable>
                    <div className = "bx--col-lg-7">
                        <StyledSolutionItem>
                            {"W = " + solution.W.toFixed(3) + " - " + this.getDegreeOfAgreement(solution.W)}
                        </StyledSolutionItem>
                        {solution.weightFactors && (
                            <StyledSolutionItem>
                                {'H = '}
                                {Caramels.map((item: string, index: number) =>(
                                    solution.weightFactors[index].toFixed(2) + item + (index!== 7 ? '+' : "")
                                ))}
                            </StyledSolutionItem>
                        )}  
                        <StyledSolutionItem>
                            {'CARAMELS = ' + this.state.model.toFixed(3) + ' - ' + modelDescr?.value}
                        </StyledSolutionItem> 
                        <StyledSolutionItem>
                            {modelDescr?.description}
                        </StyledSolutionItem>                     
                    </div>
                </div>{
                    this.state.isOpen &&
                
                <ImputModal open= {this.state.isOpen}
                    onClose = {this.toggleModal}
                    onSave = {this.getInputData}
                />}
            </div>
        )
    }
}

export default Reliability;