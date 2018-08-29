import axios from 'axios';

export default class DataProvider {
    static getCountyJson() {

        return axios.get('http://10.10.4.250:3001/regions');
    }
    static getRegionJson() {

        return axios.get('https://raw.githubusercontent.com/longwosion/geojson-map-china/master/geometryCouties/510700.json');
    }
}