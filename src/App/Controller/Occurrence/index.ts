import { Controller } from "../Controller";
import { OccurrenceInterface } from "./interface";

export class Occurrence extends Controller {

    constructor(value: OccurrenceInterface) {
        super(value, "/occurrences");
    }
}