import * as API_CONST from '../helpers/config';
const expiredTokenObj = { status: 401, error: ' UNAUTHORIZED TOKEN!' };
const suspendUserObj = { status: 403, error: 'SUSPENDED USER!' };
import NavigationService from "../utils/NavigationService";
import {Alert} from 'react-native'
import * as RootNavigation from '../router/RouteNavigation';

function secureFetch(type, token, body = '', contentType = undefined) {
	let headers = {
		method: type,
		headers: {
			'Authorization': token,
			'Content-Type': contentType ? contentType : 'application/json',
			'Accept': 'application/json',
			'device-type': Platform.OS,
		},
		body: contentType ? body : JSON.stringify(body)
	};
	if (type === 'GET' || type === 'DELETE' || body === '') {
		delete headers['body'];
	}
	if (token === '') {
		delete headers.headers['Authorization'];
	}
	return headers;
}

// function secureFetchForImage(type, token, body = '', contentType = undefined) {
// 	let headers = {
// 		method: 'put',
// 		headers: {
// 			 Accept: 'application/json',
// 			'authorization': token,
// 			'Content-Type': 'multipart/form-data'
// 		},
// 		body: contentType ? body : JSON.stringify(body)
// 	};
// 	if (type === 'GET' || type === 'DELETE' || body === '') {
// 		delete headers['body'];
// 	}
// 	if (token === '') {
// 		delete headers.headers['Authorization'];
// 	}
// 	return headers;
// }

export async function securePost(path, token, body, wantAuthorizationToken = false) {
	return await fetch(`${API_CONST.BASE_URL}${path}`, secureFetch('POST', token, body)).then((res) => {
		if(res.status === 200 || 201 || 204)
			return res;
		if (res.status === 401)
			throw (expiredTokenObj);
		else if (res.status === 403)
			return (res.json());
		else if (wantAuthorizationToken)
			return res;
		else{
			RootNavigation.navigationRef.navigate("SignIn")
			Alert.alert("Error Server Error Try Again!")
		}
		// return res.json();
	});
}

// create fun for user module .......
// export async function securePostForUser(path, token, body, wantAuthorizationToken = false) {
// 	return await fetch(`${API_CONST.NODE_USER_API}${path}`, secureFetch('POST', token, body)).then((res) => {
// 		if(res.status === 200 || 201 || 204)
// 			return res.json()
// 		else if (res.status === 401) {
// 			throw (expiredTokenObj);
// 		}
// 		else if (res.status === 403) {
// 			return (res.json());
// 		}
// 		else if (wantAuthorizationToken) {
// 			return res;
// 		}
// 		else{
// 			RootNavigation.navigationRef.navigate("SignIn")
// 			Alert.alert("Error Server Error Try Again!")
// 		}
// 	});
// }



export async function securePostForUser(path, token, body, wantAuthorizationToken = false) {
	return await fetch(`${API_CONST.NODE_USER_API}${path}`, secureFetch('POST', token, body)).then((res) => {
		if (res.status === 401) {
			throw (expiredTokenObj);
		}
		else if (res.status === 403) {
			return (res.json());
		}
		else if (wantAuthorizationToken) {
			return res;
		}
		else {
			return res.json();
		}

	});
}

// export async function securePut(path, token, body) {
// 	return await fetch(`${API_CONST.NODE_USER_API}${path}`, secureFetch('PUT', token, body)).then((res) => {
// 		if(res.status === 200 || 201 || 204)
// 			return res
// 		else if (res.status === 401)
// 			throw (expiredTokenObj);
// 		else if (res.status === 403) {
// 				// return (res.json());
// 			throw (suspendUserObj);
// 		}
// 		else{
// 			RootNavigation.navigationRef.navigate("SignIn")
// 			Alert.alert("Error Server Error Try Again!")
// 		}
// 	});
// }

// secure put function for user Module......

export async function securePutForUser(path, token, body) {
	return await fetch(`${API_CONST.NODE_USER_API}${path}`, secureFetch('PUT', token, body)).then((res) => {
		if(res.status === 200 || 201 || 204)
			return res
		else if (res.status === 401)
			throw (expiredTokenObj);
		else if (res.status === 403) {
			throw (suspendUserObj);
		}
		else{
			RootNavigation.navigationRef.navigate("SignIn")
			Alert.alert("Error Server Error Try Again!")
		}
	});
}

// export async function securePutForUserProfile(path, token, body) {
// 	return await fetch(`${API_CONST.NODE_USER_API}${path}`, secureFetchForImage('PUT', token, body)).then((res) => {
// 		if (res.status === 401)
// 			throw (expiredTokenObj);
// 		else
// 			return res;
// 	});
// }
// secure put for alerts 



export async function securePatch(path, token, body) {
	return await fetch(`${API_CONST.BASE_URL}${path}`, secureFetch('PATCH', token, body)).then((res) => {
		if(res.status === 200 || 201 || 204)
			return res
		else if (res.status === 401)
			throw (expiredTokenObj);
		else if (res.status === 403) {
			throw (suspendUserObj);
		}
		else{
			RootNavigation.navigationRef.navigate("SignIn")
			Alert.alert("Error Server Error Try Again!")
		}
	});
}


