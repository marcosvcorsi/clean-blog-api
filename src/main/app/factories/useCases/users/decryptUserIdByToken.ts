import { DecryptUserIdByToken } from '@/data/useCases/users/crypto/DecryptUserIdByToken';
import { JwtAdapter } from '@/infra/crypto/jwtAdapter/JwtAdapter';

import authConfig from '@/main/config/auth';

export const makeDecryptUserIdByToken = () => {
  const jwtAdapter = new JwtAdapter(authConfig.secret);

  return new DecryptUserIdByToken(jwtAdapter);
};
