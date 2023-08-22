import jwt from 'jwt-decode';

export const jwtDecode = (token: string) => {
	const result = jwt(token);
	return result;
};

// export const jwtEncode = (data: any) => {
// 	const result = jwt.sign(data, 'voary_fly');
// 	return result;
// };
