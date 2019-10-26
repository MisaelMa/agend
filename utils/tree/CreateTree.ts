import {RoutePath} from '~/interface/components/routePath/RoutePath';

export async function createTree(routes: RoutePath[]): Promise<RoutePath[]> {
    let routespath = treeify(routes, 'id', 'fatherID', 'children');
    return routespath;
}

function treeify(list: RoutePath[], idAttr: string, parentAttr: string, childrenAttr: string) {
    if (!idAttr) {
        idAttr = 'id';
    }
    if (!parentAttr) {
        parentAttr = 'parent';
    }
    if (!childrenAttr) {
        childrenAttr = 'children';
    }
    let treeList: any = [];
    let lookup: any = {};
    list.forEach(function(obj: any) {
        lookup[obj[idAttr]] = obj;
        obj[childrenAttr] = [];
    });
    list.forEach(function(obj: any) {
        if (obj[parentAttr] != null) {
            lookup[obj[parentAttr]] ? lookup[obj[parentAttr]][childrenAttr].push(obj) : '';
        } else {
            treeList.push(obj);
        }
    });
    return treeList;
};
/*
async function findRoot(routes: RoutePath[]) {
    let roots = [];
    let newroots: RoutePath[] = []
    for (const route of routes){
        if (route.fatherID === null || route.fatherID === 'null'){
            await roots.push(route)
            //const index = await routes.indexOf(route);
            //await routes.splice(index, 1);
        } else {
            await newroots.push(route)
        }
    }

    for (let route of newroots){
        await findPathInRoutes(route.id,roots);
    }

    return {
        newroots,
        roots
    };
}

const findInChildren = (children: any[], id: number | null | undefined, found = false): boolean => {
    if (!found) {
        for (const child of children) {
            if (child.url === id) {
                child.children = []
                found = true;
            } else {
                if (child.children) {
                    found = findInChildren(child.children, id, found);
                }
            }
        }
    }
    return found;
};

const findPathInRoutes = (id: number | null | undefined, routes: RoutePath[]): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        try {
            let found = false;
            for (let route of routes) {
                if (route.fatherID === id) {
                    route.children = []
                    found = true;
                } else if (!found) {
                    if (route.children) {
                        found = findInChildren(route.children, id);
                    }
                }
            }
            resolve(found)
        } catch (e) {
            reject(e.message);
        }
    });
};
*/
