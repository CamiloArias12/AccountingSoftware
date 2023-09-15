import { AuthService } from './auth.service';
import { Token } from './dto/payload';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    authUser(username: string, password: string): Promise<Token>;
}
