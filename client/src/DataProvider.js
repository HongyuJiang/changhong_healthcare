import axios from 'axios';

export default class DataProvider {
    static getCountyJson() {

        return axios.get('http://173.199.122.158:3001/regions');
    }
    static getRegionJson() {

        return axios.get('https://raw.githubusercontent.com/longwosion/geojson-map-china/master/geometryCouties/510700.json');
    }
    static getItemGroupCsv() {

        return axios.get('http://173.199.122.158:3001/groupitem');
    }
}