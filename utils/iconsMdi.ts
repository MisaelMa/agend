// @ts-ignore
import  json from './icons.json'

export  function findeIcon() {

}

export const iconMdi = () => {
    let dataList =  json;
    return dataList.map((data: any)=>{
        return  {
            value:data.icon.split(/(?=[A-Z])/).join(" ").toLowerCase().replace(/ /g,'-'),
            text:data.icon.split(/(?=[A-Z])/).join(" ").toLowerCase().replace(/ /g,'-'),
        }
    })
    //split(/(?=[A-Z])/).join(" ");
};
