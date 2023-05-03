import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
  id: number;
  super_administrador: number;
  username: string;
  password: string;
  password_salt: string;
  cod_recupera: string;
  roles: number;
  primeiro_nome: string;
  ultimo_nome: string;
  email: string;
  telefone: string;
  funcao: string;
  observacoes: string;
  imagem: string;
  lingua: string;
  activo: number;
  // email settings
  emailSettings: {
    emailNotification: boolean,
    sendCopyToPersonalEmail: boolean,
    activityRelatesEmail: {
      youHaveNewNotifications: boolean,
      youAreSentADirectMessage: boolean,
      someoneAddsYouAsAsAConnection: boolean,
      uponNewOrder: boolean,
      newMembershipApproval: boolean,
      memberRegistration: boolean
    },
    updatesFromKeenthemes: {
      newsAboutKeenthemesProductsAndFeatureUpdates: boolean,
      tipsOnGettingMoreOutOfKeen: boolean,
      thingsYouMissedSindeYouLastLoggedIntoKeen: boolean,
      newsAboutMetronicOnPartnerProductsAndOtherServices: boolean,
      tipsOnMetronicBusinessProducts: boolean
    }
  };

  setUser(user: any) {
    this.id = user.id;
    this.username = user.username || '';
    this.password = user.password || '';
    this.primeiro_nome = user.primeiro_nome || '';
    this.ultimo_nome = user.ultimo_nome || '';
    this.email = user.email || '';
    this.imagem = user.imagem || './assets/media/users/default.jpg';
    this.roles = user.roles || [];
    this.observacoes = user.observacoes || '';
    this.funcao = user.funcao || '';
    this.telefone = user.telefone || '';
  }
}
