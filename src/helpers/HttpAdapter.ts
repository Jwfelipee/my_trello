export interface IHttp {
	delete: (url: string, config?: (keyof IConfig)[]) => Promise<any | void>;
	get: (url: string, config?: (keyof IConfig)[]) => Promise<any | void>;
	post: (url: string, data: any, config?: (keyof IConfig)[]) => Promise<any | void>;
	put: (url: string, data: any, config?: (keyof IConfig)[]) => Promise<any | void>;
	setToken: (token: string) => void;
}

export interface IConfig {
	auth?: boolean;
}
