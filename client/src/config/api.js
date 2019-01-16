import enviroments from './enviroments.js'

export default {
  findOrgnizationsUrl: enviroments.SERVER.httpAddress + '/api/orgnizations',
  orgnizationRegisterUrl: enviroments.SERVER.httpAddress + '/api/orgnizations/register',
  totalOrgnizationsUrl: enviroments.SERVER.httpAddress + '/api/orgnizations/total',
  getOrgnizationUrl: enviroments.SERVER.httpAddress + '/api/orgnizations/{0}',
  auditOrgnizationUrl: enviroments.SERVER.httpAddress + '/api/orgnizations/{0}/audit',
  loginUrl: enviroments.SERVER.httpAddress + '/api/login',
  findUsersUrl: enviroments.SERVER.httpAddress + '/api/users',
  totalUsersUrl: enviroments.SERVER.httpAddress + '/api/users/total',
  getUserUrl: enviroments.SERVER.httpAddress + '/api/users/{0}',
  totalCommentsUrl: enviroments.SERVER.httpAddress + '/api/comments/total',
  saveCommentUrl: enviroments.SERVER.httpAddress + '/api/comments/save',
  changePasswordUrl: enviroments.SERVER.httpAddress + '/api/change-password',
};
