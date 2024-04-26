import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly FAILE: number = 3;
  private readonly time: number = 10 * 60 * 1000; 


  private failedLoginAttempts: Map<string, number> = new Map();
  private blockedUsers: Set<string> = new Set();

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    if (this.blockedUsers.has(email)) {
      throw new UnauthorizedException('Аккаунт заблокирован на 10 мин');
    }

    const user = await this.authService.validateUser(email, password);

    if (!user) {
      const attempts = (this.failedLoginAttempts.get(email) || 0) + 1;
      this.failedLoginAttempts.set(email, attempts);

      if (attempts >= this.FAILE) {
        this.blockUser(email);
      }

      throw new UnauthorizedException('Неудачная попытка входа.');
    }

    this.failedLoginAttempts.delete(email);

    return user;
  }

  private blockUser(email: string): void {
    this.blockedUsers.add(email);
    setTimeout(() => {
      this.unblockUser(email);
    }, this.time);
  }

  private unblockUser(email: string): void {
    this.blockedUsers.delete(email);
    this.failedLoginAttempts.delete(email);
}
}