// secure patch for user module
export async function securePatchForUser(path, token, body) {
	return await fetch(`${API_CONST.NODE_USER_API}${path}`, secureFetch('PATCH', token, body)).then((res) => {
		if(res.status === 200 || 201 || 204)
			return res
		else if (res.status === 401)
			throw (expiredTokenObj);
		else if (res.status === 403) {
			throw (suspendUserObj);
		}
		else{
			RootNavigation.navigationRef.navigate("SignIn")
			Alert.alert("Error Server Error Try Again!")
		}
	});
}



// export async function securePostForAlert(path, token, body, wantAuthorizationToken = false) {
// 	return await fetch(`${API_CONST.NODE_ALERT}${path}`, secureFetch('POST', token, body)).then((res) => {
// 		if(res.status === 200 || 201 || 204)
// 			return res
// 		else if (res.status === 401)
// 			throw (expiredTokenObj);
// 		else if (res.status === 403) {
// 			throw (suspendUserObj);
// 		}
// 		else{
// 			RootNavigation.navigationRef.navigate("SignIn")
// 			Alert.alert("Error Server Error Try Again!")
// 		}

// 		// return res.json();
// 	});
// }

export async function secureGet(path, token) {
	return await fetch(`${API_CONST.BASE_URL}${path}`, secureFetch('GET', token)).then((res) => {
		if(res.status === 200 || 201 || 204)
			return res.json()
		else if (res.status === 401)
			throw (expiredTokenObj);
		else if (res.status === 403) {
			throw (suspendUserObj);
		}
		else{
			RootNavigation.navigationRef.navigate("SignIn")
			Alert.alert("Error Server Error Try Again!")
		}
	});
}

// secure get function for user module .....
export async function secureGetForUser(path, token) {
	return await fetch(`${API_CONST.NODE_USER_API}${path}`, secureFetch('GET', token)).then((res) => {
	if(res.status === 200 || 201 || 204)
		return res.json()
	else if (res.status === 401)
		throw (expiredTokenObj);
	else if (res.status === 403) {
		throw (suspendUserObj);
	}
	else{
		RootNavigation.navigationRef.navigate("SignIn")
		Alert.alert("Error Server Error Try Again!")
	}
	});
}

export async function secureDelete(path, token) {
	return await fetch(`${API_CONST.BASE_URL}${path}`, secureFetch('DELETE', token)).then((res) => {
		if(res.status === 200 || 201 || 204)
			return res
		else if (res.status === 401)
			throw (expiredTokenObj);
		else if (res.status === 403) {
			throw (suspendUserObj);
		}
		else{
			RootNavigation.navigationRef.navigate("SignIn")
			Alert.alert("Error Server Error Try Again!")
		}
	});
}

// secure delete function for user module .....

export async function secureDeleteForUser(path, token) {
	return await fetch(`${API_CONST.NODE_USER_API}${path}`, secureFetch('DELETE', token)).then((res) => {
		if(res.status === 200 || 201 || 204)
			return res
		else if (res.status === 401)
			throw (expiredTokenObj);
		else if (res.status === 403) {
			throw (suspendUserObj);
		}
		else{
			RootNavigation.navigationRef.navigate("SignIn")
			Alert.alert("Error Server Error Try Again!")
		}
	});
}
export async function securePutForAlert(path, token, body) {
	return await fetch(`${API_CONST.NODE_ALERT}${path}`, secureFetch('PUT', token, body)).then((res) => {
		if(res.status === 200 || 201 || 204)
			return res
		else if (res.status === 401)
			throw (expiredTokenObj);
		else if (res.status === 403)
			throw (suspendUserObj);
		else{
			RootNavigation.navigationRef.navigate("SignIn")
			Alert.alert("Error Server Error Try Again!")
		}
	});
}

// Multipart
function secureFetchMultiPart(type, accessToken, body = '') {
	let requestObj = {};
	if (type === 'GET' || type === 'DELETE') {
		requestObj["method"] = type;
		requestObj["headers"] = {
			Authorization: `Token ${accessToken}`,
		};
		return requestObj;
	} else {
		requestObj["method"] = type;
		requestObj["headers"] = {
			Authorization: `Token ${accessToken}`,
			'Content-Type': 'multipart/form-data',
			'Accept': 'application/json'
		};
		requestObj["body"] = body;
		return requestObj;
	}
}

export async function securePostMultiPart(path, token, body) {
	return await fetch(`${API_CONST.BASE_URL}${path}`, secureFetchMultiPart('POST', token, body)).then((res) => {
		if(res.status === 200 || 201 || 204)
			return res.json();
		else if (res.status === 401)
			throw (expiredTokenObj);
		else if (res.status === 403)
			throw (suspendUserObj);
		else{
			RootNavigation.navigationRef.navigate("SignIn")
			Alert.alert("Error Server Error Try Again!")
		}
	
			// return JSON.parse(JSON.stringify(res))
	});
}

//NodeService

export async function nodeSecureGet(path, token) {
	return await fetch(`${path}`, secureFetch('GET', token)).then((res) => {
	
		if(res.status === 200 || 201 || 204)
			return res.json();
		else if (res.status === 401)
			throw (expiredTokenObj);
		else if (res.status === 403)
			throw (suspendUserObj);
		else{
			RootNavigation.navigationRef.navigate("SignIn")
			Alert.alert("Error Server Error Try Again!")
		}
	});
}

