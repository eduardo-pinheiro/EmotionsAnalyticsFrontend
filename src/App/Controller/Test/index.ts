import { Controller } from "../Controller";
import { TestInterface } from "./interface";
import { formData } from "./formData";
import Axios from "axios";
import _ from "lodash";

export class Test extends Controller {

    private static form = formData;

    constructor(value: TestInterface) {
        super(value, "/tests");
    }

    public static getForm() {
        return Test.form;
    }

    public static async getTests() {
        const tests: Array<TestInterface> = await Axios.get('/tests').then((response) => {
            return response.data;
        });
        return tests;
    }

    public static async editTestById(id: number) {
        const test: TestInterface = await Axios.patch(`/tests/${id}`).then((response) => {
            return response.data;
        });
        return test;
    }

    public static async getTestById(id: number) {
        const test: TestInterface = await Axios.get(`/tests/${id}`).then((response) => {
            return response.data;
        });
        return test;
    }

    public static async getTestsByPeopleId(peopleId: number) {
        
        const tests: Array<TestInterface> = await Axios.get(`/tests`)
            .then((response) => {
                return response.data;
            })
            .catch(() => {
                return null;
            });

        if (tests) {
            const testsByPeopleId = _.filter(tests, (o) => (o.people_id == peopleId));
            return testsByPeopleId;
        }

        return null;
    }

    public static async getTestsByTestTypeId(testTypeId: number) {

        const tests: Array<TestInterface> = await Axios.get(`/tests`)
            .then((response) => {
                return response.data;
            })
            .catch(() => {
                return null;
            });

        if (tests) {
            const testsByTestTypeId = _.filter(tests, (o) => (o.test_type_id == testTypeId));
            return testsByTestTypeId;
        }

        return null;
    }
}