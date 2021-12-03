import axios from "axios";
import {config} from '../config';


export const getCoords = (address, zip)=>{
	return axios.get('https://nominatim.openstreetmap.org/search?q='+address+' '+zip+'&format=geocodejson')
			.then((response)=>{
				return response.data;
			})
}


export const savePub = (data)=>{
	return axios.post(config.api_url+'/api/v1/pub/save', data)
			.then((response)=>{
				return response.data;
			})
}

export const getPubByUser = (user_id)=>{
	return axios.get(config.api_url+'/api/v1/pub/byuser/'+user_id)
			.then((response)=>{
				return response.data;
			})
}

export const getOnePub = (id)=>{
	return axios.get(config.api_url+'/api/v1/pub/one/'+id)
			.then((response)=>{
				return response.data;
			})
}

export const editOnePub = (data, id)=>{
	return axios.put(config.api_url+'/api/v1/pub/update/'+id, data)
			.then((response)=>{
				return response.data;
			})
}

export const deleteOnePub = (id)=>{
	return axios.delete(config.api_url+'/api/v1/pub/delete/'+id)
			.then((response)=>{
				return response.data;
			})
}


export const getPubWithFilters = (data)=>{
	return axios.post(config.api_url+'/api/v1/pub/getPubWithFilters', data)
			.then((response)=>{
				return response.data;
			})
}