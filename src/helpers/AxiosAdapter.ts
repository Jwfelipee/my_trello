import axios from 'axios';

import { IConfig, IHttp } from './HttpAdapter';

export class AxiosAdapter implements IHttp {
	private token: string = '';

	public async put(url: string, data: any, config?: (keyof IConfig)[]): Promise<any> {
		try {
			const headers = this.hasHeader(config);
			const response = await axios.put(url, data, { headers });
			return response.data;
		} catch (e: any) {
			if (e?.response?.status === 401) {
				this.logout();
			}
		}
	}

	public async post(url: string, data: any, config?: (keyof IConfig)[]): Promise<any> {
		try {
			const headers = this.hasHeader(config);
			const response = await axios.post(url, data, { headers });
			return response.data;
		} catch (e: any) {
			if (e?.response?.status === 401) {
				this.logout();
			}
		}
	}

	public async delete(url: string, config?: (keyof IConfig)[]): Promise<any> {
		try {
			const headers = this.hasHeader(config);
			const response = await axios.delete(url, { headers });
			return response.data;
		} catch (e: any) {
			if (e?.response?.status === 401) {
				this.logout();
			}
		}
	}

	public async get(url: string, config: (keyof IConfig)[]) {
		try {
			const headers = this.hasHeader(config);
			const response = await axios(url, { headers });
			return response.data;
		} catch (e: any) {
			if (e?.response?.status === 401) {
				this.logout();
			}
		}
	}

	public setToken(token: string) {
		this.token = token;
	}

	private hasHeader(config?: (keyof IConfig)[]): any {
		if (config && config.includes('auth')) {
			return {
				Authorization: `Bearer ${this.getToken()}`,
			};
		}
		return {};
	}

	private logout() {
		localStorage.removeItem('token');
	}

	private getToken() {
		return this.token || localStorage.getItem('token');
	}
}
