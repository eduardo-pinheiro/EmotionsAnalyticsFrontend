import Axios from "axios";

export class Controller {

    private value: any;
    private endPoint: string;

    constructor(value: any, endPoint: string) {
        this.value = value;
        this.endPoint = endPoint;
    }

    public async postValue() {
        const retry = await Axios.post(this.endPoint, this.value)
            .then((response) => {
                return response.data;
            })
        return retry;
    }
}