import {RoutePath} from '~/interfaces/components/routePath/RoutePath';

const setTreeFlat = (children: RoutePath[], constArray: any[]) => {
    for (const child of children) {
        constArray.push(child);
        if (child.children && child.children.length > 0) {
            setTreeFlat(child.children, constArray);
        }
    }
};
 const TreeFlat = (routes: RoutePath[]): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        try {
            let newArrya: any = [];
            for (let route of routes) {
                //console.log(route.children.length)
                newArrya.push(route);
                if (route.children && route.children.length > 0) {
                    setTreeFlat(route.children, newArrya);
                }

            }
            resolve(newArrya);
        } catch (e) {
            reject(e.message);
        }
    });
};
export default TreeFlat;
