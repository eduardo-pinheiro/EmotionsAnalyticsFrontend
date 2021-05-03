import { Controller } from "../Controller";
import { TestTypeInterface } from "./interface";
import { formData } from "./formData";
import Axios from "axios";

export class TestType extends Controller {

    private static form = formData;

    constructor(value: TestTypeInterface) {
        super(value, "/test_type");
    }

    public static getForm() {
        return TestType.form;
    }

    public static async getOptions() {

        const testType: Array<TestTypeInterface> = await Axios.get('/test_type').then((response) => {
            return response.data;
        });

        let options: Array<{ label: string, id: number }> = [];

        testType.map((testType) => {
            options.push({
                //@ts-ignore
                id: testType.id,
                label: `${testType.title} - ${testType.id}`
            })
        });

        return options;
    }

    public static async getTestTypeById(id: number) {
        const testType: TestTypeInterface = await Axios.get(`/test_type/${id}`).then((response) => {
            return response.data;
        });
        return testType;
    }

    public static async editTestTypeById(id: number, value: TestTypeInterface) {
        const testType: TestTypeInterface = await Axios.patch(`/test_type/${id}`, value).then((response) => {
            return response.data;
        });
        return testType;
    }

    public static async getTestTypes() {
        const testType: Array<TestTypeInterface> = await Axios.get('/test_type').then((response) => {
            return response.data;
        });
        return testType;
    }
}