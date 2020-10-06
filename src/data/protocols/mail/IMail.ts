type InfoMail = {
  name: string;
  address: string;
};

export type MailParams = {
  to: InfoMail;
  subject: string;
  html: string;
};

export interface IMail {
  sendMail(data: MailParams): Promise<void>;
}
