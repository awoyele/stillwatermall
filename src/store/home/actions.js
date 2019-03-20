import { store } from './'
import axios from 'axios'
import {Notify} from 'quasar'

let link = `http://api.stillwatermall.com`
export function  getCars({state, commit}){
    axios.get(link+"/vehicles")
        .then(res => commit("updateField",{path:"cars", value:res.data}) /*state.cars = */ )
        .catch(err => Notify("Error getting data"))
}
export function  getRestaurants({state, commit}){
    axios.get(link+"/restaurants")
        .then(res => commit("updateField", {path:"restaurants", value:res.data}) )
        .catch(err => Notify("Error getting data"))
}
export function  getAttractions({state, commit}){
    axios.get(link+"/locations")
        .then(res => commit("updateField", {path:"attractions", value:res.data}) )
        .catch(err => Notify("Error getting data"))
}

export function getInfos({dispatch}){
    dispatch('getCars')
    dispatch('getRestaurants')
    dispatch('getAttractions')
}
