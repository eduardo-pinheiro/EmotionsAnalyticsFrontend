import { Controller } from "../Controller";
import { PeopleInterface } from "./interface";
import { formData } from "./formData";
import Axios from "axios";

export class People extends Controller {

    private static form = formData;

    constructor(value: PeopleInterface) {
        super(value, "/people");
    }

    public static async getOptions() {

        const peoples: Array<PeopleInterface> = await Axios.get('/people').then((response) => {
            return response.data;
        });

        let options: Array<{ label: string, id: number }> = [];

        peoples.map((people) => {
            options.push({
                //@ts-ignore
                id: people.id,
                label: `${people.name} - ${people.id}`
            })
        });

        return options;
    }

    public static getForm() {
        return People.form;
    }

    public static async editPeopleById(id: number, value: PeopleInterface) {
        const people: PeopleInterface = await Axios.patch(`/people/${id}`, value).then((response) => {
            return response.data;
        });
        return people;
    }

    public static async getPeopleById(id: number) {
        const people: PeopleInterface = await Axios.get(`/people/${id}`).then((response) => {
            return response.data;
        });
        return people;
    }

    public static async getPeoples() {
        const peoples: Array<PeopleInterface> = await Axios.get('/people').then((response) => {
            return response.data;
        });
        return peoples;
    }
}