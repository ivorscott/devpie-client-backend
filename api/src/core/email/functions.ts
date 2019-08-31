import sendgrid from '../../integrations/sendgrid';
import invite from './templates/invite';
import verify from './templates/verify';

export async function sendActivationLink(
  email: string,
  token: string
): Promise<void> {
  const msg = {
    to: email,
    from: 'ivor@devpie.io',
    subject: 'Welcome to DevPie - Account Activation',
    html: verify(token)
  };

  sendgrid.send(msg);
}

export async function sendInvite(): Promise<void> {
  const msg = {
    to: 'ivor@devpie.io',
    from: 'ivor@devpie.io',
    subject: 'DevPie Sign Up - Verify Your Account.',
    html: invite()
  };

  sendgrid.send(msg);
}
