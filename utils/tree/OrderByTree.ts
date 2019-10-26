interface SortOptions<T = any> {
    items: T[],
    comparisonProperty: string,
    subArrayName: string,
}
 const sort = async <T = any>(options: SortOptions): Promise<T[]> => {
    return new Promise<T[]>((resolve, reject) => {
        const {items, subArrayName, comparisonProperty} = options;
        if (!items.length) {
            resolve(items);
        }
        const propertyExist = Object.keys(items[0]).includes(comparisonProperty);
        if (!propertyExist) {
            reject('The comparison property does not exist');
        }
        items.sort((a: any, b: any) => {
            if (a[comparisonProperty] > b[comparisonProperty]) {
                return 1;
            } else {
                return -1;
            }
        });
        items.forEach(async (value: any) => {
            if (value[subArrayName]) {
                await sort({
                    items: value[subArrayName],
                    comparisonProperty,
                    subArrayName,
                });
            }
        });
        resolve(options.items);
    });
};
export default sort;
