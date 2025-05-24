import { Country } from "../common/country";

export interface GetCountryResponse {

    _embedded: {
        countries: Country[];
    }

}