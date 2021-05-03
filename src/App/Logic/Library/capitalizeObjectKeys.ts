import _ from "lodash";

export function capitalizeObjectKeys(object: Object) {
    let capitalizeObject: any = {};
    _.map(object, (value, key) => {
        const capitalizeKey: string = _.capitalize(key);
        capitalizeObject[capitalizeKey] = value;
    });
    return capitalizeObject;
}