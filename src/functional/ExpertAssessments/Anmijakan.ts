export function Anmijakan(data: number[][]) {
    let S = getS(data);
    let W = (12*S)/(Math.pow(data.length,2)*(Math.pow(data[0].length,3)-data[0].length));
    let weightFactorssss = weightFactors(relativeSignificance(data));
    return {weightFactors: weightFactorssss,W};
}

function relativeSignificance(data: number[][]) {
    let sum = data.map(item=>{
        return item.reduce((sum: number,currentValue: number)=>{
            return sum + currentValue;
        },0)
    })

    for(let i = 0; i < data.length; i++) {
        for(let j = 0; j< data[i].length; j++) {
            data[i][j] /= sum[i] 
        }
    }

    return data;
}


function weightFactors(relativeSignificanceArray: number[][]) {
    let data: number[] = [];

    for(let i = 0; i < relativeSignificanceArray[0].length; i++) {
        let sum = 0;
        for(let j = 0; j< relativeSignificanceArray.length; j++) {
            sum +=relativeSignificanceArray[j][i];
        }
        data[i] = sum/relativeSignificanceArray.length;
    }

    return data;
}

function getS (data: number[][]) {
    let sumArray: number[] = [];
    for(let i = 0; i < data[0].length; i++) {
        let sum = 0;
        for(let j = 0; j< data.length; j++) {
            sum +=data[j][i];
        }
        sumArray[i] = sum;
    }

    let average = sumArray.reduce((count,currentValue) =>{return count + currentValue},0)/sumArray.length;
    let S = sumArray.reduce((count,currentValue) =>{return count + Math.pow((currentValue - average),2)},0);

    return S;
}