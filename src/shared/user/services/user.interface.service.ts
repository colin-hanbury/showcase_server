export interface IUserService{
    getUserWelcomeMessage: (id: string) => Promise<string>;
}