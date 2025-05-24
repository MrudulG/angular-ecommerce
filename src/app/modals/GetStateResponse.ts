import { State } from "../common/state";


export interface GetStateResponse {

    _embedded: {
        states: State[];
    }

}