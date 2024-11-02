import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomMailerService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}
  async sendEmail(
    to: string,
    subject: string,
    content: string,
  ): Promise<string> {
    try {
      const resetPasswordUrl = this.configService.get('RESET_PASSWORD_URL');

      if (!resetPasswordUrl) {
        throw new InternalServerErrorException(
          'RESET_PASSWORD_URL is not configured.',
        );
      }
      await this.mailerService.sendMail({
        to,
        from: '"No Reply" <fernandoituartespr@gmail.com>',
        subject,
        html: `
      <h1>Réinitialisation de mot de passe</h1>
      <h2>Poussez pas derrière</h2>
      <p>Bonjour,</p>
      <p>Vous avez demandé une réinitialisation de mot de passe. Cliquez sur le bouton ci-dessous pour réinitialiser votre mot de passe. :</p>
      <a href="${resetPasswordUrl}/${content}" style="background-color: #F79323; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Réinitialiser le mot de passe</a>
      <p>Si vous n'avez pas demandé de réinitialisation de mot de passe, ignorez simplement cet e-mail.</p>
    `,
      });

      return 'Email envoyé correctement';
    } catch (error) {
      throw error;
    }
  }
}
